import React, { useCallback, useState } from "react";
import { NewProductForm } from "_components";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <NewProductForm />
    </div>
  );
}
