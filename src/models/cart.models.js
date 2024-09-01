import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
  }],
  total: { type: Number, default: 0 }, 
},
{
  timestamps: true,
});

const Cart = model('Cart', cartSchema);

export default Cart;