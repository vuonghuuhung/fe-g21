import { Link } from 'react-router-dom';

const Error = () => {
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

export default Error;
