import { Link, useParams } from "react-router-dom";

const NotFoundError = () => {
  return (
    <section className="flex">
      <div className="w-1/2 ml-20">
        <img
          src="https://flowbite.com/application-ui/demo/images/illustrations/404.svg"
          alt=""
        />
      </div>
      <div className="w-1/2 text-center">
        <h2 className="text-[250px] font-extrabold bg-clip-text bg-gradient-to-r from-red-600 to-pink-200 text-transparent">
          404
        </h2>
        <p className="text-5xl mb-3">Page not found</p>
        <Link to="/">Back to homepage</Link>
        <img
          className="w-72"
          src="https://flowbite.com/application-ui/demo/images/illustrations/500.svg"
          alt=""
        />
      </div>
    </section>
  );
};

const InternalServerError = () => {
  return (
    <section className="flex">
      <div className="w-1/2 ml-20">
        <img
          src="https://flowbite.com/application-ui/demo/images/illustrations/404.svg"
          alt=""
        />
      </div>
      <div className="w-1/2 text-center">
        <h2 className="text-[250px] font-extrabold bg-clip-text bg-gradient-to-r from-red-600 to-pink-200 text-transparent">
          500
        </h2>
        <p className="text-5xl mb-3">Internal Server Error</p>
        <Link to="/">There is something wrong from us, we will comeback soon!</Link>
        <img
          className="w-72"
          src="https://flowbite.com/application-ui/demo/images/illustrations/500.svg"
          alt=""
        />
      </div>
    </section>
  );
};
const ErrorPage = () => {
  const {error} = useParams();
  if (error === "500") return <InternalServerError />; 
  return <NotFoundError />;
}

export default ErrorPage;
