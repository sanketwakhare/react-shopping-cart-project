import { formatDate } from "utils/Utils";

import { OrderStatus, OrderStatusTimelineDisplayMapping } from "./Orders.const";

export const transformHistoryToEvents = (history) => {
  const events = history?.map((item, index) => {
    let rightContent = {};
    let isPending = false;
    const status = item?.status;
    const displayMapping = OrderStatusTimelineDisplayMapping[status];
    rightContent = {
      title: displayMapping?.rightContent?.content,
      subContent: displayMapping?.rightContent?.subContent,
    };

    if (
      [
        OrderStatus.PAYMENT_PENDING,
        OrderStatus.PROCESSING,
        OrderStatus.IN_TRANSIT,
        OrderStatus.ON_HOLD,
        OrderStatus.OUT_FOR_DELIVERY,
        OrderStatus.PAYMENT_FAILED,
      ].includes(status) &&
      index === history.length - 1
    ) {
      isPending = true;
    }

    return {
      status: item.status,
      leftContent: formatDate(item.updatedAt),
      rightContent,
      comments: item.comments || "",
      isPending,
      _id: item._id,
    };
  });

  return events ?? [];
};
