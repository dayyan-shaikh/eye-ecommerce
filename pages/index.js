import { mongooseConnect } from "@/lib/mongoose";
import Hero from "./components/Hero";
import { Product } from "@/models/Product";
import Products from "./components/Products";
import Collection from "./components/Collection";
import ServiceCard from "./components/ServiceCard";
import {
  facebook,
  instagram,
  shieldTick,
  support,
  truckFast,
  twitter,
} from "../public/assets/icons";

const services = [
  {
    imgURL: truckFast,
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    imgURL: shieldTick,
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    imgURL: support,
    label: "Love to help you",
    subtext: "Our dedicated team is here to assist you every step of the way.",
  },
];

export default function Home({
  featuredProduct,
  newProducts,
  collectionProduct1,
  allProducts,
}) {
  return (
    <main className={`min-h-screen p-4 bg-background`}>
      <Hero product={featuredProduct} />
      <Products products={newProducts} />
      <hr className="h-px my-1 bg-gray-300 border-0" />
      <Collection product={collectionProduct1} />
      <section className="flex flex-wrap justify-center max-container gap-9">
        {services.map((service) => (
          <ServiceCard key={service.label} {...service} />
        ))}
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: 1 },
    limit: 5,
  });
  const allProducts = await Product.find({}, null, { sort: { _id: 1 } });

  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}
