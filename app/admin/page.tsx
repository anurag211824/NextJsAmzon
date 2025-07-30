import React from 'react'
import Link from 'next/link'

const AdminHomePage = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your e-commerce store efficiently</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl font-bold mt-2">124</p>
          <p className="text-sm opacity-75">+12 this month</p>
        </div>
        
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold mt-2">1,456</p>
          <p className="text-sm opacity-75">+45 this week</p>
        </div>
        
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">789</p>
          <p className="text-sm opacity-75">+23 today</p>
        </div>
        
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-3xl font-bold mt-2">$45,234</p>
          <p className="text-sm opacity-75">+$1,200 today</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/addproduct" className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 transition">
            <div className="text-2xl mb-2">📦</div>
            <div className="font-semibold">Add New Product</div>
          </Link>
          
          <Link href="/admin/products" className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition">
            <div className="text-2xl mb-2">📋</div>
            <div className="font-semibold">View All Products</div>
          </Link>
          
          <Link href="/admin/userlist" className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600 transition">
            <div className="text-2xl mb-2">👥</div>
            <div className="font-semibold">Manage Users</div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-semibold">Order #1234</p>
                <p className="text-sm text-gray-600">John Doe - iPhone 15</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Completed</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-semibold">Order #1235</p>
                <p className="text-sm text-gray-600">Jane Smith - MacBook Pro</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pending</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-semibold">Order #1236</p>
                <p className="text-sm text-gray-600">Bob Johnson - AirPods</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Processing</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Low Stock Products</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded">
              <div>
                <p className="font-semibold">iPhone 15 Pro</p>
                <p className="text-sm text-gray-600">Only 3 left</p>
              </div>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Low Stock</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
              <div>
                <p className="font-semibold">Samsung Galaxy S24</p>
                <p className="text-sm text-gray-600">Only 7 left</p>
              </div>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Low Stock</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
              <div>
                <p className="font-semibold">MacBook Air</p>
                <p className="text-sm text-gray-600">Only 5 left</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Low Stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Database: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Payment Gateway: Active</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Email Service: Running</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage