export const OrderStatus = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  ON_HOLD: "on_hold",
  RETURNED: "returned",
  FAILED: "failed",
  COMPLETED: "completed",
};

export const OrderStatusDisplayMapping = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.PROCESSING]: "Processing",
  [OrderStatus.SHIPPED]: "Shipped",
  [OrderStatus.DELIVERED]: "Delivered",
  [OrderStatus.CANCELLED]: "Cancelled",
  [OrderStatus.REFUNDED]: "Refunded",
  [OrderStatus.ON_HOLD]: "On Hold",
  [OrderStatus.RETURNED]: "Returned",
  [OrderStatus.FAILED]: "Failed",
  [OrderStatus.COMPLETED]: "Completed",
};
