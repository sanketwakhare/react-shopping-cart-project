import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useApi from "hooks/useApi";
import UrlConfig from "utils/UrlConfig";
import { formatDate, formatPrice } from "utils/Utils";

import { OrderStatusDisplayMapping } from "../Orders.const";
import "./orders-list.scss";

const OrderList = () => {
  const { request } = useApi();
  const navigate = useNavigate();
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

  return (
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
            return (
              <div
                key={`order-${order?._id}`}
                className="order-container box-shadow"
              >
                <div className="order-header">
                  <div className="order-property order-date">
                    <label>Order Date:</label>
                    <span>{formatDate(order?.createdAt)}</span>
                  </div>
                  <div className="order-property order-status">
                    <label>Status:</label>
                    <span>{OrderStatusDisplayMapping[order?.status]}</span>
                  </div>
                  <div className="order-property order-amount">
                    <label>Total Amount:</label>
                    <span>
                      {formatPrice(order?.totalAmount, { showCurrency: true })}
                    </span>
                  </div>
                  <div className="order-property order-id">
                    <label>Order Id:</label>
                    <div>{order?._id}</div>
                  </div>
                </div>
                <div className="order-content">
                  {order?.items?.map((currOrder) => {
                    const product = currOrder?.product;
                    return (
                      <div className="item">
                        <Link to={`/products/${product._id}`} className="link">
                          <img src={product.image}></img>
                        </Link>
                        <div className="product-details">
                          <Link
                            to={`/products/${product._id}`}
                            className="link"
                          >
                            {product?.title}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
