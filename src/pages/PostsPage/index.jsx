import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Companies from './Companies';
import Categories from './Categories';
import PostCard from './PostCard';

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postedData, setPostedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch all posts on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/posts`);
        setPostedData(response.data.posts);
        setFilteredData(response.data.posts); // Initialize filteredData with all posts
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await axios.get(`${apiBaseUrl}/posts/search?query=${encodeURIComponent(query)}`);
        setFilteredData(response.data.posts);
      } catch (error) {
        setError(error.message);
      }
    } else {
      // If the search query is empty, show all posts
      setFilteredData(postedData);
    }
  };

  return (
    <div className='bg-[#F9F9F9]'>
      {/* Pass the search query and handleSearch function to the Header component */}
      <Header searchQuery={searchQuery} onSearch={handleSearch} />

      <Companies />
      <Categories />

      {/* Pass the filtered posts to the PostCard component */}
      <PostCard posts={filteredData} loading={loading} error={error} />
    </div>
  );
};

export default PostsPage;