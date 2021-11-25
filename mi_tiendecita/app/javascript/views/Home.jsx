import React, { useCallback, useState } from "react";

import { NavBar } from "_components";
import { useNavigation } from "_hooks";
import { useStores } from "_queries";

export default function Home() {
  const { data: stores } = useStores();
  const navigation = useNavigation();

  return (
    <div className="flex flex-col h-screen">
      <NavBar headingTitle="MiTiendecita" />
      <div className="flex flex-grow items-center justify-center">
        <div className="flex-col space-y-4">
          <div className="text-xl font-bold">Select a store</div>
          <div className="flex-col space-y-2">
            {stores.map((store) => (
              <div
                key={store.id}
                className="flex px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  navigation.navigate(`store/${store.id}/products`)
                }
              >
                <div className="text-lg">{store.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
