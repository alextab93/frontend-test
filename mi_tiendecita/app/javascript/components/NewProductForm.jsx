import React, { useState, useCallback } from "react";
import { Input, Button } from "_components";

export default function NewProductForm() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState();

  const onImageChange = (imageList) => {
    // data for submit
    console.log(imageList);
    setImages(imageList);
  };

  const isValid = false;

  const onSubmit = useCallback(() => {
    console.log("clicked submit");
  });

  return (
    <div className="flex-col space-y-4 w-1/3">
      <Input.Group>
        <Input.Label>Name</Input.Label>
        <Input.Text
          className="rounded-full"
          type="text"
          placeholder="Product's name"
          value={name}
          onValueChange={setName}
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
        />
      </Input.Group>
      <Input.Group>
        <Input.Label>Price</Input.Label>
        <Input.Text
          className="rounded-full"
          type="number"
          placeholder="Product's price $"
          value={price}
          onValueChange={setPrice}
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
        />
      </Input.Group>
      <Input.ImageUpload value={images} onChange={onImageChange} />
      <Button stretched rounded label="Submit" onClick={onSubmit} disabled />
    </div>
  );
}
