import { Navigate } from 'react-router-dom';
import { logout } from '../../services/apis/auth';

export default function Header() {
  const handleLogout = () => {
    logout();
    Navigate('/');
  };
  return (
    <div className="w-full h-20 bg-green-50 flex justify-between">
      <div>Header</div>
      <div className="text-[#565656]">
        <div className="basis-1/2 p-2">
          <p
            className="border-b-2 inline-block border-dashed pt-4 text-base font-semibold hover:cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </p>
        </div>
      </div>
    </div>
  );
}
