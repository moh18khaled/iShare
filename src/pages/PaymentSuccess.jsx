import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const orderId = searchParams.get("token"); // Ensure correct param name

    if (orderId) {
      fetch(`${apiBaseUrl}/payments/capture-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID: orderId }),
      })
        .then((res) => res.json())
        .then((data) => setOrderDetails(data))
        .catch((error) => console.error("Error fetching order details:", error));
    }
  }, [searchParams, apiBaseUrl]);

  if (!searchParams.get("token")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-red-600">Invalid Payment</h2>
          <p className="mt-2 text-gray-600">No payment details found.</p>
          <a href="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-green-600">Payment Successful 🎉</h2>
        {orderDetails && (
          <div className="mt-4 text-gray-700">
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Amount:</strong> {orderDetails.amount} {orderDetails.currency}</p>
          <p><strong>Payment Date:</strong> {new Date(orderDetails.timestamp).toLocaleString()}</p>
        </div>
        )}
        <a href="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
