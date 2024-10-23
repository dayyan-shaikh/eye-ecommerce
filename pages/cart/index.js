import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../lib/CartContext";
import axios from "axios";
import Link from "next/link";
import Spinner from "../components/Spinner";
import { useSession } from "next-auth/react";
import Success from "../components/Success";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Loading from "../components/loading/Loading";
import { useUser } from "@clerk/nextjs";

export default function Cart() {
  const { userId } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  const { cartProducts, removeProduct, addProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState();

  useEffect(() => {
    setLoading(true);
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        setLoading(false);
      });
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  let subTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    subTotal = total + total / 1000;
  }

  function increaseProduct(id) {
    addProduct(id);
  }

  function decreaseProduct(id) {
    removeProduct(id);
    toast.success("Removed product!!");
  }
  function deleteCart(id) {
    clearCart();
    toast.success("Cart cleared!!");
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  async function razorpayCheckout(params) {
    console.log(name);
    console.log(email);

    setIsProcessing(true);
    const AMOUNT = total;
    try {
      console.log("01");

      const response = await fetch("/api/razorpayCheckout", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ total: total }),
      });
      const data = await response.json();
      console.log("02");

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "Eyeware Ecommerce",
        description: "Test",
        order_id: data.orderId,
        handler: async function (res) {
          console.log("Payment Successful", res);
          setPaymentDetail(res);

          const response = await axios.post("/api/checkout", {
            name,
            email,
            address,
            country,
            zip,
            city,
            cartProducts,
          });

          if (response) {
            // window.location = response.data.url
            toast.success("Order placed successfully");
            setIsSuccess(true);
            clearCart();
          } else {
            toast.error("An error occured!!");
          }
        },
        prefill: {
          name: "SUMIT TRIPATHI",
          email: "sumit@gmail.com",
          contact: "999999999",
        },
        theme: {
          color: "#3399c",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Faield", error);
    } finally {
      setIsProcessing(false);
    }
  }

  // if (!isLoaded && !isSignedIn) {
  //   return (
  //     <section className="min-h-screen bg-cover ">
  //       <div className="flex flex-col min-h-screen ">
  //         <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
  //           <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
  //             <Loading />
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (isSuccess) {
    return (
      <>
        <Success paymentDetail={paymentDetail} />
      </>
    );
  }

  if (!isLoaded && !isSignedIn) {
    return (
      <>
        <section className="min-h-screen bg-cover ">
          <div className="flex flex-col min-h-screen ">
            <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
              <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
                <Loading />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (userId) {
    return (
      <>
        <section className="flex justify-between space-x-4 max-md:flex-col ">
          <div className="px-4 md:w-2/3">
            <div className="mt-16 md:mt-6">
              <header className="flex justify-between w-full text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>
              {loading ? (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              ) : !products?.length ? (
                <p className="my-6 text-center ">Your cart is empty</p>
              ) : (
                <>
                  {products?.length > 0 &&
                    products.map((product) => (
                      <div key={product._id} className="mt-8">
                        <ul className="space-y-4">
                          <li className="flex items-center justify-between gap-4">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="object-cover w-16 h-16 rounded"
                            />

                            <div>
                              <h3 className="max-w-md text-md text-text">
                                {product.title}
                              </h3>

                              <dl className="mt-0.5 space-y-px text-[10px] text-text">
                                <p>
                                  ₹. &nbsp;
                                  {cartProducts.filter(
                                    (id) => id === product._id
                                  ).length * product.price}
                                </p>
                              </dl>
                            </div>

                            <div>
                              <label htmlFor="Quantity" className="sr-only">
                                {" "}
                                Quantity{" "}
                              </label>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  className="w-10 h-10 leading-10 transition border text-text hover:opacity-75 "
                                  onClick={() => decreaseProduct(product._id)}
                                >
                                  -
                                </button>

                                <input
                                  type="number"
                                  id="Quantity"
                                  value={
                                    cartProducts.filter(
                                      (id) => id === product._id
                                    ).length
                                  }
                                  readOnly
                                  className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                />

                                <button
                                  type="button"
                                  className="w-10 h-10 leading-10 transition border text-text hover:opacity-75"
                                  onClick={() => increaseProduct(product._id)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <p className="mt-8 text-lg font-medium">
                          Shipping Methods
                        </p>
                      </div>
                    ))}
                  <form className="grid gap-6 mt-5">
                    <div className="relative">
                      <input
                        className="hidden peer"
                        id="radio_1"
                        type="radio"
                        name="radio"
                        checked
                        readOnly
                      />
                      <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
                      <label
                        className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                        htmlFor="radio_1"
                      >
                        <img
                          className="object-contain w-14"
                          src="https://1000logos.net/wp-content/uploads/2021/04/Fedex-logo.png"
                          alt=""
                        />
                        <div className="ml-5">
                          <span className="mt-2 font-semibold">
                            Fedex Delivery
                          </span>
                          <p className="text-sm leading-6 text-slate-500">
                            Delivery: 2-4 Days
                          </p>
                        </div>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        className="hidden peer"
                        id="radio_2"
                        type="radio"
                        name="radio"
                      />
                      <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
                      <label
                        className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                        htmlFor="radio_2"
                      >
                        <img
                          className="object-contain w-14"
                          src="https://i.pinimg.com/564x/cc/00/a1/cc00a128f07627f362bdc7cfcd6ee4ef.jpg"
                          alt=""
                        />
                        <div className="ml-5">
                          <span className="mt-2 font-semibold">
                            Logistic Delivery
                          </span>
                          <p className="text-sm leading-6 text-slate-500">
                            Delivery: 3-5 Days
                          </p>
                        </div>
                      </label>
                    </div>
                  </form>
                  <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
                    <div className="max-w-md space-y-4 ">
                      <dl className="space-y-0.5 text-md text-gray-700">
                        <div className="flex justify-end mb-3 text-red-400 border-b">
                          <button onClick={deleteCart}>Clear Cart</button>
                        </div>
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>₹. {formatPrice(total)}</dd>
                        </div>

                        <strike className="flex justify-between">
                          <dt>delivery</dt>
                          <dd>₹. 60</dd>
                        </strike>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>₹. {formatPrice(total)}</dd>
                        </div>
                      </dl>

                      <div className="flex justify-end">
                        <Link
                          className="flex items-center justify-between gap-4 px-4 py-2 text-orange-600 transition-colors border border-current rounded-lg group hover:bg-orange-600 focus:outline-none focus:ring active:bg-orange-500"
                          href="/products"
                        >
                          <span className="font-medium transition-colors group-hover:text-white">
                            Continue shopping
                          </span>

                          <span className="p-2 bg-white border border-orange-600 rounded-full shrink-0 group-active:border-orange-500">
                            <svg
                              className="w-4 h-4 rtl:rotate-180"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {!products.length ? (
            ""
          ) : (
            <div className="mt-16 md:1/3 md:mt-6">
              <header className="flex flex-col w-full text-start">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Shipping details
                </h1>
                <p className="mt-2 text-lg text-text">
                  We use your account details for shipping.
                </p>
              </header>
              <div className="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
                <div className="space-y-5">
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6">
                      <label className="block mb-1 text-sm font-medium text-text">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="block mb-1 text-sm font-medium text-text">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="col-span-12">
                      <label className="block mb-1 text-sm font-medium text-text">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="1864 Main Street"
                        value={address}
                        onChange={(ev) => setAddress(ev.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-6">
                      <label className="block mb-1 text-sm font-medium text-text">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={city}
                        onChange={(ev) => setCity(ev.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-4">
                      <label className="block mb-1 text-sm font-medium text-text">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={country}
                        onChange={(ev) => setCountry(ev.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-1 text-sm font-medium text-text">
                        Zip
                      </label>
                      <input
                        type="text"
                        name="zip"
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={zip}
                        onChange={(ev) => setZip(ev.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full col-span-12 text-center">
                      <button
                        disabled={isProcessing}
                        onClick={razorpayCheckout}
                        className="block w-full px-5 py-3 transition rounded disabled bg-secondary text-md text-text hover:bg-purple-300"
                      >
                        {isProcessing ? "Processing..." : "Checkout"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <>
      <SignedOut>
        <div className="grid h-screen px-4 bg-white place-content-center">
          <div className="text-center">
            <p className="mt-4 text-2xl text-text">
              You should sign Up to view cart Items
            </p>

            <button className="inline-block px-5 py-3 mt-6 text-sm font-medium rounded text-text bg-primary hover:bg-primary focus:outline-none focus:ring">
              <SignInButton />
            </button>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
