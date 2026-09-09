import React, { useState } from 'react';
import DashboardPage from './components/DashboardPage';
import CustomerProducts from './components/CustomerProducts';
import ManageProduct from './components/ManageProduct';
import ProductSales from './components/ProductSales';

export default function App() {
  const [activePage, setActivePage] = useState('sales');

  return (
    <div className="w-screen h-screen overflow-hidden">
      {activePage === 'dashboard' && <DashboardPage activePage={activePage} setActivePage={setActivePage} />}
      {activePage === 'customers' && <CustomerProducts activePage={activePage} setActivePage={setActivePage} />}
      {activePage === 'manage' && <ManageProduct activePage={activePage} setActivePage={setActivePage} />}
      {activePage === 'sales' && <ProductSales activePage={activePage} setActivePage={setActivePage} />}
    </div>
  );
}