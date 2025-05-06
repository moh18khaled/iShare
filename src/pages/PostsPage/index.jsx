import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Companies from './Companies';
import Categories from './Categories';
import PostCard from './PostCard';
import { FiX } from 'react-icons/fi';

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [postedData, setPostedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch all posts on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/postss`);
        setPostedData(response.data.posts);
        setFilteredData(response.data.posts);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle brand selection - uses separate endpoint
  const handleBrandSelect = async (brand) => {
    try {
      setLoading(true);
      setSelectedBrand(brand);
      setSelectedCategory('all');
      setSearchQuery('');
      
      const response = await axios.get(`${apiBaseUrl}/posts/brands?brand=${encodeURIComponent(brand)}`);
      setFilteredData(response.data.posts);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to filter by brand.");
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search and category filtering (original endpoint)
  useEffect(() => {
    const filterPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (searchQuery) {
          params.append('query', searchQuery);
        }

        if (selectedCategory && selectedCategory !== 'all') {
          params.append('categoryNames', selectedCategory);
        }

        // Only make API call if we have search or category filters
        if (searchQuery || (selectedCategory && selectedCategory !== 'all')) {
          const response = await axios.get(`${apiBaseUrl}/postss/search?${params.toString()}`);
          setFilteredData(response.data.posts);
        } else if (!selectedBrand) {
          // No filters - show all posts
          setFilteredData(postedData);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || "An error occurred while searching.";
        setError(errorMessage);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      // Only run if we're not filtering by brand
      if (!selectedBrand) {
        filterPosts();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory, postedData, selectedBrand]);

  const clearBrandFilter = () => {
    setSelectedBrand(null);
    setFilteredData(postedData); // Reset to all posts
  };

  return (
    <div className='bg-[#F9F9F9]'>
      <Header 
        searchQuery={searchQuery} 
        onSearch={setSearchQuery}
        onBrandSelect={handleBrandSelect}
      />
      
      <Companies />
      
      <Categories 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      {selectedBrand && (
        <div className="text-center mt-4">
          <span className="bg-gray-200 px-4 py-2 rounded-full inline-flex items-center">
            Showing posts for: {selectedBrand}
            <button 
              onClick={clearBrandFilter} 
              className="ml-2 text-gray-600 hover:text-gray-800"
            >
              <FiX />
            </button>
          </span>
        </div>
      )}
      
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-gray-600">No posts found based on your search criteria.</p>
      ) : (
        <PostCard posts={filteredData} />
      )}
    </div>
  );
};

export default PostsPage;