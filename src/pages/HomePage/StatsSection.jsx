import { FaSmile, FaBook, FaHeadset, FaUsers } from "react-icons/fa"; // Import React Icons

const StatsSection = () => {
  const stats = [
    { icon: <FaSmile className="text-4xl text-blue-500 mb-2" />, end: 500, title: "Happy Clients" },
    { icon: <FaBook className="text-4xl text-blue-500 mb-2" />, end: 200, title: "Businesses and SMEs" },
    { icon: <FaHeadset className="text-4xl text-blue-500 mb-2" />, end: 1463, title: "Hours Of Support" },
    { icon: <FaUsers className="text-4xl text-blue-500 mb-2" />, end: 15, title: "Hard Workers" },
  ];

  return (
    <section id="stats" className="stats section py-10 bg-gray-100">
      <div className="w-[90%] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-4 h-48"
            >
              <div className="bg-white shadow-lg w-[50px] h-[50px] mx-auto rounded-[50%] -mt-10 mb-8 flex justify-center items-center">
              {stat.icon}
              </div>
              <div className="stats-item flex flex-col justify-center items-center">
                <span className="text-3xl font-extrabold text-gray-800">
                  {stat.end}
                </span>
                <p className="text-gray-600 mt-2 text-base">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
