"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 shadow flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        E-Shop
      </Link>
      <div className="space-x-4">
        {session?.user ? (
          <>
            <span>Hello, {session.user.name?.split(" ")[0]}</span>
            <button onClick={() => signOut()} className="btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="btn">
              Login
            </Link>
            <Link href="/auth/register" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
