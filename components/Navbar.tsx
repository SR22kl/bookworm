"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
  useUser,
} from "@clerk/nextjs";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
];

const Navbar = () => {
  const pathname = usePathname();

  const { user } = useUser();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
    ${
      isScrolled
        ? "bg-white/60 backdrop-blur-md shadow-sm"
        : "bg-('--bg-primary')"
    }`}
    >
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-0.5 items-center">
          <Image
            src="/assets/logo.png"
            alt="bookWorm"
            width={100}
            height={90}
            className="w-auto h-auto mt-2"
          />
          <span className="logo-text -ml-8">bookWorm</span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative inline-block pb-1"
              >
                {item.label}

                {/* Active underline */}
                {pathname === item.href && (
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-green-800" />
                )}

                {/* Hover underline */}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-green-600 transition-all duration-300 ease-out ${pathname === item.href ? "w-0" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            );
          })}

          {/* Clerk Auth Controls */}
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-50 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="nav-user-link">
                <UserButton />
                {user?.firstName && (
                  <Link href={"/subscriptions"} className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </div>
            </Show>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
