import React from "react";
import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import SectionTitle from "../components/SectionTitle";
import Developers from "../components/Developers";

const data = {
  title: "Our Mission",
  desc: "Optics Wala is where style meets clarity. We’re passionate about bringing you the perfect combination of fashion-forward design and precise optics to enhance your vision and boost your confidence. Whether you're searching for prescription glasses, sunglasses, or blue-light-blocking lenses, we’ve got you covered with a range of frames to suit every face and personality.",
  image:
    "https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbenefit-one.a3b4f792.png&w=640&q=75",
  bullets: [
    {
      title: "Fashion Meets Functionality",
      desc: "We collaborate with top designers to offer frames that balance cutting-edge trends with timeless appeal.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Premium Quality Lenses",
      desc: "All of our lenses are crafted with precision to ensure optimal vision, UV protection, and scratch resistance.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Affordability",
      desc: "We’re committed to offering competitive prices so that looking stylish doesn’t break the bank.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const data2 = {
  title: "Our Vision",
  desc: "At Optics Wala, we envision a world where eyewear is more than just a necessity—it's an extension of who you are. We believe everyone should have access to quality eyewear that enhances both their vision and their sense of self. Our passion is to inspire confidence through glasses that combine elegance, functionality, and innovation.",
  image:
    "https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbenefit-two.1d7648d5.png&w=640&q=75",
  bullets: [
    {
      title: "Sustainability",
      desc: "We care about the planet. Our eco-friendly frames are crafted from sustainable materials, reducing our carbon footprint.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Excellent Customer Service",
      desc: "From helping you choose the perfect frames to ensuring a seamless delivery, our dedicated team is here to make your experience smooth and enjoyable.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Quality",
      desc: "We use the finest materials for both our frames and lenses, ensuring long-lasting wear and superior comfort.",
      icon: <SunIcon />,
    },
  ],
};

const developerData = [
  {
    name: "Sumit Tripathi",
    img: "https://avatars.githubusercontent.com/u/83841586?v=4",
    role1: "Founder and CEO",
    role2: "Backend Developer & DevOps Engg",
    facebookUrl: "https://www.facebook.com/sumittripathi07",
    githubUrl: "https://github.com/Sumittripathi07",
    linkedinUrl: "https://www.linkedin.com/in/sumittripathi07/",
  },
  {
    name: "Dayyan Shaikh",
    img: "https://avatars.githubusercontent.com/u/124500066?v=4",
    role1: "Founder and CEO",
    role2: "Frontend Developer & UI/UX",
    facebookUrl: "https://www.facebook.com/profile.php?id=100006539163202",
    githubUrl: "https://github.com/dayyan-shaikh",
    linkedinUrl: "https://www.linkedin.com/in/dayyan-shaikh/",
  },
];

const index = () => {
  return (
    <div>
      <div className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
        <div className={`flex items-center justify-center w-full lg:w-1/2`}>
          <div>
            <img
              src={data.image}
              width={521}
              height={521}
              alt="Benefits"
              className={"object-cover"}
              placeholder="blur"
            />
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center w-full lg:w-1/2 lg:order-1`}
        >
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                {data.title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                {data.desc}
              </p>
            </div>

            <div className="w-full mt-5">
              {data.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Benefit>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
        <div
          className={`flex items-center justify-center w-full lg:w-1/2  order-2`}
        >
          <div>
            <img
              src={data2.image}
              width={521}
              height={521}
              alt="Benefits"
              className={"object-cover"}
              placeholder="blur"
            />
          </div>
        </div>

        <div className={`flex flex-wrap items-center w-full lg:w-1/2`}>
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                {data2.title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                {data2.desc}
              </p>
            </div>

            <div className="w-full mt-5">
              {data2.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Benefit>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ======================Testimonials--------------------- */}
      <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        {/* Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers. */}
        <br />
      </SectionTitle>
      <div>
        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          <div className="lg:col-span-2 xl:col-auto">
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal ">
                <Mark>Perfect Fit and Style!</Mark> I’ve always struggled to
                find glasses that suit my face, but Visionary Eyewear’s virtual
                try-on made it so easy!
              </p>

              <Avatar
                image="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser1.71c84e11.jpg&w=48&q=75"
                name="Sarah Steiner"
                title="VP Sales at Google"
              />
            </div>
          </div>
          <div className="">
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal ">
                I was skeptical about buying glasses online, but the quality of
                Visionary Eyewear is exceptional. I got my prescription glasses
                for <Mark> half the price </Mark> I would have paid in-store,
                and they feel just as premium. Definitely worth it!
              </p>

              <Avatar
                image="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser2.33ea1ca7.jpg&w=48&q=75"
                name="Dylan Ambrose"
                title="Lead marketer at Netflix"
              />
            </div>
          </div>
          <div className="">
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal ">
                The frames are lightweight, durable, and I love how they look.
                Plus, the blue-light lenses have been a lifesaver for working on
                my computer.
              </p>

              <Avatar
                image="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser3.b804ab99.jpg&w=48&q=75"
                name="Gabrielle Winn"
                title="Co-founder of Acme Inc"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ======================Developers--------------------- */}
      <SectionTitle preTitle="Our Team" title="Our CEO's and Developers">
        {/* Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers. */}
        <br />
      </SectionTitle>
      <div className="flex items-center justify-around ">
        <Developers developerData={developerData} />
      </div>
    </div>
  );
};

function Benefit(props) {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
        {React.cloneElement(props.icon, {
          className: "w-7 h-7 text-indigo-50",
        })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {props.title}
        </h4>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {props.children}
        </p>
      </div>
    </div>
  );
}

export default index;

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <img
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
}
