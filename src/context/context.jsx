import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postedData, setPostedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async()=>{
        try {
         const response =  await axios.get("https://dummyjson.com/products");
          console.log(response.data.products);
          setPostedData(response.data.products);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }

    fetchData();
  }, []);

  return (
    <PostContext.Provider value={{ postedData, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};