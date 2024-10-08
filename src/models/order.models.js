import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' }
},{ 
  timestamps: true 
});

const Order = model('Order', orderSchema);

export default Order;
