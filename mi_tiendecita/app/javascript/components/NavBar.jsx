import React, { Fragment, useCallback, useMemo } from "react";
import { useQueryClient } from "react-query";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronLeftIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { PlusSmIcon } from "@heroicons/react/solid";
import { noop } from "lodash";
import clsx from "clsx";

import Button from "./Button";
import { useCurrentUser } from "_hooks";
import { useLogOut } from "_mutations";
import { useNavigation } from "_hooks";

export default function NavBar({
  actionButtonLabel,
  onActionButtonClick = noop,
  handleBack = null,
  headingTitle,
  sticky = true,
}) {
  const user = useCurrentUser();
  const { mutateAsync: logOut } = useLogOut();
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const onEndSession = useCallback(async () => {
    try {
      await logOut();
      navigation.navigate("/login");
      queryClient.invalidateQueries("session");
    } catch (error) {
      console.log(error);
    }
  }, [queryClient]);

  const userNavigation = useMemo(
    () => [
      { name: "Your Profile", action: noop }, // To be implemented
      { name: "Settings", action: noop }, // To be implemented
      { name: "Sign out", action: () => onEndSession() },
    ],
    [onEndSession]
  );

  return (
    <Disclosure
      as="nav"
      className={clsx(["bg-gray-800", { "top-0 sticky": sticky }])}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex md:justify-between flex-1">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex items-center md:space-x-4">
                  <div className="hidden md:flex">
                    {handleBack ? (
                      <button type="button" onClick={handleBack}>
                        <span className="sr-only">Go back</span>
                        <ChevronLeftIcon
                          className="w-10 h-10 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    ) : null}
                  </div>
                  <p className="text-sm font-medium md:text-lg text-white md:font-semibold">
                    {headingTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {actionButtonLabel ? (
                  <div className="flex-shrink-0">
                    <Button
                      Icon={PlusSmIcon}
                      label={actionButtonLabel}
                      onClick={onActionButtonClick}
                      rounded
                    />
                  </div>
                ) : null}

                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.avatarUrl}
                          alt="avatar"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <div
                                onClick={item.action}
                                className={clsx([
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer",
                                  { "bg-gray-100": active },
                                ])}
                              >
                                {item.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            {handleBack ? (
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Disclosure.Button
                  as="button"
                  className={clsx([
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium",
                  ])}
                >
                  <div onClick={handleBack}>Go to stores list</div>
                </Disclosure.Button>
              </div>
            ) : null}

            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.avatarUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1 sm:px-3">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <div onClick={item.action}>{item.name}</div>
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
