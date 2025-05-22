// import { useState } from 'react';
// import Categories from './Categories';
// import Transactions from './Transactions';
// import Analytics from './Analytics';

// export default function Dashboard({ user, logout }) {
//   const [activeTab, setActiveTab] = useState('transactions');
//   const [categories, setCategories] = useState([]);

//   const handleCategoriesLoad = (loadedCategories) => {
//     setCategories(loadedCategories);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Digital Daily Expense Tracker
//           </h1>
//           <button
//             onClick={logout}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Tab Navigation */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex border-b border-gray-200 mb-6">
//           <button
//             onClick={() => setActiveTab('transactions')}
//             className={`py-2 px-4 font-medium ${
//               activeTab === 'transactions'
//                 ? 'text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Transactions
//           </button>
//           <button
//             onClick={() => setActiveTab('categories')}
//             className={`py-2 px-4 font-medium ${
//               activeTab === 'categories'
//                 ? 'text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Categories
//           </button>
//           <button
//             onClick={() => setActiveTab('analytics')}
//             className={`py-2 px-4 font-medium ${
//               activeTab === 'analytics'
//                 ? 'text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Analytics
//           </button>
//         </div>

//         {/* Content */}
//         <div className="mb-6">
//           {activeTab === 'transactions' && (
//             <Transactions categories={categories} user={user} />
//           )}
//           {activeTab === 'categories' && (
//             <Categories onCategoriesLoad={handleCategoriesLoad} user={user} />
//           )}
//           {activeTab === 'analytics' && <Analytics user={user} />}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import Categories from './Categories';
import Transactions from './Transactions';
import Analytics from './Analytics';

export default function Dashboard({ user, logout }) {
  const [activeTab, setActiveTab] = useState('transactions');
  const [categories, setCategories] = useState([]);

  const handleCategoriesLoad = (loadedCategories) => {
    setCategories(loadedCategories);
  };

  const tabs = [
    { id: 'transactions', name: 'Transactions', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
    { id: 'categories', name: 'Categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    { id: 'analytics', name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
                <p className="text-sm text-gray-600">Manage your daily expenses</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-gray-700 font-medium">{user.email}</span>
              </div>
              
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-shrink-0 py-4 px-6 font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span>{tab.name}</span>
                </div>
                
                {/* Active tab indicator */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform transition-all duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Content with smooth transitions */}
        <div className="transition-all duration-500 ease-in-out">
          {activeTab === 'transactions' && (
            <div className="animate-fade-in">
              <Transactions categories={categories} user={user} />
            </div>
          )}
          {activeTab === 'categories' && (
            <div className="animate-fade-in">
              <Categories onCategoriesLoad={handleCategoriesLoad} user={user} />
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="animate-fade-in">
              <Analytics user={user} />
            </div>
          )}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}