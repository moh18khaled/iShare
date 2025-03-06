import React, { useState, useEffect } from 'react';
import axios from "axios";
import { 
  FaUsers, FaChartBar, FaStore, FaComments, 
  FaStar, FaSearch, FaChartLine 
} from 'react-icons/fa';
import { 
  Pie, Bar, Line, Doughnut 
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    activeUsers: {
      daily: [],
      weekly: [],
      monthly: []
    },
    newVsReturningUsers: {
      newUsersPercentage: 0,
      returningUsersPercentage: 0
    },
    engagementRate: {
      likes: 0,
      comments: 0,
    },
    post_likes: 0,
    total_posts: 0,
    averageRating: 0,
    user_age_demographics: [],
    categories: [],
    businessProfileEngagement: {
      clicks: 0,
      views: 0,
      interactions: 0
    },
    conversionRateFromReviews: {
      percentage: 0
    },
    keywordInsights: [],
    predictiveAnalytics: {
      futureTrends: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/dashboard`); // Replace with your backend endpoint
        const result = response.data;
        console.log(result);
        if (result.success && result.data) {
          setDashboardData(result.data);
        } else {
          setError(result.message || 'Failed to fetch dashboard data');
        }
      } catch (error) {
        setError('Error connecting to the server');
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  // Chart Data
  const newVsReturningUsersData = {
    labels: ['New Users', 'Returning Users'],
    datasets: [{
      data: [
        dashboardData?.newVsReturningUsers?.newUsersPercentage || 0,
        dashboardData?.newVsReturningUsers?.returningUsersPercentage || 0
      ],
      backgroundColor: ['#DC2626', '#A0522D'],
      borderColor: ['#FFFFFF', '#FFFFFF'],
      borderWidth: 2
    }]
  };

  const activeUsersBarData = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [{
      label: 'Active Users',
      data: [
        dashboardData?.activeUsers?.daily?.length || 0,
        dashboardData?.activeUsers?.weekly?.length || 0,
        dashboardData?.activeUsers?.monthly?.length || 0
      ],
      backgroundColor: '#DC2626'
    }]
  };

  const engagementRateData = {
    labels: ['Likes', 'Comments'],
    datasets: [{
      label: 'Engagement Rate',
      data: [
        dashboardData?.engagementRate?.likes || 0,
        dashboardData?.engagementRate?.comments || 0,
      ],
      backgroundColor: ['#DC2626', '#A0522D', '#D2691E']
    }]
  };

  const demographicsData = {
    labels: dashboardData?.user_age_demographics?.map(d => d.age_range) || [],
    datasets: [{
      label: 'User Demographics',
      data: dashboardData?.user_age_demographics?.map(d => d.frequency) || [],
      backgroundColor: '#DC2626'
    }]
  };

  const categoriesData = {
    labels: dashboardData?.categories?.map(c => c.category) || [],
    datasets: [{
      label: 'Category Distribution',
      data: dashboardData?.categories?.map(c => c.count) || [],
      backgroundColor: '#DC2626'
    }]
  };

  const keywordInsightsData = {
    labels: dashboardData?.keywordInsights?.map(k => k.keyword) || [],
    datasets: [{
      label: 'Search Frequency',
      data: dashboardData?.keywordInsights?.map(k => k.searches) || [],
      backgroundColor: '#DC2626'
    }]
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-6">
      <div className="max-w-7xl mx-auto">
        {/* User Engagement Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#DC2626] mb-4">
              <FaUsers className="inline mr-2" />
              New vs Returning Users
            </h2>
            <div className="h-[300px]">
              <Pie data={newVsReturningUsersData} options={commonOptions} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#DC2626] mb-4">
              <FaChartBar className="inline mr-2" />
              Active Users
            </h2>
            <div className="h-[300px]">
              <Bar data={activeUsersBarData} options={commonOptions} />
            </div>
          </div>
        </div>

        {/* Engagement and Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#DC2626] mb-4">
              <FaComments className="inline mr-2" />
              Engagement Rate
            </h2>
            <div className="h-[300px]">
              <Doughnut data={engagementRateData} options={commonOptions} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#DC2626] mb-4">
              <FaUsers className="inline mr-2" />
              Age Demographics
            </h2>
            <div className="h-[300px]">
              <Bar data={demographicsData} options={commonOptions} />
            </div>
          </div>
        </div>

        {/* Categories and Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#DC2626] mb-4">
              <FaStore className="inline mr-2" />
              Categories Distribution
            </h2>
            <div className="h-[300px]">
              <Bar data={categoriesData} options={commonOptions} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#DC2626] mb-4">
              <FaSearch className="inline mr-2" />
              Top Keywords
            </h2>
            <div className="h-[300px]">
              <Bar data={keywordInsightsData} options={{
                ...commonOptions,
                indexAxis: 'y'
              }} />
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-[#DC2626] mb-3">
              <FaStore className="inline mr-2" />
              Profile Engagement
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Views</p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  {dashboardData?.businessProfileEngagement?.views?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Clicks</p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  {dashboardData?.businessProfileEngagement?.clicks?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Interactions</p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  {dashboardData?.businessProfileEngagement?.interactions?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-[#DC2626] mb-3">
              <FaStar className="inline mr-2" />
              Post Engagement
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  {dashboardData?.total_posts?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  {dashboardData?.post_likes?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  {dashboardData?.averageRating?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-[#DC2626] mb-3">
              <FaChartLine className="inline mr-2" />
              Conversion Rate
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">From Reviews</p>
                <p className="text-2xl font-bold text-[#DC2626]">
                  {(dashboardData?.conversionRateFromReviews?.percentage || 0).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;