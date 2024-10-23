import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function SignUp(params) {
  const { data: session } = useSession();

  if (session)
    return (
      <>
        <div className="grid h-screen px-4 bg-white place-content-center">
          <div className="text-center">
            <h1 className="font-black text-gray-200 text-9xl">Welcome</h1>

            {/* <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            sfasd!
          </p> */}

            <p className="mt-4 text-gray-500">{session.user.name}</p>

            <button className="inline-block px-5 py-3 mt-6 text-sm font-medium rounded text-text bg-primary hover:bg-primary focus:outline-none focus:ring">
              <Link href="/">Dashboard</Link>
            </button>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="text-center">
          <h1 className="font-black text-gray-200 text-9xl">SignUp</h1>

          {/* <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            sfasd!
          </p> */}

          <p className="mt-4 text-gray-500">Were the best at Optics Wala</p>

          <button
            onClick={() => signIn("google")}
            className="inline-block px-5 py-3 mt-6 text-sm font-medium rounded text-text bg-primary hover:bg-primary focus:outline-none focus:ring"
          >
            Login / Register
          </button>
        </div>
      </div>
    </>
  );
}
