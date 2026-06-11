const express = require("express");
const { sql } = require("../db");

const router = express.Router();

function generateOrderCode() {
  return "CC" + Date.now();
}

// GET all orders for My Orders page
router.get("/", async (req, res) => {
  try {
    const result = await sql.query`
      SELECT 
        o.OrderID,
        o.OrderCode,
        o.UserID,
        o.CustomerName,
        o.CustomerPhone,
        o.CustomerAddress,
        o.CustomerNote,
        o.PaymentMethod,
        o.PaymentStatus,
        o.OrderStatus,
        o.Subtotal,
        o.ShippingFee,
        o.TotalAmount,
        o.CreatedAt,
        oi.OrderItemID,
        oi.DeviceModel,
        oi.CaseType,
        oi.FrameImage,
        oi.UnitPrice,
        oi.Quantity
      FROM Orders o
      LEFT JOIN OrderItems oi ON o.OrderID = oi.OrderID
      ORDER BY o.CreatedAt DESC
    `;

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({
      message: "Get orders failed",
      error: err.message,
    });
  }
});

// GET tracking logs by order code
router.get("/tracking/:orderCode", async (req, res) => {
  try {
    const { orderCode } = req.params;

    const result = await sql.query`
      SELECT 
        o.OrderCode,
        o.OrderStatus,
        t.TrackingStatus,
        t.LogMessage,
        t.CreatedAt
      FROM Orders o
      LEFT JOIN TrackingLogs t ON o.OrderID = t.OrderID
      WHERE o.OrderCode = ${orderCode}
      ORDER BY t.CreatedAt DESC
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      orderCode: result.recordset[0].OrderCode,
      status: result.recordset[0].OrderStatus,
      logs: result.recordset.map((row) => ({
        time: row.CreatedAt,
        message: row.LogMessage,
        status: row.TrackingStatus,
      })),
    });
  } catch (err) {
    res.status(500).json({
      message: "Get tracking failed",
      error: err.message,
    });
  }
});

// CREATE new order
router.post("/", async (req, res) => {
  const transaction = new sql.Transaction();

  try {
    const {
      userId,
      customerName,
      customerPhone,
      customerAddress,
      customerNote,
      paymentMethod,
      subtotal,
      shippingFee,
      totalAmount,
      items,
    } = req.body;

    if (
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !paymentMethod ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({ message: "Missing order information" });
    }

    const orderCode = generateOrderCode();

    await transaction.begin();

    const orderRequest = new sql.Request(transaction);

    const orderResult = await orderRequest.query`
      INSERT INTO Orders (
        OrderCode, UserID, CustomerName, CustomerPhone, CustomerAddress,
        CustomerNote, PaymentMethod, PaymentStatus, OrderStatus,
        Subtotal, ShippingFee, TotalAmount
      )
      OUTPUT INSERTED.OrderID
      VALUES (
        ${orderCode}, ${userId || null}, ${customerName}, ${customerPhone}, ${customerAddress},
        ${customerNote || null}, ${paymentMethod}, 'Pending', 'Pending',
        ${subtotal}, ${shippingFee}, ${totalAmount}
      )
    `;

    const orderId = orderResult.recordset[0].OrderID;

    for (const item of items) {
      const itemRequest = new sql.Request(transaction);

      const itemResult = await itemRequest.query`
        INSERT INTO OrderItems (
          OrderID, DeviceModel, CaseType, FrameImage, UnitPrice, Quantity
        )
        OUTPUT INSERTED.OrderItemID
        VALUES (
          ${orderId}, ${item.deviceModel}, ${item.caseType}, ${item.frame || null},
          ${item.price}, ${item.quantity || 1}
        )
      `;

      const orderItemId = itemResult.recordset[0].OrderItemID;

      if (item.designItems && Array.isArray(item.designItems)) {
        for (const design of item.designItems) {
          const designRequest = new sql.Request(transaction);

          await designRequest.query`
            INSERT INTO DesignItems (
              OrderItemID, ItemType, Content, PositionLeft, PositionTop,
              Width, Height, TextColor, FontFamily, FontSize
            )
            VALUES (
              ${orderItemId}, ${design.type || "unknown"}, ${design.content || ""},
              ${design.left || null}, ${design.top || null},
              ${design.width || null}, ${design.height || null},
              ${design.color || null}, ${design.fontFamily || null}, ${design.fontSize || null}
            )
          `;
        }
      }

      if (item.accessories && Array.isArray(item.accessories)) {
        for (const accessory of item.accessories) {
          const accessoryRequest = new sql.Request(transaction);

          await accessoryRequest.query`
            INSERT INTO Accessories (
              OrderItemID, AccessoryName, AccessoryPrice
            )
            VALUES (
              ${orderItemId}, ${accessory.name || accessory}, ${accessory.price || 0}
            )
          `;
        }
      }
    }

    const trackingRequest = new sql.Request(transaction);

    await trackingRequest.query`
      INSERT INTO TrackingLogs (OrderID, TrackingStatus, LogMessage)
      VALUES (${orderId}, 'Pending', 'Order has been created successfully')
    `;

    await transaction.commit();

    res.status(201).json({
      message: "Order created successfully",
      orderId,
      orderCode,
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({
      message: "Create order failed",
      error: err.message,
    });
  }
});

module.exports = router;
