import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Companies from './Companies';
import Categories from './Categories';
import PostCard from './PostCard';

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle combined search and filtering
  useEffect(() => {
    const filterPosts = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams();
        
        if (searchQuery) {
          params.append('query', searchQuery);
        }
        
        if (selectedCategory && selectedCategory !== 'all') {
          params.append('categoryNames', selectedCategory);
        }

        // Only make API call if we have filters
        if (searchQuery || (selectedCategory && selectedCategory !== 'all')) {
          const response = await axios.get(`${apiBaseUrl}/postss/search?${params.toString()}`);
          console.log(response);
          setFilteredData(response.data.posts);
        } else {
          // No filters - show all posts
          setFilteredData(postedData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent too many API calls
    const debounceTimer = setTimeout(() => {
      filterPosts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory, postedData]);

  return (
    <div className='bg-[#F9F9F9]'>
      <Header 
        searchQuery={searchQuery} 
        onSearch={(query) => setSearchQuery(query)} 
      />
      
      <Companies />
      
      <Categories 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      <PostCard 
        posts={filteredData} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default PostsPage;