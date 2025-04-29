import { useEffect, useContext } from 'react';
import { User } from '../../context/context';
import { FaBell, FaRegBell } from 'react-icons/fa';
// import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const { 
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    fetchNotifications
  } = useContext(User);

  // Refresh notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (notificationId) => {
    if (!notifications.find(n => n._id === notificationId)?.read) {
      await markAsRead(notificationId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        {unreadCount > 0 && (
          <span className="bg-mainColor text-white px-3 py-1 rounded-full text-sm">
            {unreadCount} unread
          </span>
        )}
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
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <FaRegBell className="mx-auto text-gray-300 text-4xl mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                No notifications
              </h3>
              <p className="text-gray-500 mt-1">
                When you get notifications, they'll appear here
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <li 
                  key={notification._id} 
                  className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => handleNotificationClick(notification._id)}
                >
                  <div className="flex items-start cursor-pointer">
                    <div className="flex-shrink-0 pt-1">
                      {notification.read ? (
                        <FaBell className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaBell className="h-5 w-5 text-mainColor" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.message}
                          {!notification.read && (
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-mainColor"></span>
                          )}
                        </p>
                      </div>
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