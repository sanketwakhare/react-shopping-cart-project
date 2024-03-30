import { useParams } from "react-router";

const Order = () => {
  const { orderId } = useParams();
  return <div>Order {orderId}</div>;
};

export default Order;
