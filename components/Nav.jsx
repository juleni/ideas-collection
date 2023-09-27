"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
  //const isUserLoggedIn = true;
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  // Run onload
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="Idea Collection Logo"
          width={100}
          height={100}
          className="object-contain"
        />
        <p className="logo_text">Ideas Collection</p>
      </Link>

      {/** Desktop Navigation */}
      <div className="sm:flex hidden">
        {
          /** isUserLoggedIn */ session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-idea" className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  alt="Profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {
                // If exists providers (onload), then map over all providers
                // and generate button for each one
                providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn ml-1"
                    >
                      Sign In {provider.name}
                    </button>
                  ))
              }
            </>
          )
        }
      </div>

      {/** Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          /** isUserLoggedIn */ session?.user ? (
            <div className="flex">
              {" "}
              <Image
                src={session?.user.image}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => settoggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => settoggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-idea"
                    className="dropdown_link"
                    onClick={() => settoggleDropdown(false)}
                  >
                    Create Idea
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      settoggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {
                // If exists providers (onload), then map over all providers
                // and generate button for each one
                providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  ))
              }
            </>
          )
        }
      </div>
    </nav>
  );
};

export default Nav;
