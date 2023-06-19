import { Link } from 'react-router-dom';

const UnAuth = () => {
  return (
    <section className="flex">
      <div className="w-1/2 ml-20">
        <img
          src="https://flowbite.com/application-ui/demo/images/illustrations/500.svg"
          alt=""
        />
      </div>
      <div className="w-1/2 text-center mt-20">
        <h2 className="text-[250px] font-extrabold bg-clip-text bg-gradient-to-r from-red-600 to-pink-200 text-transparent">
          403
        </h2>
        <p className="text-5xl mb-3">Access not granted</p>
        <Link to="/">Back to homepage</Link>
      </div>
    </section>
  );
};

export default UnAuth;
