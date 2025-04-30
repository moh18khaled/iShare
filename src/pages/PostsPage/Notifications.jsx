import { useEffect, useContext, useState } from 'react';
import { User } from '../../context/context';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { getNotifications, markAsRead } from './NotificationsApi';
import axios from 'axios';
import Header from './Header';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMarkingRead, setIsMarkingRead] = useState(false);
  const [clickedNotificationId, setClickedNotificationId] = useState(null);

  const { unreadCount, isLoading } = useContext(User);

  // Fetch notifications on component mount
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLocalLoading(true);
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err.message || 'Failed to load notifications');
      } finally {
        setLocalLoading(false);
      }
    };

    loadNotifications();
  }, []);

  useEffect(() => {
    const markNotificationAsRead = async () => {
      if (!clickedNotificationId) return;
  
      const notification = notifications.find(n => n._id === clickedNotificationId);
      if (!notification || notification.isRead) {
        setClickedNotificationId(null);
        return;
      }
  
      try {
        setIsMarkingRead(true);
        
        // Optimistic UI update
        setNotifications(prev => 
          prev.map(n => 
            n._id === clickedNotificationId ? { ...n, isRead: true } : n
          )
        );
        
        await markAsRead(clickedNotificationId);
        
      } catch (err) {
        // Revert optimistic update on error
        setNotifications(prev => 
          prev.map(n => 
            n._id === clickedNotificationId ? { ...n, isRead: false } : n
          )
        );
        setError('Failed to mark notification as read');
      } finally {
        setIsMarkingRead(false);
        setClickedNotificationId(null); // Reset after handling
      }
    };
  
    markNotificationAsRead();
  }, [clickedNotificationId, notifications, markAsRead]);
  
  // Updated click handler
  const handleNotificationClick = (notificationId) => {
    setClickedNotificationId(notificationId);
  };

  // Combined loading state
  const isProcessing = isLoading || localLoading;

  return (
    <div>
      <Header />
    <div className="max-w-4xl mx-auto p-4 pt-24">
      <div className="flex items-center justify-between mb-6">
        {unreadCount > 0 && (
          <span className="bg-mainColor text-white px-3 py-1 rounded-full text-sm">
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="float-right font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {/* Loading State */}
      {isProcessing && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mainColor"></div>
        </div>
      )}

      {/* Notifications List */}
      {!isProcessing && (
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
                  className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-red-50' : ''
                  } ${
                    isMarkingRead ? 'opacity-75 cursor-wait' : 'cursor-pointer'
                  }`}
                  onClick={() => !isMarkingRead && handleNotificationClick(notification._id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      {notification.isRead ? (
                        <FaBell className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaBell className="h-5 w-5 text-mainColor" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.message}
                          {!notification.isRead && (
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-mainColor"></span>
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                        
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
    </div>
  );
};

export default Notifications;