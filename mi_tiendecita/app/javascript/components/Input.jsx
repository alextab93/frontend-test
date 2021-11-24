import React from "react";
import clsx from "clsx";
import ImageUploading from "react-images-uploading";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { PhotographIcon, XCircleIcon } from "@heroicons/react/outline";

function Group({ className, children }) {
  return <div className={clsx(["flex-col", className])}>{children}</div>;
}

function Label({ children }) {
  return (
    <div className="block text-sm font-medium text-gray-700">{children}</div>
  );
}

function ErrorMessage({ message, className, ...props }) {
  return (
    <p className={clsx(["mt-2 text-sm text-red-600", className])} {...props}>
      {message}
    </p>
  );
}

function Text({
  Icon,
  value,
  className,
  placeholder,
  onValueChange,
  hasError,
  multiline = false,
  rows = 3,
  ...props
}) {
  return (
    <div className={clsx("mt-1 relative shadow-sm")}>
      {!multiline && Icon ? (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon
            className={clsx([
              "h-5 w-5 text-gray-400",
              {
                "text-red-400": hasError,
              },
            ])}
            aria-hidden="true"
          />
        </div>
      ) : null}

      {multiline ? (
        <textarea
          {...props}
          rows={rows}
          className={clsx([
            "shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md",
            {
              "focus:ring-indigo-500 focus:border-indigo-500": !hasError,
              "border-red-300 focus:ring-red-500 focus:border-red-500":
                hasError,
            },
          ])}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      ) : (
        <input
          {...props}
          className={clsx([
            "block w-full sm:text-sm border-gray-300 rounded-md",
            {
              "pl-10": Icon,
              "focus:ring-indigo-500 focus:border-indigo-500": !hasError,
              "border-red-300 focus:ring-red-500 focus:border-red-500":
                hasError,
            },
            className,
          ])}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      )}

      {hasError ? (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      ) : null}
    </div>
  );
}

function ImageUpload({
  images,
  onChange,
  uploadText = "Upload a file",
  alternativeUploadText = "or drag and drop",
  subMessage = "PNG, JPG, GIF up to 10MB",
  className,
}) {
  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey="dataUrl">
      {({ imageList, onImageUpload, onImageRemove, dragProps, isDragging }) => (
        <div
          className={clsx([
            "mt-1 cursor-pointer flex justify-center border-2 border-dashed border-gray-300 rounded-md",
            {
              "border-indigo-300": isDragging,
            },
            className,
          ])}
        >
          {imageList.length === 0 ? (
            <div
              className="flex px-6 pt-5 pb-6 w-full items-center justify-center"
              onClick={onImageUpload}
              {...dragProps}
            >
              <div className="flex-col space-y-1 text-center">
                <PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    {uploadText}
                  </span>
                  <p className="pl-1">{alternativeUploadText}</p>
                </div>
                <p className="text-xs text-gray-500">{subMessage}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-center p-4">
              {imageList.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image["dataUrl"]}
                    alt={image["file"].name}
                    height="250"
                  />
                  <div className="absolute text-red-500 -top-4 -right-4">
                    <button onClick={onImageRemove}>
                      <XCircleIcon className="w-10 h-10" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
}

function Input({ label, children }) {
  return (
    <Group>
      <Label>{label}</Label>
      {children}
    </Group>
  );
}

Input.Text = Text;
Input.Label = Label;
Input.Group = Group;
Input.ErrorMessage = ErrorMessage;
Input.ImageUpload = ImageUpload;

export default Input;
