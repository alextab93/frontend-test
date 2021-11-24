import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { useStores } from "_queries";

export default function Home() {
  const { data: stores } = useStores();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col space-y-1">
        {stores.map((store) => (
          <div className="px-6 py-2">
            <Link to={`store/${store.id}/products`}>{store.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
