import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/notifications";

// get user + token
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const getToken = () => {
  const user = getUser();
  return user?.token || null;
};

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📥 Get all notifications
  const getNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data.notifications || []);
      return res.data.notifications;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch notifications"
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // ➕ Create notification (ADMIN ONLY)
  const createNotification = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      const res = await axios.post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications((prev) => [res.data.notification, ...prev]);

      return res.data.notification;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create notification"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete notification (ADMIN ONLY)
  const deleteNotification = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );

      return true;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete notification"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    notifications,
    loading,
    error,
    getNotifications,
    createNotification,
    deleteNotification,
  };
};

export default useNotification;