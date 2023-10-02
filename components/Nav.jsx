"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {
  //const isUserLoggedIn = true;
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  const router = useRouter();

  // Run onload
  useEffect(() => {
    /**
     * const setUpProviders = async() => {
     * const response = await getProviders();
     * setProviders(response)
     * }
     * setUpProviders();
     */
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/"); // Redirect to the dashboard page after signing out
    });
  };

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
              <Link href="/create-idea" className="orange_btn">
                Create Post
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="outline_btn"
              >
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
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                      className="orange_btn ml-1"
                    >
                      Sign In {"  "}
                      <Image
                        src={"/assets/icons/google.svg"} // " + provider.name + ".svg"}
                        alt="Profile"
                        width={30}
                        height={30}
                        className="rounded-full ml-2"
                      />
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
                      handleSignOut();
                    }}
                    className="mt-5 w-full orange_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <span className="flex items-center align-middle">
                Sign In
                {
                  // If exists providers (onload), then map over all providers
                  // and generate button for each one
                  providers &&
                    Object.values(providers).map((provider) => (
                      <button
                        type="button"
                        key={provider.name}
                        onClick={() =>
                          signIn(provider.id, { callbackUrl: "/" })
                        }
                        className=""
                      >
                        <Image
                          src={"/assets/icons/google.svg"} ///assets/icons/" + provider.name + ".svg
                          alt={provider.name}
                          width={50}
                          height={50}
                          className="rounded-full ml-2"
                        />
                      </button>
                    ))
                }
              </span>
            </>
          )
        }
      </div>
    </nav>
  );
};

export default Nav;
