import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";

import { PaymentStatus } from "components/Payments/PaymentStatus";
import useApi from "hooks/useApi";
import useToggle from "hooks/useToggle";
import Timeline from "ui-components/Timeline/Timeline";
import UrlConfig from "utils/UrlConfig";
import { formatDate, formatPrice } from "utils/Utils";

import {
  OrderStatusDisplayMapping,
  transformHistoryToEvents,
} from "../Orders.const";

import "./order.scss";

const Order = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const { request } = useApi();

  const [isOrderPlace, setIsOrderPlace] = useToggle(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [order, setOrderData] = useState(null);

  useEffect(() => {
    if (location?.state?.paymentStatus) {
      const _paymentStatus = location.state.paymentStatus;
      setPaymentStatus(_paymentStatus);
      if (_paymentStatus === PaymentStatus.PAID) {
        setIsOrderPlace(true);
      }
    }
  }, [location]);

  const getOrderDetails = async () => {
    const response = await request(
      UrlConfig.GET_ORDER_DETAILS_URL.replace(":orderId", orderId)
    );
    if (response.loadError) {
      console.error("error loading order details");
    } else {
      const data = response?.data?.data;
      setOrderData(data);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);

  const orderStatus = OrderStatusDisplayMapping[order?.status];
  const timelineEvents = transformHistoryToEvents(order?.history);

  return (
    <div className="order-main-container">
      <div className="order-inner-container box-shadow">
        {isOrderPlace && (
          <div className="order-place-message-container">
            <div className="check-circle">
              <i className="fa fa-check-circle"></i>
            </div>
            <label>
              Your order has been placed successfully. Thank you for shopping
              with us!
            </label>
          </div>
        )}
        <div className="order-title-container">
          <div>Order Details</div>
        </div>
        <div className="order-body">
          <div className="order-header">
            <div className="order-property">
              <label>Order Date:</label>
              <span>{formatDate(order?.createdAt)}</span>
            </div>
            <div className="order-property">
              <label>Status:</label>
              <span className="order-status">
                {orderStatus?.faIcon && (
                  <i
                    className={`fa ${orderStatus?.faIcon}`}
                    style={{
                      color: orderStatus?.color,
                    }}
                  ></i>
                )}
                <span>{orderStatus?.label}</span>
              </span>
            </div>
            <div className="order-property order-amount">
              <label>Total Amount:</label>
              <span>
                {formatPrice(order?.totalAmount, {
                  showCurrency: true,
                })}
              </span>
            </div>
            <div className="order-property order-id">
              <label>Order Id:</label>
              <div>{order?._id}</div>
            </div>
          </div>
          <div className="order-details-container">
            <div className="order-content">
              {order?.items?.map((currOrder) => {
                const product = currOrder?.product;
                return (
                  <div className="item" key={`order-items-${product?.id}`}>
                    <Link to={`/products/${product._id}`} className="link">
                      <img src={product?.image}></img>
                    </Link>
                    <div className="product-details">
                      <Link to={`/products/${product._id}`} className="link">
                        {product?.title}
                      </Link>
                      <div className="price-details">
                        <div className="order-property">
                          <label>Quantity:</label>
                          <span>{currOrder?.quantity}</span>
                        </div>
                        <div className="order-property">
                          <label>Price:</label>
                          <span>
                            {formatPrice(product?.price, {
                              showCurrency: true,
                            })}
                          </span>
                        </div>
                        <div className="order-property">
                          <label>Subtotal:</label>
                          <span>
                            {formatPrice(product?.price * currOrder?.quantity, {
                              showCurrency: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="timeline-container">
              <Timeline events={timelineEvents}></Timeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
