import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="px-4 py-8 mt-20 text-white bg-gray-900">
        <div className="flex flex-col justify-between mx-auto max-w-7xl md:flex-row">
          <div className="flex flex-col mb-6 md:mb-0">
            {/* <h1 className="mb-2 text-2xl font-bold">[COMPANY LOGO]</h1> */}
            <p className="mb-6 text-xl">
              Best website for various stylish sunglasses
            </p>
            <p className="text-xl">
              Reach us at{" "}
              <a href="" className="text-blue-400">
                Company Website Link
              </a>
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                href="https://www.facebook.com"
                className="hover:text-gray-400"
              >
                <i className="fab fa-facebook-f fa-xl"></i>
              </a>
              <a
                href="https://www.instagram.com"
                className="hover:text-gray-400"
              >
                <i className="fab fa-instagram fa-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                className="hover:text-gray-400"
              >
                <i className="fab fa-linkedin-in fa-xl"></i>
              </a>
              <a href="https://www.twitter.com" className="hover:text-gray-400">
                <i className="fa-brands fa-twitter fa-xl"></i>
              </a>
            </div>
          </div>
          <div className="flex flex-col mb-6 md:mb-0">
            <h2 className="mb-2 text-2xl font-semibold">Quick Links</h2>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <i className="mr-2 fas fa-phone-alt fa-xl"></i>
              <span className="text-lg">+91-8448288830</span>
            </div>
            <div className="flex items-center mb-2 l">
              <i className="mr-2 fas fa-envelope fa-xl"></i>
              <a href="mailto:hello@zyod.com" className="text-lg text-blue-400">
                eyeware_ecommerce@gmail.com
              </a>
            </div>
            <div className="flex items-center mb-2">
              <i className="mr-2 fas fa-map-marker-alt fa-xl"></i>
              <span className="text-lg">
                Krushna Nagr - 706, Tower C,Unitech Cyberpark, <br />
                Sector 39, Gurgaon, 122001
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="#" className="text-lg hover:text-gray-400">
            Privacy Policy
          </a>
        </div>
        <div className="mt-4 text-lg text-center text-gray-500">
          <p>Copyright © 2024-2025 Powered By Eyeware Ecommerce.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
