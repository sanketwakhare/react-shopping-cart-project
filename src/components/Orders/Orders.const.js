export const OrderStatus = {
  PROCESSING: "processing",
  IN_TRANSIT: "in_transit",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_FAILED: "payment_failed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  RETURNED: "returned",
  ON_HOLD: "on_hold",
};

export const OrderStatusDisplayMapping = {
  [OrderStatus.PAYMENT_PENDING]: {
    label: "Payment Pending",
    icon: "fa fa-credit-card",
    color: "orange",
  },
  [OrderStatus.PAYMENT_FAILED]: {
    label: "Payment Failed",
    icon: "fa fa-credit-card",
    color: "red",
  },
  [OrderStatus.PROCESSING]: {
    label: "Processing",
    icon: "fa fa-clock-four",
    color: "orange",
  },
  [OrderStatus.IN_TRANSIT]: {
    label: "In Transit",
    icon: "fa fa-truck",
    color: "darkblue",
  },
  [OrderStatus.SHIPPED]: {
    label: "Shipped",
    icon: "fa fa-check",
    color: "#019101",
  },
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    icon: "fa fa-check-circle",
    color: "#019101",
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancelled",
    icon: "fa fa-times",
    color: "red",
  },
  [OrderStatus.REFUNDED]: {
    label: "Refunded",
    icon: "fa fa-exchange",
    color: "#019101",
  },
  [OrderStatus.ON_HOLD]: {
    label: "On Hold",
    icon: "fa fa-hand",
    color: "red",
  },
  [OrderStatus.RETURNED]: {
    label: "Returned",
    icon: "fa fa-undo",
    color: "#019101",
  },
};
