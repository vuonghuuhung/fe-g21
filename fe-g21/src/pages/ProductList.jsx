export default function ProductList({ products = null, categoryName="Best Sellers"}) {
  const categorizedProducts = products !== null ? products : null;
  console.log(products, categoryName);

  return (
    <>
      <div className="flex h-96 w-full bg-[url('https://cdn.shopify.com/s/files/1/0001/5211/collections/BestSellers-Category-Banner_2400x.jpg?v=1607034510')]">
        <h1 className="m-auto text-white text-8xl font-semibold">
          {categoryName}
        </h1>
      </div>
      <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {categorizedProducts !== null ? categorizedProducts.map((product) => {
              <a href="#" class="group">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    class="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">$48</p>
              </a>;
            }) : null}
          </div>
        </div>
      </div>
    </>
  );
}
