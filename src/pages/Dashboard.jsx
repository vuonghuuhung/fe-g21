import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';

const Dashboard = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="flex">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="bg-tintMain w-5/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
