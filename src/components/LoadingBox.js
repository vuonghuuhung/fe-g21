import { Spinner } from '@material-tailwind/react';

export default function LoadingBox() {
  return (
    <div
      animation="border"
      role="status"
      className="ml-10 w-full h-96 justify-center items-center flex"
    >
      <Spinner />
      <span className="ml-3 text-xl font-bold visually-hidden">Loading...</span>
    </div>
  );
}
