import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { User } from '../../context/context';

const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(User);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        // replace with the actual endpooint
        const response = await axios.get(`${apiBaseUrl}/api/wallet`, {withCredentials:true}); 
        
        setWalletData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch wallet data');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [user.token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded max-w-md mx-auto mt-6">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Wallet Information</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Wallet Type:</span>
          <span className="text-gray-800 capitalize">
            {walletData?.type || 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Wallet Number:</span>
          <span className="text-gray-800 font-mono">
            {walletData?.number || 'N/A'}
          </span>
        </div>
        
        {walletData?.balance !== undefined && (
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Balance:</span>
            <span className="text-gray-800">
              {typeof walletData.balance === 'number' 
                ? `$${walletData.balance.toFixed(2)}` 
                : walletData.balance}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;