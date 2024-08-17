import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
},
{
  timestamps:true,
}
);

const Ticket = model('Ticket', ticketSchema);

export default Ticket;