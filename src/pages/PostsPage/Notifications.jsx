import { useEffect, useContext, useState } from 'react';
import { User } from '../../context/context';
import { FaBell, FaRegBell, FaTimes } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { notifications, unreadCount, markAsRead } = useContext(User);
  const [activeTab, setActiveTab] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  // Mark notifications as read when component mounts
  useEffect(() => {
    markAsRead();
  }, [markAsRead]);

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const clearAllNotifications = () => {
    // Implement your clear all logic here
    // This would typically involve calling an API endpoint
    // and then updating the context
  };

  const markNotificationAsRead = (id) => {
    // Implement marking single notification as read
    // Would typically call an API endpoint
  };

  const deleteNotification = (id) => {
    // Implement delete notification logic
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <div className="flex items-center space-x-4">
          {notifications.length > 0 && (
            <button 
              onClick={clearAllNotifications}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'all' ? 'text-mainColor border-b-2 border-mainColor' : 'text-gray-500'}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'unread' ? 'text-mainColor border-b-2 border-mainColor' : 'text-gray-500'}`}
          onClick={() => setActiveTab('unread')}
        >
          Unread
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'like' ? 'text-mainColor border-b-2 border-mainColor' : 'text-gray-500'}`}
          onClick={() => setActiveTab('like')}
        >
          Likes
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'comment' ? 'text-mainColor border-b-2 border-mainColor' : 'text-gray-500'}`}
          onClick={() => setActiveTab('comment')}
        >
          Comments
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <FaRegBell className="mx-auto text-gray-300 text-4xl mb-3" />
            <h3 className="text-lg font-medium text-gray-700">No notifications</h3>
            <p className="text-gray-500 mt-1">When you get notifications, they'll appear here</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <li 
                key={notification._id || notification.id} 
                className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    {notification.read ? (
                      <FaBell className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaBell className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <Link 
                        to={notification.link || '#'} 
                        className="text-sm font-medium text-gray-900 hover:underline"
                        onClick={() => markNotificationAsRead(notification._id || notification.id)}
                      >
                        {notification.title}
                      </Link>
                      <button 
                        onClick={() => deleteNotification(notification._id || notification.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FaTimes className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile Popup (optional) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute bottom-0 w-full bg-white rounded-t-lg shadow-xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">Notifications</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500">
                <FaTimes />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {/* Same notifications list as above */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;