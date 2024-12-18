import { Router } from 'express';
import Product from '../models/Product.js';
const router = Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Seed database with sample products
router.post('/seed', async (req, res) => {
  const sampleProducts = [
    { name: 'Laptop', price: 1000, description: 'High performance laptop', image: '/laptop.jpg' },
    { name: 'Phone', price: 500, description: 'Smartphone with great features', image: '/phone.jpg' },
    { name: 'Headphones', price: 100, description: 'Noise-cancelling headphones', image: '/headphones.jpg' },
    { name: 'Keyboard', price: 50, description: 'Mechanical keyboard', image: '/keyboard.jpg' },
  ];
  await Product.insertMany(sampleProducts);
  res.json({ message: 'Products seeded' });
});

export default router;
