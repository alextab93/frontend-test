import React from "react";
import { noop } from "lodash";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/outline";

import Button from "./Button";

function Heading({
  title,
  subTitle,
  buttonLabel,
  onButtonClick = noop,
  sticky = false,
}) {
  const history = useHistory();
  return (
    <div
      className={clsx([
        "bg-white px-6 py-5 border-b border-gray-200 sm:px-6",
        {
          "sticky top-0": sticky,
        },
      ])}
    >
      <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="text-sm">
          <button type="button" onClick={() => history.goBack()}>
            <span className="sr-only">Go back</span>
            <ChevronLeftIcon className="w-10 h-10" aria-hidden="true" />
          </button>
        </div>
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-4 font-normal text-gray-400">
            {subTitle}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button label={buttonLabel} onClick={onButtonClick} rounded />
        </div>
      </div>
    </div>
  );
}

Heading.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
  sticky: PropTypes.bool,
};

export default Heading;
