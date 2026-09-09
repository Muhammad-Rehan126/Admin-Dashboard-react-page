import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Search, 
  Sun, 
  Moon, 
  Menu,
  ShoppingCart,
  Filter,
  MoreHorizontal,
  X,
  User,
  Shield,
  BellRing,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';

export default function CustomerProductsPage({ activePage, setActivePage }) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop collapse state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile drawer state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(true);
  const [usernameInput, setUsernameInput] = useState('Admin User');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('All');

  // Pre-loaded cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Noise-Canceling Headphones', price: 158.50, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', qty: 1 },
    { id: 2, name: 'Slim-Fit Cotton T-shirt', price: 193.90, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60', qty: 2 }
  ]);

  // Customer List Data
  const [customersData, setCustomersData] = useState([
    { name: 'Alice Johnson', email: 'alice.johnson@gmail.com', lastOrder: '1.33%', spent: '$69.00', segment: 'Customer Segment', status: 'Active' },
    { name: 'Bob Smith', email: 'bob.smith@ectrgmail.com', lastOrder: '16.4%', spent: '$1,273.00', segment: 'Customer Segment', status: 'Active' },
    { name: 'Catherine Davis', email: 'catherine.davis@gmail.com', lastOrder: '10.1%', spent: '$1,173.00', segment: 'Customer Segment', status: 'Recent' },
    { name: 'Bob Smith', email: 'testsmith@wayemail.com', lastOrder: '26.8%', spent: '$203.00', segment: 'Customer Segment', status: 'Active' },
    { name: 'Catherine Davis', email: 'alice.waleri@ext.gmail.com', lastOrder: '16.7%', spent: '$1,135.00', segment: 'Customer Segment', status: 'Active' },
    { name: 'Liepe Smith', email: 'eracimiti@sesgmail.com', lastOrder: '16.3%', spent: '$143.00', segment: 'Customer Segment', status: 'Active' },
    { name: 'Bob Smith', email: 'catherine.ckccc@gmail.com', lastOrder: '16.7%', spent: '$263.00', segment: 'Customers', status: 'Confirmed' },
    { name: 'Bob Smith', email: 'besttrium@test.gmail.com', lastOrder: '16.3%', spent: '$450.00', segment: 'Customer Segment', status: 'Completed' },
    { name: 'Alice Johnson', email: 'alice.midth@gmail.com', lastOrder: '6.35%', spent: '$252.00', segment: 'Customer Segment', status: 'Completed' },
    { name: 'Bob Smith', email: 'catherine.gbm@gmail.com', lastOrder: '5.15%', spent: '$465.00', segment: 'Customer Segment', status: 'Completed' },
  ]);

  // New Customer Form State
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustSpent, setNewCustSpent] = useState('');

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustName || !newCustEmail) return;
    const newEntry = {
      name: newCustName,
      email: newCustEmail,
      lastOrder: '0.0%',
      spent: newCustSpent ? `$${newCustSpent}` : '$0.00',
      segment: 'Customer Segment',
      status: 'Active'
    };
    setCustomersData([newEntry, ...customersData]);
    setNewCustName('');
    setNewCustEmail('');
    setNewCustSpent('');
    setShowNewCustomerModal(false);
  };

  const updateCartQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleLogout = () => {
    alert('Aap successfully logout ho chuke hain!');
  };

  const filteredCustomers = customersData.filter(cust => {
    const matchesSearch = cust.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cust.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = selectedSegment === 'All' || cust.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const totalCartAmount = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className={`flex h-screen w-screen overflow-hidden relative ${darkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* MOBILE SIDEBAR BACKDROP */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR NAVIGATION - Fully Responsive (Drawer on Mobile, Collapsible on Desktop) */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 flex flex-col 
        transition-all duration-300 ease-in-out 
        ${mobileMenuOpen ? 'translate-x-0 w-72 sm:w-64' : '-translate-x-full lg:translate-x-0'} 
        ${sidebarOpen ? 'lg:w-64' : 'lg:w-20'} 
        border-r shadow-xl lg:shadow-none ${darkMode ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'}
      `}>
        
        {/* SIDEBAR HEADER */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-inherit">
          {(sidebarOpen || mobileMenuOpen) && (
            <h1 className="text-lg sm:text-xl font-extrabold tracking-wider text-blue-600 truncate">BERRY</h1>
          )}
          <button 
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileMenuOpen(false);
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }} 
            className={`p-1.5 rounded-lg hover:bg-slate-500/10 cursor-pointer transition-colors ${!sidebarOpen ? 'mx-auto' : 'ml-auto'}`}
            title="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
          <button 
            onClick={() => { setActivePage && setActivePage('dashboard'); setMobileMenuOpen(false); }}
            title="Dashboard"
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${activePage === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-500/10 text-slate-500 dark:text-slate-400'}`}
          >
            <LayoutDashboard size={18} className="shrink-0" /> 
            {(sidebarOpen || mobileMenuOpen) && <span className="truncate">Dashboard</span>}
          </button>

          <button 
            onClick={() => { setActivePage && setActivePage('customers'); setMobileMenuOpen(false); }}
            title="Customer Products"
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${activePage === 'customers' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-500/10 text-slate-500 dark:text-slate-400'}`}
          >
            <Users size={18} className="shrink-0" /> 
            {(sidebarOpen || mobileMenuOpen) && <span className="truncate">Customer Products</span>}
          </button>

          <button 
            onClick={() => { setActivePage && setActivePage('manage'); setMobileMenuOpen(false); }}
            title="Manage Products"
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${activePage === 'manage' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-500/10 text-slate-500 dark:text-slate-400'}`}
          >
            <Package size={18} className="shrink-0" /> 
            {(sidebarOpen || mobileMenuOpen) && <span className="truncate">Manage Products</span>}
          </button>

          <button 
            onClick={() => { setActivePage && setActivePage('sales'); setMobileMenuOpen(false); }}
            title="Product Sales"
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${activePage === 'sales' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-500/10 text-slate-500 dark:text-slate-400'}`}
          >
            <TrendingUp size={18} className="shrink-0" /> 
            {(sidebarOpen || mobileMenuOpen) && <span className="truncate">Product Sales</span>}
          </button>
        </nav>

        {/* SETTINGS & LOGOUT */}
        <div className="p-3 border-t border-inherit space-y-1">
          <button 
            onClick={() => { setShowSettingsModal(true); setMobileMenuOpen(false); }}
            title="Settings"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-500/10 text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
          >
            <Settings size={18} className="shrink-0" /> 
            {(sidebarOpen || mobileMenuOpen) && <span className="truncate">Settings</span>}
          </button>
          <button 
            onClick={handleLogout}
            title="Logout"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-500/10 text-rose-500 transition-all cursor-pointer"
          >
            <LogOut size={18} className="shrink-0" /> 
            {(sidebarOpen || mobileMenuOpen) && <span className="truncate">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className={`h-16 border-b flex items-center justify-between px-3 sm:px-6 z-10 gap-2 sm:gap-4 shrink-0 ${darkMode ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-sm">
            {/* Mobile Menu Trigger button inside Header */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl lg:hidden hover:bg-slate-500/10 text-slate-500 dark:text-slate-400 cursor-pointer shrink-0"
              title="Open Menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 w-full">
              <Search size={16} className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-xs sm:text-sm w-full min-w-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={() => setShowCartDrawer(true)}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-500/10 relative transition-all cursor-pointer"
            >
              <ShoppingCart size={18} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cartItems.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-500/10 transition-all cursor-pointer"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
            </button>
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              U
            </div>
          </div>
        </header>

        {/* CUSTOMER PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 pb-20">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <h1 className="text-base sm:text-xl font-bold tracking-tight">Customers - {customersData.length + 15224} Total</h1>
            <button 
              onClick={() => setShowNewCustomerModal(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:py-2 rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer w-full sm:w-auto"
            >
              <Plus size={16} /> New Customer
            </button>
          </div>

          {/* Filter Bar */}
          <div className={`p-3 sm:p-4 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${darkMode ? 'bg-[#1e293b]/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Filter size={15} />
              <span>Filter by Segment: <strong className="text-slate-200">{selectedSegment}</strong></span>
            </div>
            <div className="w-full sm:w-48">
              <select 
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-xs outline-none cursor-pointer"
              >
                <option value="All" className="dark:bg-slate-900">All Segments</option>
                <option value="Customer Segment" className="dark:bg-slate-900">Customer Segment</option>
                <option value="Customers" className="dark:bg-slate-900">Customers</option>
              </select>
            </div>
          </div>

          {/* Customers Table Container */}
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#1e293b]/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className={`border-b text-xs uppercase tracking-wider ${darkMode ? 'border-slate-800 text-slate-400 bg-slate-900/40' : 'border-slate-200 text-slate-500 bg-slate-50/50'}`}>
                    <th className="p-4 font-semibold">Name ↕</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Last Order</th>
                    <th className="p-4 font-semibold">Total Spent</th>
                    <th className="p-4 font-semibold">Customer Segment</th>
                    <th className="p-4 font-semibold">Status ↕</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-inherit">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-10 text-slate-400">No customers found matching your search.</td>
                    </tr>
                  ) : (
                    filteredCustomers.map((cust, idx) => (
                      <tr key={idx} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/40 border-slate-800' : 'hover:bg-slate-50 border-slate-100'}`}>
                        <td className="p-4 font-medium">{cust.name}</td>
                        <td className="p-4 text-slate-400 text-xs">{cust.email}</td>
                        <td className="p-4 text-xs font-semibold">{cust.lastOrder}</td>
                        <td className="p-4 font-bold text-blue-500">{cust.spent}</td>
                        <td className="p-4 text-xs text-slate-400">{cust.segment}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 text-xs rounded-full font-bold inline-block bg-emerald-500/10 text-emerald-500">
                            {cust.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button className="p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-400 inline-flex items-center justify-center cursor-pointer">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              <span>Showing 1-{filteredCustomers.length} of {customersData.length} entries</span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-500/10 disabled:opacity-50 cursor-pointer">
                  <ChevronLeft size={14} />
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold">1</span>
                <button className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-500/10 cursor-pointer">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* SLIDE-OVER CART DRAWER */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setShowCartDrawer(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className={`w-screen max-w-md p-4 sm:p-6 border-l flex flex-col justify-between shadow-2xl ${darkMode ? 'bg-[#1e293b] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
              
              <div>
                {/* Drawer Header */}
                <div className="pb-4 border-b border-inherit flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                    <ShoppingCart size={18} className="text-blue-500" /> Shopping Cart ({cartItems.reduce((a, b) => a + b.qty, 0)})
                  </h2>
                  <button onClick={() => setShowCartDrawer(false)} className="p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-400 cursor-pointer">
                    <X size={20} />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 space-y-3">
                      <ShoppingCart size={48} className="mx-auto opacity-30" />
                      <p className="text-sm">Aapka cart khaali hai!</p>
                    </div>
                  ) : (
                    cartItems.map(item => (
                      <div key={item.id} className={`p-3 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg shrink-0 border border-slate-700" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold truncate">{item.name}</h4>
                          <p className="text-xs font-bold text-emerald-500">${item.price.toFixed(2)}</p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateCartQty(item.id, -1)} className="p-1 rounded bg-slate-500/10 hover:bg-slate-500/20 cursor-pointer">
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold px-1.5">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className="p-1 rounded bg-slate-500/10 hover:bg-slate-500/20 cursor-pointer">
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => removeCartItem(item.id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Drawer Footer & Checkout */}
              {cartItems.length > 0 && (
                <div className="pt-4 border-t border-inherit space-y-3">
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold">
                    <span>Total Amount:</span>
                    <span className="text-emerald-500">${totalCartAmount.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Aapka order successfully place ho gaya hai!');
                      setCartItems([]);
                      setShowCartDrawer(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all cursor-pointer text-sm"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* NEW CUSTOMER MODAL */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 overflow-y-auto">
          <form onSubmit={handleAddCustomer} className={`w-full max-w-md rounded-2xl border shadow-2xl p-4 sm:p-6 space-y-4 my-auto ${darkMode ? 'bg-[#1e293b] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
            <div className="flex items-center justify-between border-b pb-3 border-inherit">
              <h3 className="text-base sm:text-lg font-bold">Add New Customer</h3>
              <button type="button" onClick={() => setShowNewCustomerModal(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. john@gmail.com"
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Total Spent ($)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 500"
                  value={newCustSpent}
                  onChange={(e) => setNewCustSpent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3 border-t border-inherit">
              <button 
                type="button" 
                onClick={() => setShowNewCustomerModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-500/10 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className={`w-full max-w-md rounded-2xl border shadow-2xl p-4 sm:p-6 space-y-6 my-auto ${darkMode ? 'bg-[#1e293b] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
            <div className="flex items-center justify-between border-b pb-4 border-inherit">
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Settings size={18} className="text-blue-500" /> Dashboard Settings
              </h2>
              <button onClick={() => setShowSettingsModal(false)} className="p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-400 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Admin Username</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                  <User size={16} className="text-slate-400 shrink-0" />
                  <input 
                    type="text" 
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t border-inherit">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-500/10 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Settings successfully save ho gayi hain!');
                  setShowSettingsModal(false);
                }}
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}