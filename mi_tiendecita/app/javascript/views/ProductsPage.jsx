import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

import { ProductItem, Heading, Modal, ProductForm } from "_components";
import { useProducts, useStore } from "_queries";
import { useCreateProduct } from "_mutations";

export default function ProductsPage() {
  const { storeId } = useParams();
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: products } = useProducts(storeId);
  const { data: store } = useStore(storeId);
  const { mutateAsync: createProduct } = useCreateProduct();

  const onDismissModal = useCallback(() => {
    setAddProductModalOpen(false);
  }, []);

  const onSubmitNewProduct = useCallback(async (product, images) => {
    const image = images[0];
    try {
      await createProduct({
        storeId,
        ...product,
        image,
      });
      onDismissModal();
      queryClient.invalidateQueries(["store"]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex-col">
      <Heading
        title={`${store.name}'s products`}
        subTitle={`${store.description ?? "List of products for the store"}`}
        buttonLabel="Add new product"
        onButtonClick={() => setAddProductModalOpen(true)}
        sticky
      />
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ul>
      </div>
      <Modal
        title="Add new product"
        isOpen={addProductModalOpen}
        onDismiss={onDismissModal}
      >
        <ProductForm storeId={storeId} onSubmitForm={onSubmitNewProduct} />
      </Modal>
    </div>
  );
}
