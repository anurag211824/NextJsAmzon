"use client"
import React from 'react'

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700 text-lg">
          The product you searched for does not exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Error
