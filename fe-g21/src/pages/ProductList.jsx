import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const { state } = useLocation();
  const products = state.products;
  const categoryName = state.categoryName;
  const imgCategories = {
    shopAll:
      "https://cdn.shopify.com/s/files/1/0001/5211/collections/BestSellers-Category-Banner_2400x.jpg?v=1607034510",
    bestSellers:
      "https://cdn.shopify.com/s/files/1/0001/5211/collections/BestSellers-Category-Banner_2400x.jpg?v=1607034510",
    notebooks:
      "https://cdn.shopify.com/s/files/1/0001/5211/collections/BestSellers-Category-Banner_2400x.jpg?v=1607034510",
    deskSupplies:
      "https://cdn.shopify.com/s/files/1/0001/5211/collections/BestSellers-Category-Banner_2400x.jpg?v=1607034510",
    homeAndLifestyles:
      "https://cdn.shopify.com/s/files/1/0001/5211/collections/BestSellers-Category-Banner_2400x.jpg?v=1607034510",
  };
  let imgUrl = "";
  switch (categoryName) {
    case "Shop All":
      imgUrl = imgCategories.shopAll;
      break;
    case "Best Sellers":
      imgUrl = imgCategories.bestSellers;
      break;
    case "Notebooks & Planners":
      imgUrl = imgCategories.notebooks;
      break;
    case "Desk Supplies":
      imgUrl = imgCategories.deskSupplies;
      break;
    case "Home & Lifestyle":
      imgUrl = imgCategories.homeAndLifestyles;
      break;

    default:
      imgUrl = imgCategories.shopAll;
      break;
  }

  return (
    <>
      <div className={"flex h-96 w-full bg-[url('" + imgUrl + "')]"}>
        <h1 className="m-auto text-white text-8xl font-semibold">
          {categoryName}
        </h1>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products !== null
              ? products.map((product, index) => (
                  <ProductCard product={product} />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
