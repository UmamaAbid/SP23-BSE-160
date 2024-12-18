import { Router } from 'express';
import Order from '../models/Order.js';
import { v4 as uuidv4 } from 'uuid';
const router = Router();

// Create a new order
router.post('/create', async (req, res) => {
  const { customerInfo, orderItems, totalAmount } = req.body;

  try {
    const order = new Order({
      orderId: uuidv4(),
      customerInfo,
      orderItems,
      totalAmount,
    });

    await order.save();
    res.json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
