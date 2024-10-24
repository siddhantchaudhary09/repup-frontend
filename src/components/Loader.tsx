import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-900 min-h-screen">
      {/* Skeleton for an image */}
      <div className="bg-gray-700 rounded-md w-full h-48 animate-pulse"></div>

      {/* Skeleton for text */}
      <div className="bg-gray-700 rounded-md w-full h-6 animate-pulse"></div>
      <div className="bg-gray-700 rounded-md w-full h-6 animate-pulse"></div>
      <div className="bg-gray-700 rounded-md w-full h-6 animate-pulse"></div>
    </div>
  );
};

export default SkeletonLoader;
