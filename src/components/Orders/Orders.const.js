export const OrderStatus = {
  PROCESSING: "processing",
  IN_TRANSIT: "in_transit",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_COMPLETED: "payment_completed",
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
  [OrderStatus.SHIPPED]: {
    label: "Shipped",
    faIcon: "fa-rocket",
    color: "darkblue",
  },
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    faIcon: "fa-check",
    color: "darkblue",
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
