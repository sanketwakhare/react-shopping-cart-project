import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "underscore";

import { OrderStatus } from "components/Orders/Orders.const";
import useApi from "hooks/useApi";
import UrlConfig from "utils/UrlConfig";

import { PaymentStatus } from "./PaymentStatus";

const loadScript = async () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const PaymentsPage = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const location = useLocation();
  const navigate = useNavigate();
  const { request } = useApi();
  const { orderId = null, amount } = location.state ?? {};

  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const getPaymentTransactionByOrderId = async (orderId) => {
    return await request(
      UrlConfig.GET_PAYMENT_TXN_BY_ORDER_ID_URL.replace(":orderId", orderId)
    );
  };

  const capturePaymentInitiated = async (orderDetails) => {
    const payload = {
      orderId: orderDetails?.orderId,
      txnOrderId: orderDetails?.paymentTxnOrderId,
      amount: orderDetails?.amount,
      currency: orderDetails?.currency,
    };
    const resp = await request(UrlConfig.CAPTURE_PAYMENT_TXN_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (resp?.loadError) {
      setError(resp?.loadError?.message);
    }
  };

  const updatePaymentTransaction = async (orderDetails) => {
    const txnOrderId = orderDetails?.txnOrderId;
    const payload = {
      txnPaymentId: orderDetails?.txnPaymentId,
      txnPaymentStatus: orderDetails?.txnPaymentStatus,
      txnPaymentCompletedAt: orderDetails?.txnPaymentCompletedAt,
    };
    const resp = await request(
      UrlConfig.UPDATE_PAYMENT_TXN_BY_TXN_ORDER_ID_URL.replace(
        ":txnOrderId",
        txnOrderId
      ),
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
    if (resp?.loadError) {
      setError(resp?.loadError?.message);
    }
  };

  const verifyPaymentSignature = async (paymentDetails) => {
    const { paymentTxnOrderId, paymentId, signature } = paymentDetails;
    const resp = await request(UrlConfig.VERIFY_PAYMENT_SIGNATURE_URL, {
      method: "POST",
      body: JSON.stringify({
        paymentTxnOrderId,
        paymentId,
      }),
      headers: {
        "x-razorpay-signature": signature,
      },
    });
    if (resp?.loadError) {
      setError(resp?.loadError?.message);
    }
  };

  const updateOrderStatus = async (orderId, paymentDetails) => {
    const { status, comments = null } = paymentDetails;
    const resp = await request(
      UrlConfig.UPDATE_ORDER_STATUS_URL.replace(":orderId", orderId),
      {
        method: "PUT",
        body: JSON.stringify({
          status,
          comments,
        }),
      }
    );
    if (resp?.loadError) {
      setError(resp?.loadError?.message);
    }
  };

  const makePayment = async (orderData) => {
    const { paymentTxnOrderId, orderId, amount, currency } = orderData;
    const { REACT_APP_RAZORPAY_PUBLIC_KEY } = process.env;

    const options = {
      key: REACT_APP_RAZORPAY_PUBLIC_KEY,
      amount: amount.toString(),
      currency: currency,
      name: "Shophub Corp",
      description: "Shophub Payment transaction",
      order_id: paymentTxnOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        // verify payment signature
        await verifyPaymentSignature({
          paymentTxnOrderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });

        setPaymentStatus(PaymentStatus.PAID);

        const now = Date.now();
        // capture payment transaction
        await updatePaymentTransaction({
          // orderId here is id from database
          orderId: orderId,
          txnOrderId: response.razorpay_order_id,
          txnPaymentId: response.razorpay_payment_id,
          txnPaymentStatus: PaymentStatus.PAID,
          txnPaymentCompletedAt: now,
        });

        await updateOrderStatus(orderId, {
          status: OrderStatus.PAYMENT_COMPLETED,
          comments: "payment completed",
        });

        navigate("/orders");
      },
      modal: {
        ondismiss: async () => {
          setPaymentStatus(PaymentStatus.PENDING);

          await updateOrderStatus(orderId, {
            status: OrderStatus.PAYMENT_PENDING,
            comments: "payment cancelled",
          });

          await updatePaymentTransaction({
            txnOrderId: paymentTxnOrderId,
            txnPaymentStatus: PaymentStatus.PENDING,
          });
        },
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: user?.name, //your customer's name
        email: user?.email,
        contact: user?.mobile, //Provide the customer's phone number for better conversion rates
      },
      customer: {
        name: user?.name,
        email: user?.email,
        contact: "+91" + user?.mobile,
      },
      notes: {
        address: "Shophub Services",
      },
      theme: {
        color: "#00008b",
      },
    };

    const rzpInstance = new window.Razorpay(options);
    rzpInstance.open();

    rzpInstance.on("payment.failed", async function (response) {
      console.log(response);
      setPaymentStatus(PaymentStatus.FAILED);

      await updateOrderStatus(orderId, {
        status: OrderStatus.PAYMENT_FAILED,
        comments: "payment failed: " + response?.error?.description,
      });

      await updatePaymentTransaction({
        txnOrderId: paymentTxnOrderId,
        txnPaymentId: response?.error?.metadata?.payment_id,
        txnPaymentStatus: PaymentStatus.FAILED,
      });
    });
  };

  const initPayment = async () => {
    if (orderId) {
      // load checkout.js script
      await loadScript();

      const response = await getPaymentTransactionByOrderId(orderId);
      const currPaymentTxnForOrder = response?.data?.data ?? [];
      if (!isEmpty(currPaymentTxnForOrder)) {
        const pendingTxn = currPaymentTxnForOrder?.find((txn) => {
          return txn?.txnPaymentStatus === "pending";
        });
        if (pendingTxn) {
          await makePayment({
            paymentTxnOrderId: pendingTxn?.txnOrderId,
            orderId: pendingTxn?.orderId,
            amount: pendingTxn?.amount,
            currency: pendingTxn?.currency,
          });
        } else {
          setPaymentStatus("payment-already-completed");
          console.log("orderId", orderId);
          setTimeout(() => {
            // navigate("orders");
            navigate("/payment", {});
          }, 1000);
        }
      } else {
        // create new payment transaction
        const payload = {
          orderId: orderId,
          amount: amount,
          currency: "INR",
        };

        // create txn payment order(checkout api)
        const resp = await request(UrlConfig.CREATE_PAYMENT_ORDER_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (resp?.loadError) {
          setError(resp?.loadError?.message);
        } else if (resp?.data) {
          const orderData = resp?.data;
          console.log(orderData);

          // capture payment transaction order details
          await capturePaymentInitiated(orderData);

          // make payment
          await makePayment(orderData);
        }
      }
    } else {
      // if not order id for payment page, navigate to orders page
      navigate("/orders");
    }
  };

  // load script
  useEffect(() => {
    const init = async () => {
      try {
        setPaymentStatus("initiated");
        await initPayment();
      } catch (e) {
        console.error(e);
      }
    };
    init();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {!error && paymentStatus === PaymentStatus.PAID && (
        <div>Payment completed. Order placed successfully</div>
      )}
      {!error && paymentStatus === PaymentStatus.FAILED && (
        <div>Payment Failed</div>
      )}
      {!error && paymentStatus === PaymentStatus.PENDING && (
        <div>Payment Cancelled</div>
      )}
      {!error && paymentStatus === "initiated" && (
        <div>Processing Payment...</div>
      )}
      {!error && paymentStatus === "payment-already-completed" && (
        <div>Payment already completed for this order</div>
      )}
    </div>
  );
};

export default PaymentsPage;
