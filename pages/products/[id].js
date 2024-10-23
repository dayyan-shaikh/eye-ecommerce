import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Link from "next/link";
import { useContext } from "react";
import toast from "react-hot-toast";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  if (product) {
    return (
      <div className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col -mx-4 md:flex-row">
            <div className="px-4 md:flex-1">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="object-cover w-full h-full"
                  src={product.images[0]}
                  alt="Product Image"
                />
              </div>
              <div className="flex mb-4 -mx-2">
                <div className="w-1/2 px-2">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded-full dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() => {
                      addProduct(product._id);
                      toast.success("Item added to cart!!");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <Link href="/products">
                    <button className="w-full px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600">
                      All products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-4 md:flex-1">
              <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
                {product.title}
              </h2>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    ₹{product.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    In Stock
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Brand: {product.brand}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Color: {product.colors}
                </span>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {product.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <p>Product not found.</p>;
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
