import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { noop } from "lodash";
import PropTypes from "prop-types";

import Button from "./Button";

function Modal({
  title,
  children,
  Icon = null,
  iconClassName = "",
  primaryAction = null,
  secondaryAction = null,
  secondaryActionLabel = "",
  primaryActionLabel = "",
  primaryActionVariant = "primary",
  secondaryActionVariant = "secondary",
  onDismiss = noop,
  isOpen = false,
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onDismiss}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onDismiss}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                {Icon ? (
                  <div
                    className={clsx([
                      "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10",
                      iconClassName,
                    ])}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                ) : null}
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>
              </div>
              {primaryAction ? (
                <div className="flex justify-end space-x-4 mt-5 sm:mt-4">
                  {secondaryAction ? (
                    <Button
                      label={secondaryActionLabel}
                      variant={secondaryActionVariant}
                      onClick={onDismiss}
                      rounded
                    />
                  ) : null}
                  <Button
                    variant={primaryActionVariant}
                    label={primaryActionLabel}
                    onClick={primaryAction}
                    rounded
                  />
                </div>
              ) : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  iconClassName: PropTypes.string,
  primaryAction: PropTypes.func,
  primaryActionLabel: PropTypes.string,
  primaryActionVariant: PropTypes.oneOf([
    "secondary",
    "error",
    "warning",
    "success",
    "primary",
  ]),
  secondaryAction: PropTypes.func,
  secondaryActionLabel: PropTypes.string,
  secondaryActionVariant: PropTypes.oneOf([
    "secondary",
    "error",
    "warning",
    "success",
    "primary",
  ]),
  onDismiss: PropTypes.func.isRequired,
};

export default Modal;
