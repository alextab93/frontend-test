import React, { useState } from "react";
import Modal from "./Modal";
export function AddProductModal({ onSubmit }) {
  return <Modal title="Add new product" isOpen={isOpen}></Modal>;
}
