import React from "react";
import { Link } from "react-router-dom";

const UsersExperience = () => {
  return (
    <section id="users-experience" className="font-roboto section py-16 bg-gray-50">
      {/* Section Title */}
      <div className="w-[90%] section-title text-center">
        <h2 className="text-4xl font-bold mb-4">Users Experience</h2>
        <p className="text-lg text-gray-600 mb-12">
          Real stories, real insights from our diverse community of Insightful Thinkers
        </p>
      </div>

      <div className="container-fluid px-4">
        {/* Filter Buttons */}
        <div className="filter-container text-center mb-8">
          <div className="filter-buttons inline-flex flex-wrap justify-center gap-3">
            <button className="filter-btn px-8 py-4 bg-[#FF7D5F] rounded-full text-white text-lg hover:bg-[#FF7D5F]  transition-all">
              All Categories
            </button>
            <button className="filter-btn px-10 py-4 bg-white shadow-lg text-gray-700 rounded-full hover:bg-[#FF7D5F] hover:text-white text-lg transition-all duration-300">
              Dining
            </button>
            <button className="filter-btn px-10 py-4 bg-white shadow-lg text-gray-700 rounded-full hover:bg-[#FF7D5F] hover:text-white text-lg transition-all duration-300">
              Healthcare
            </button>
            <button className="filter-btn px-10 py-4 bg-white shadow-lg text-gray-700 rounded-full hover:bg-[#FF7D5F] hover:text-white text-lg transition-all duration-300">
              Education
            </button>
            <button className="filter-btn px-10 py-4 bg-white shadow-lg text-gray-700 rounded-full hover:bg-[#FF7D5F] hover:text-white text-lg transition-all duration-300">
              Fashion
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Link to="/posts">
          {/* Dining Experience */}
          <div className="portfolio-item filter-dining">
            <div className="experience-card cursor-pointer relative overflow-hidden rounded-xl shadow-lg transition-transform duration-500 transform hover:scale-110">
              <div className="experience-img h-96 overflow-hidden">
                <img
                  src="https://i.postimg.cc/V6WwRdQp/Picture1.png"
                  alt="Dining Experience"
                  className="w-full h-full z-20 pl-16 object-cover flext justify-center "
                />
                <div className="experience-overlay absolute inset-0 bg-black bg-opacity-50 flex items-end pb-8 justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <div className="experience-info text-center text-white p-4">
                    <h4 className="text-xl font-bold mb-2">Culinary Journey</h4>
                    <p className="text-sm">
                      Authentic restaurant review sharing community experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Link>

          <Link to="/posts">
          {/* Healthcare Experience */}
          <div className="portfolio-item filter-dining">
            <div className="experience-card cursor-pointer relative overflow-hidden rounded-xl shadow-lg transition-transform duration-500 transform hover:scale-110">
              <div className="experience-img h-96 overflow-hidden">
                <img
                  src="https://i.postimg.cc/wMxpbg9v/Picture2.png"
                  alt="Healthcare Insights"
                  className="w-full h-full z-20 pl-16 object-cover flext justify-center "
                />
                <div className="experience-overlay absolute inset-0 bg-black bg-opacity-50 flex items-end pb-8 justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <div className="experience-info text-center text-white p-4">
                    <h4 className="text-xl font-bold mb-2">Healthcare Perspectives</h4>
                    <p className="text-sm">
                    Transparent feedback on medical services and professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Link>

          <Link to="/posts">
          {/* Education Experience */}
          <div className="portfolio-item filter-dining">
            <div className="experience-card cursor-pointer relative overflow-hidden rounded-xl shadow-lg transition-transform duration-500 transform hover:scale-110">
              <div className="experience-img h-96 overflow-hidden">
                <img
                  src="https://i.postimg.cc/fW5ZStv0/Picture3.png"
                  alt="Educational Experiences"
                  className="w-full h-full z-20 pl-16 object-cover flext justify-center "
                />
                <div className="experience-overlay absolute inset-0 bg-black bg-opacity-50 flex items-end pb-8 justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <div className="experience-info text-center text-white p-4">
                    <h4 className="text-xl font-bold mb-2">Learning Journeys</h4>
                    <p className="text-sm">
                    Student-driven insights into educational programs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Link>

          <Link to="/posts">
          {/* Fashion Experience */}
          <div className="portfolio-item filter-dining">
            <div className="experience-card relative overflow-hidden rounded-xl shadow-lg transition-transform duration-500 transform hover:scale-110">
              <div className="experience-img h-96 overflow-hidden">
                <img
                  src="https://i.postimg.cc/FzPQM8Kx/Picture4.png"
                  alt="Fashion Recommendations"
                  className="w-full h-full z-20 pl-16 object-cover flext justify-center "
                />
                <div className="experience-overlay absolute inset-0 bg-black bg-opacity-50 flex items-end pb-8 justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <div className="experience-info text-center text-white p-4">
                    <h4 className="text-xl font-bold mb-2">Style Discoveries</h4>
                    <p className="text-sm">
                    Community-driven fashion trends and recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UsersExperience;