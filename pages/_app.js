import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Header from "./components/Header";
import { CartContextProvider } from "../lib/CartContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import CanvasCursor from "./components/other/canvas-cursor";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import Chatbot from "./components/Chatbot";
import React, { useState } from "react";

const inter = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  return (
    <>
      <ClerkProvider>
        <SessionProvider session={session}>
          <CanvasCursor />
          <CartContextProvider>
            <main
              className={`${inter.className} min-h-screen max-w-screen-2xl mx-auto bg-background sm:px-6`}
            >
              <Header />
              <Toaster position="top-center" />
              <div className="min-h-screen">
                <Component {...pageProps} className="sm:mt-36" />
              </div>
              <Chatbot
                isOpen={isChatbotOpen}
                onClose={() => setIsChatbotOpen(false)}
              />
              {!isChatbotOpen ? (
                <button
                  className="fixed p-3 text-white transition-colors bg-blue-500 rounded-full shadow-lg bottom-4 right-4 hover:bg-blue-600"
                  onClick={() => setIsChatbotOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </button>
              ) : (
                <></>
              )}

              <Footer />
            </main>
          </CartContextProvider>
        </SessionProvider>
      </ClerkProvider>
    </>
  );
}
