"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../sanity.types";
import useBasketStore from "@/app/(store)/store";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}
const AddToBasketButton = ({ product, disabled }: AddToBasketButtonProps) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center md:space-x-3 gap-1">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-2 h-2 md:w-8 md:h-8 p-4 rounded-md flex items-center justify-center transition-colors duration-200 ${
          itemCount == 0
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={itemCount == 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-gray-900" : "text-gray-900"}`}
        >
          {" "}
         -
        </span>
      </button>
      <span className="w-4 md:w-8 text-center font-semibold">{itemCount}</span>

      <button
        onClick={() => addItem(product)}
        className={`md:w-48 px-4 py-2 h-8 rounded-md flex items-center justify-center transition-colors duration-200 ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-700"
        }`}
        disabled={disabled}
      >
        <span
          className={`text-sm md:text-lg flex items-center m-2 ${itemCount === 0 ? "text-gray-400" : "text-white " }`}
        >
          {" "}
          Add
        </span>
      </button>
        
    </div>
  );
};

export default AddToBasketButton;
