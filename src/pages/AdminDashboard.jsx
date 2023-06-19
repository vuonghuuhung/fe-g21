import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const Dashboard = ({ setIsLogin, setIsAdmin }) => {
  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-1/6">
          <Sidebar setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />
        </div>
        <div className="bg-tintMain w-5/6 mt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
