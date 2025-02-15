const PaymentCancel = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-red-600">Payment Canceled ❌</h2>
          <p className="text-gray-700 mt-2">Your payment was not completed.</p>
          <p className="text-gray-600">If this was a mistake, you can try again.</p>
  
          <a href="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Back to Home
          </a>
        </div>
      </div>
    );
  };
  
  export default PaymentCancel;  