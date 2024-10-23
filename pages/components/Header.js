import Link from "next/link";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../lib/CartContext";
import { useRouter } from "next/router";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import logo from "../../public/assets/icons/index";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const { cartProducts } = useContext(CartContext);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    // Update the currentPath state on client side
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const active = "p-2 text-primary bg-secondary rounded-lg";
  const inActive = "p-2";

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-2 bg-white md:px-4">
        <div className="flex items-center h-16 gap-8 mx-auto border-b max-w-screen-2xl border-primary border-opacity-40">
          <Link
            className="flex items-center gap-1 text-lg font-medium text-text hover:text-primary "
            href="/"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="3em"
              width="3em"
              // {...props}
            >
              <path d="M4 6a2 2 0 110 4 2 2 0 010-4zm2.625.547a3 3 0 00-5.584.953H.5a.5.5 0 000 1h.541A3 3 0 007 8a1 1 0 012 0 3 3 0 005.959.5h.541a.5.5 0 000-1h-.541a3 3 0 00-5.584-.953A1.993 1.993 0 008 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg> */}

            <span> / ClearView Optics</span>
          </Link>

          <div className="flex items-center justify-end flex-1 md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-md">
                <li>
                  <Link
                    className={`text-accent transition hover:text-accent/75 ${
                      pathname === "/" ? "text-primary" : ""
                    } `}
                    href="/"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className={`text-accent transition hover:text-accent/75 ${
                      pathname === "/products" ? "text-primary" : ""
                    } `}
                    href="/products"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    className={`text-accent transition hover:text-accent/75 ${
                      pathname === "/about" ? "text-primary" : ""
                    } `}
                    href="/about"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className={`text-accent transition hover:text-accent/75 ${
                      pathname === "/contact" ? "text-primary" : ""
                    } `}
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>

                {/* <li>
                  <select
                    className={`text-accent transition hover:text-accent/75 ${
                      pathname === "/categories" ? "text-primary" : ""
                    } `}
                    href="/categories"
                  >
                    <option value="0">Categories</option>

                    {categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </li> */}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
              <div className="flow-root ml-4 lg:ml-4">
                <Link href="/cart" className="flex items-center p-2 -m-2 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>

                  <span className="ml-2 font-bold text-md text-primary group-hover:text-text">
                    {cartProducts.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>

              {/* Mobile navigation button */}
              <div className="block mr-0 md:hidden">
                <button
                  onClick={toggleMobileNav}
                  className="p-2 text-gray-600 transition bg-gray-100 rounded hover:text-gray-600/75"
                >
                  {isMobileNavOpen ? (
                    // X icon for close
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    // Menu icon for open
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {isMobileNavOpen && (
                <div className="absolute right-0 p-6 text-lg bg-white border rounded shadow-lg md:hidden top-24 border-zinc-200 ">
                  <nav aria-label="Global">
                    <ul className="flex flex-col items-start gap-6 text-md">
                      <li>
                        <Link
                          className={`text-accent transition hover:text-accent/75 ${
                            pathname === "/" ? active : inActive
                          } `}
                          href="/"
                          onClick={toggleMobileNav}
                        >
                          Home
                        </Link>
                      </li>

                      <li>
                        <Link
                          className={`text-accent transition hover:text-accent/75 ${
                            pathname === "/products" ? active : inActive
                          }`}
                          href="/products"
                          onClick={toggleMobileNav}
                        >
                          All Products
                        </Link>
                      </li>

                      <li>
                        <Link
                          className={`text-accent transition hover:text-accent/75 ${
                            pathname === "/categories" ? active : inActive
                          }`}
                          href="/categories"
                          onClick={toggleMobileNav}
                        >
                          Categories
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <header className="fixed z-50 flex items-center justify-around w-full my-3 bg-gray-200 border-b md:hidden top-12">
        <div className="inline-flex gap-8 p-1">
          <Link
            href={"/"}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-md text-accent hover:text-gray-700 focus:relative ${
              pathname === "/" ? "text-primary" : ""
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Home
          </Link>

          <Link
            href={"/products"}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-md text-accent hover:text-gray-700 focus:relative ${
              pathname === "/products" ? "text-primary" : ""
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            Products
          </Link>

          <Link
            href={"/cart"}
            className={`inline-flex items-center gap-2 rounded-md  px-4 py-2 text-md   ${
              pathname === "/cart" ? "text-primary" : ""
            } `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Cart
          </Link>
        </div>
      </header>
    </>
  );
}
