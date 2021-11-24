import React, { useCallback, useState } from "react";
import { noop } from "lodash";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  TrashIcon,
  PencilAltIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";

import Button from "./Button";
import Modal from "./Modal";
import { useDeleteProduct, useUpdateProduct } from "_mutations";
import { convertNumberToDollarWithCents } from "_utils/numbers";
import ProductForm from "./ProductForm";

export default function ProductItem({ product, onItemClick = noop }) {
  const { storeId } = useParams();
  const { id: productId, name, price, imageUrl, description, code } = product;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const queryClient = useQueryClient();

  const onDeleteClick = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  const onEditClick = useCallback(() => {
    setEditModalOpen(true);
  }, []);
  const onDismissDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  const onDismissEditModal = useCallback(() => {
    setEditModalOpen(false);
  }, []);

  const onEditProduct = useCallback(
    async (updatedProduct, images) => {
      try {
        await updateProduct({
          productId,
          product: updatedProduct,
          newImage: images.length > 0 ? images[0] : null,
          oldImage: imageUrl,
        });
        setEditModalOpen(false);
        queryClient.invalidateQueries(["store"]);
      } catch (error) {
        console.log(error);
      }
    },
    [productId, updateProduct]
  );

  const onDeleteProduct = useCallback(async () => {
    try {
      await deleteProduct({ productId });
      setDeleteModalOpen(false);
      queryClient.invalidateQueries(["store"]);
    } catch (error) {
      console.log(error);
    }
  }, [deleteProduct, productId, setDeleteModalOpen, queryClient]);

  const imageHref = imageUrl
    ? imageUrl
    : "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png";

  return (
    <div className="px-4 py-4 sm:px-6 flex justify-between max-w-screen-md mx-auto">
      <div
        className="flex justify-between cursor-pointer"
        onClick={onItemClick}
      >
        <div className="flex">
          <img src={imageHref} alt={`${name} image`} width="100" />
          <div className="flex-col space-y-1 ml-4 pt-2 items-start">
            <div className="flex items-center space-x-1 justify-end">
              <span className="text-md">{name}</span>
              <span className="text-xs leading-4 text-gray-500">
                (#code: {code})
              </span>
            </div>
            <div className="text-xs text-gray-400">{description}</div>
            <div className="text-sm font-semibold">
              {convertNumberToDollarWithCents(price)} USD
            </div>
          </div>
        </div>
      </div>
      <div className="space-x-2">
        <Button
          size="xs"
          label="Edit"
          Icon={PencilAltIcon}
          variant="secondary"
          onClick={onEditClick}
          rounded
        />
        <Button
          size="xs"
          label="Delete"
          Icon={TrashIcon}
          variant="error"
          onClick={onDeleteClick}
          rounded
        />
      </div>
      <Modal
        title="Delete product"
        Icon={ExclamationIcon}
        iconClassName="text-red-500 bg-red-100"
        primaryAction={onDeleteProduct}
        primaryActionLabel="Delete"
        primaryActionVariant="error"
        secondaryAction={onDismissDeleteModal}
        secondaryActionLabel="Cancel"
        isOpen={deleteModalOpen}
        onDismiss={onDismissDeleteModal}
      >
        <p className="text-sm text-gray-500">
          {`Are you sure you want to delete the product: ${name} (#code: ${code})?`}
        </p>
      </Modal>
      <Modal
        title="Edit product"
        isOpen={editModalOpen}
        onDismiss={onDismissEditModal}
      >
        <ProductForm
          storeId={storeId}
          onSubmitForm={onEditProduct}
          product={product}
        />
      </Modal>
    </div>
  );
}
