import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

import { ProductItem, Modal, ProductForm, NavBar } from "_components";
import { useProducts, useStore } from "_queries";
import { useCreateProduct } from "_mutations";
import { useNavigation } from "_hooks";

export default function ProductsPage() {
  const { storeId } = useParams();
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const { data: products } = useProducts(storeId);
  const { data: store } = useStore(storeId);
  const { mutateAsync: createProduct } = useCreateProduct();

  const onDismissModal = useCallback(() => {
    setAddProductModalOpen(false);
  }, []);

  const onSubmitNewProduct = useCallback(async (product, images) => {
    const image = images.length > 0 ? images[0] : "";
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
      <NavBar
        headingTitle={`${store.name}'s products`}
        actionButtonLabel="New product"
        onActionButtonClick={() => setAddProductModalOpen(true)}
        handleBack={() => navigation.navigate("/home")}
      />
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onItemClick={() =>
                navigation.navigate(`/store/${storeId}/products/${product.id}`)
              }
            />
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
