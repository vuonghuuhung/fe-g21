import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const { state } = useLocation();
  const products = state.products;
  const categoryName = state.categoryName;

  return (
    <>
      <div className={"flex h-96 w-full bg-[#1990c6]"}>
        <h1 className="m-auto text-white text-8xl font-semibold">
          {categoryName}
        </h1>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products !== null
              ? products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
