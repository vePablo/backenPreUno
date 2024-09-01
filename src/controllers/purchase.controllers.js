import PurchaseService from '../services/purchase.services.js';

export const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const userEmail = req.user.email; // Suponiendo que userEmail está disponible en req.user gracias al middleware

    // Llamar al servicio de compra para manejar la lógica
    const result = await PurchaseService.processPurchase(cartId, userEmail);

    if (result.error) {
      return res.status(400).json({ status: 'error', message: result.error, products: result.productsWithoutStock });
    }

    res.status(201).json({ status: 'success', payload: result.ticket });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};