export const generateTicket = (order) => {
    return {
      orderId: order._id,
      items: order.items,
      total: order.total,
      date: new Date().toISOString(),
    };
  };
  