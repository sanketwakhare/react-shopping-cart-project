import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "underscore";

import useApi from "hooks/useApi";
import { addToCartRedux } from "store/cart";
import Timeline from "ui-components/Timeline/Timeline";
import UrlConfig from "utils/UrlConfig";
import { formatDate, formatPrice } from "utils/Utils";

import { OrderStatusDisplayMapping } from "../Orders.const";
import { transformHistoryToEvents } from "../Orders.utils";
import "./orders-list.scss";

const OrderList = () => {
  const { request } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;

  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      // navigate to home page if user already logged in
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Fetch user data from the server
    const fetchOrdersData = async () => {
      try {
        const response = await request(UrlConfig.USER_ORDERS_URL);
        setOrdersData(response?.data?.data ?? []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchOrdersData();
  }, []);

  const handleBuyAgain = (product) => {
    dispatch(addToCartRedux(product));
    navigate("/cart");
  };

  const noOrdersMessageTemplate = (
    <div className="orders-container">
      <div className="no-orders-container">
        <div>Looks like you haven't placed any orders yet.</div>
        <div>
          Start shopping now to add items to your cart and place your first
          order!
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isEmpty(ordersData) && (
        <div className="orders-container">
          <div className="orders-inner-container box-shadow">
            <div className="orders-header">
              <div>Orders</div>
              <div className="total-orders">
                <div>
                  Showing{" "}
                  <span className="total-orders-count">
                    {ordersData?.length ?? 0}
                  </span>{" "}
                  orders
                </div>
              </div>
            </div>
            <div className="orders-body">
              {ordersData.map((order) => {
                const orderStatus = OrderStatusDisplayMapping[order?.status];
                const timelineEvents = transformHistoryToEvents(order?.history);
                return (
                  <div
                    key={`order-${order?._id}`}
                    className="order-container box-shadow"
                  >
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
                        <Link to={`/order/${order?._id}`} className="link">
                          {order?._id}
                        </Link>
                      </div>
                    </div>
                    <div className="order-details-container">
                      <div className="order-content">
                        {order?.items?.map((currOrder) => {
                          const product = currOrder?.product;
                          return (
                            <div
                              className="item"
                              key={`order-items-${product?.id}`}
                            >
                              <Link
                                to={`/products/${product._id}`}
                                className="link"
                              >
                                <img src={product?.image}></img>
                              </Link>
                              <div className="product-details">
                                <Link
                                  to={`/products/${product._id}`}
                                  className="link"
                                >
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
                                      {formatPrice(
                                        product?.price * currOrder?.quantity,
                                        { showCurrency: true }
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <button
                                    className="button-success"
                                    onClick={() => handleBuyAgain(product)}
                                  >
                                    <span className="buy-again">
                                      <i className="fa fa-refresh"></i>
                                      <span>Buy Again</span>
                                    </span>
                                  </button>
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
                );
              })}
            </div>
          </div>
        </div>
      )}
      {isEmpty(ordersData) && noOrdersMessageTemplate}
    </>
  );
};

export default OrderList;
