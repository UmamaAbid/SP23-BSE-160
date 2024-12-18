import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerInfo: { type: Object, required: true },
  orderItems: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
