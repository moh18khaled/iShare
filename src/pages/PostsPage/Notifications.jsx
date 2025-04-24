import { useEffect, useContext, useState } from 'react';
import { User } from '../../context/context';
import { FaBell, FaRegBell, FaTimes, FaCheck } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { 
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    fetchNotifications
  } = useContext(User);

  const [activeTab, setActiveTab] = useState('all');

  // Refresh notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const handleNotificationClick = async (notificationId) => {
    if (!notifications.find(n => n._id === notificationId)?.read) {
      await markAsRead(notificationId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        {notifications.length > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            disabled={unreadCount === 0}
          >
            <FaCheck className="mr-1" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {['all', 'unread', 'like', 'comment', 'follow'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm capitalize ${
              activeTab === tab 
                ? 'text-mainColor border-b-2 border-mainColor' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mainColor"></div>
        </div>
      )}

      {/* Notifications List */}
      {!isLoading && (
        <div className="bg-white rounded-lg shadow">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <FaRegBell className="mx-auto text-gray-300 text-4xl mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                No {activeTab === 'all' ? '' : activeTab} notifications
              </h3>
              <p className="text-gray-500 mt-1">
                When you get {activeTab === 'all' ? '' : activeTab} notifications, they'll appear here
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <li 
                  key={notification._id} 
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
                          onClick={() => handleNotificationClick(notification._id)}
                        >
                          {notification.title}
                        </Link>
                        <div className="flex space-x-2">
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead(notification._id)}
                              className="text-gray-400 hover:text-blue-500"
                              title="Mark as read"
                            >
                              <FaCheck className="h-4 w-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(notification._id)}
                            className="text-gray-400 hover:text-red-500"
                            title="Delete"
                          >
                            <FaTimes className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </p>
                        {notification.type && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {notification.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;