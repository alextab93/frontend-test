import React from "react";
import { useParams } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/solid";

import { NavBar } from "_components";
import { useNavigation } from "_hooks";
import { convertNumberToDollarWithCents } from "_utils/numbers";
import { useProduct, useStore } from "_queries";

export default function ProductDetailPage() {
  const { productId, storeId } = useParams();
  const { data: product } = useProduct(productId);
  const { data: store } = useStore(storeId);
  const navigation = useNavigation();

  const imageSrc = product.imageUrl
    ? product.imageUrl
    : "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png";

  const breadcrumbs = [
    { id: 1, href: `/store/${store.id}/products`, name: store.name },
  ];

  return (
    <div className="bg-white">
      <NavBar
        headingTitle="Product detail"
        handleBack={() => navigation.goBack()}
      />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <a
                      href={breadcrumb.href}
                      className="font-medium text-gray-500 hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                $ {convertNumberToDollarWithCents(product.price)}
              </p>
              <div className="ml-4 pl-4 border-l border-gray-300">
                <h2 className="sr-only">Product code</h2>
                <p className="ml-2 text-sm text-gray-500"># {product.code}</p>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="flex-shrink-0 w-5 h-5 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">In stock</p>
            </div>
          </section>
        </div>
        {/* Product image */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={imageSrc}
              alt={`${product.name} image`}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
