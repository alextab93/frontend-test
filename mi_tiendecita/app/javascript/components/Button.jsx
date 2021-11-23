import React from "react";
import clsx from "clsx";

const BUTTON_CLASSES = {
  xs: "px-3 py-2 text-sm leading-4 font-medium",
  sm: "px-4 py-2 text-sm font-medium",
  md: "px-4 py-2 text-base font-medium",
  lg: "px-6 py-3 text-base font-medium",
};

const LEADING_ICON_CLASSES = {
  xs: "-ml-0.5 mr-2 h-4 w-4",
  sm: "-ml-1 mr-2 h-5 w-5",
  md: "-ml-1 mr-3 h-5 w-5",
  lg: "-ml-1 mr-3 h-5 w-5",
};

const TRAILING_ICON_CLASSES = {
  xs: "ml-2 -mr-0.5 h-4 w-4",
  sm: "ml-2 -mr-1 h-5 w-5",
  md: "ml-3 -mr-1 h-5 w-5",
  lg: "ml-3 -mr-1 h-5 w-5",
};

const BUTTON_VARIANTS = {
  primary:
    "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  secondary:
    "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
  error:
    "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
  success:
    "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500",
  warning:
    "bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500",
};

export default function Button({
  variant = "primary",
  Icon,
  iconPosition = "leading", // leading or trailing
  label,
  onClick,
  size = "sm",
  rounded = false,
  stretched = false,
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={clsx([
        "inline-flex items-center justify-center border border-transparent shadow-sm rounded-md text-white cursor-pointer",
        !disabled && BUTTON_VARIANTS[variant],
        BUTTON_CLASSES[size],
        {
          "rounded-full": rounded,
          "w-full": stretched,
          "cursor-not-allowed bg-gray-600 hover:bg-gray-700": disabled,
        },
      ])}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex items-center">
        {Icon && iconPosition === "leading" ? (
          <Icon className={LEADING_ICON_CLASSES[size]} aria-hidden="true" />
        ) : null}
        <div>{label}</div>
        {Icon && iconPosition === "trailing" ? (
          <Icon className={TRAILING_ICON_CLASSES[size]} aria-hidden="true" />
        ) : null}
      </div>
    </button>
  );
}
