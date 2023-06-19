import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getProductList, getAllProduct } from "../services/apis/product";
import { async } from "q";

export default function ProductList() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (id === "0") {
          console.log(page);
          response = await getProductList(page);
        } else {
          response = await getAllProduct();
        }
        setProducts(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page, id]);

  return (
    <>
      <div className={"flex h-96 w-full bg-[#1990c6]"}>
        <h1 className="m-auto text-white text-8xl font-semibold">
          Product List
        </h1>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products !== null &&
              Object.values(products.data).map((product) => {
                if (id === "0") {
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      option={true}
                    />
                  );
                }
                if (product.category_id == id) {
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      option={true}
                    />
                  );
                }
              })}
          </div>
          <div className="w-full flex justify-center items-center">
            {id == 0 &&
              products !== null &&
              products.links.map((link, index) => (
                <div
                  className={`rounded-full w-10 h-10 flex justify-center items-center m-2 cursor-pointer ${
                    link.active ? "bg-green-400 text-white" : "bg-gray-100"
                  }`}
                  key={index}
                >
                  <div
                    onClick={() =>
                      navigate(
                        link.url ? `/products/0${link.url}` : "/products/0"
                      )
                    }
                    className=""
                  >
                    {link.label
                      .replace("&raquo;", "")
                      .replace("&laquo;", "")
                      .replace("Previous", "<")
                      .replace("Next", ">")}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
