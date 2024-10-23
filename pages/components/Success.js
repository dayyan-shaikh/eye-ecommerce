import Link from "next/link";

export default function Success({ paymentDetail }) {
  console.log(paymentDetail);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center">
          <div className="p-4 bg-green-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-12 h-12 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Checkout Successful
          </h2>
          {/* <h3>razorpay_payment_id: {paymentDetail.razorpay_payment_id}</h3> */}
          <p className="max-w-sm mt-2 text-gray-600">
            Your order has been received and is being processed. We&apos;ll send
            you an email with more details.
          </p>
          <Link
            href="/"
            className="block px-4 py-2 mt-4 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
