export const OrderStatus = {
  ORDER_INITIATED: "order-initiated",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_COMPLETED: "payment_completed",
  PAYMENT_FAILED: "payment_failed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  IN_TRANSIT: "in_transit",
  OUT_FOR_DELIVERY: "out-for-delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  RETURNED: "returned",
  ON_HOLD: "on_hold",
};

export const OrderStatusDisplayMapping = {
  [OrderStatus.ORDER_INITIATED]: {
    label: "Order Initiated",
    faIcon: "fa-check",
    color: "darkblue",
  },
  [OrderStatus.PAYMENT_PENDING]: {
    label: "Payment Pending",
    faIcon: "fa fa-credit-card",
    color: "orange",
  },
  [OrderStatus.PAYMENT_COMPLETED]: {
    label: "Payment Completed",
    faIcon: "fa fa-credit-card",
    color: "green",
  },
  [OrderStatus.PAYMENT_FAILED]: {
    label: "Payment Failed",
    faIcon: "fa-credit-card",
    color: "red",
  },
  [OrderStatus.PROCESSING]: {
    label: "Processing",
    faIcon: "fa-clock-four",
    color: "darkblue",
  },
  [OrderStatus.IN_TRANSIT]: {
    label: "In Transit",
    faIcon: "fa-truck",
    color: "darkblue",
  },
  [OrderStatus.OUT_FOR_DELIVERY]: {
    label: "Out for Delivery",
    faIcon: "fa-truck",
    color: "darkblue",
  },
  [OrderStatus.SHIPPED]: {
    label: "Shipped",
    faIcon: "fa-rocket",
    color: "darkblue",
  },
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    faIcon: "fa-check",
    color: "green",
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelled",
    faIcon: "fa-times",
    color: "darkblue",
  },
  [OrderStatus.REFUNDED]: {
    label: "Refunded",
    faIcon: "fa-exchange",
    color: "darkblue",
  },
  [OrderStatus.ON_HOLD]: {
    label: "On Hold",
    faIcon: "fa-hand",
    color: "darkblue",
  },
  [OrderStatus.RETURNED]: {
    label: "Returned",
    faIcon: "fa-undo",
    color: "darkblue",
  },
};

export const OrderStatusTimelineDisplayMapping = {
  [OrderStatus.ORDER_INITIATED]: {
    rightContent: {
      content: "Order Initiated",
      subContent: "order initiated",
    },
  },
  [OrderStatus.PAYMENT_PENDING]: {
    rightContent: {
      content: "Payment Pending",
      subContent: "payment failed for this your order",
    },
  },
  [OrderStatus.PAYMENT_COMPLETED]: {
    rightContent: {
      content: "Payment Completed",
      subContent: "payment completed for this order",
    },
  },
  [OrderStatus.PAYMENT_FAILED]: {
    rightContent: {
      content: "Payment Failed",
      subContent: "payment failed",
    },
  },
  [OrderStatus.PROCESSING]: {
    rightContent: {
      content: "Processing",
      subContent: "processing your order",
    },
  },
  [OrderStatus.IN_TRANSIT]: {
    rightContent: {
      content: "In Transit",
      subContent: "order is in transit",
    },
  },
  [OrderStatus.OUT_FOR_DELIVERY]: {
    rightContent: {
      content: "Out for Delivery",
      subContent: "out for delivery",
    },
  },
  [OrderStatus.SHIPPED]: {
    rightContent: {
      content: "Shipped",
      subContent: "order shipped",
    },
  },
  [OrderStatus.DELIVERED]: {
    rightContent: {
      content: "Delivered",
      subContent: "order delivered",
    },
  },
  [OrderStatus.CANCELLED]: {
    rightContent: {
      content: "Cancelled",
      subContent: "order cancelled",
    },
  },
  [OrderStatus.REFUNDED]: {
    rightContent: {
      content: "Refunded",
      subContent: "refund completed",
    },
  },
  [OrderStatus.ON_HOLD]: {
    rightContent: {
      content: "On Hold",
      subContent: "This order is on hold. Please contact customer support",
    },
  },
  [OrderStatus.RETURNED]: {
    rightContent: {
      content: "Returned",
      subContent: "return completed",
    },
  },
};
