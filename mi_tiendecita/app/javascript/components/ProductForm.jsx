import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

import { Input, Button } from "_components";
import { isPresent } from "_helpers/validations";

function ProductForm({ product, onSubmitForm = noop }) {
  const [images, setImages] = useState([]);
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [code, setCode] = useState(product?.code ?? "");
  const [price, setPrice] = useState(product?.price / 100 ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(
    () =>
      isPresent(name) &&
      isPresent(description) &&
      isPresent(code) &&
      isPresent(price),
    [name, description, code, price]
  );

  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const product = {
      name,
      description,
      code,
      price: Math.ceil(price * 100),
    };
    await onSubmitForm(product, images);
    setName("");
    setImages([]);
    setDescription("");
    setCode("");
    setPrice("");
    setIsSubmitting(false);
  }, [onSubmitForm, name, description, code, price, images]);

  return (
    <div className="flex-col space-y-4">
      <Input.Group>
        <Input.Label>Name</Input.Label>
        <Input.Text
          className="rounded-full"
          type="text"
          placeholder="Product's name"
          value={name}
          onValueChange={setName}
          disabled={isSubmitting}
        />
      </Input.Group>
      <Input.Group>
        <Input.Label>Description</Input.Label>
        <Input.Text
          className="rounded-full"
          multiline
          type="text"
          value={description}
          onValueChange={setDescription}
          disabled={isSubmitting}
        />
      </Input.Group>
      <Input.Group>
        <Input.Label>Price</Input.Label>
        <Input.Text
          className="rounded-full"
          type="number"
          placeholder="Product's price in USD"
          value={price}
          onValueChange={setPrice}
          disabled={isSubmitting}
        />
      </Input.Group>
      <Input.Group>
        <Input.Label>Code</Input.Label>
        <Input.Text
          className="rounded-full"
          type="text"
          placeholder="e.g. LGA123"
          value={code}
          onValueChange={setCode}
          disabled={isSubmitting}
        />
      </Input.Group>
      <Input.Group>
        <Input.Label>Image</Input.Label>
        <Input.ImageUpload images={images} onChange={setImages} />
      </Input.Group>
      <Button
        stretched
        rounded
        label={isSubmitting ? "Submitting..." : "Submit"}
        onClick={onSubmit}
        disabled={!isValid || isSubmitting}
      />
    </div>
  );
}

ProductForm.propTypes = {
  product: PropTypes.object,
  onSubmitForm: PropTypes.func,
};

export default ProductForm;
