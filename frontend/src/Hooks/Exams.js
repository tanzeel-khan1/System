import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/exams";

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const getToken = () => {
  const user = getUser();
  return user?.token || null;
};

const useExam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);

  // Create Exam
  const createExam = async (examData) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      const res = await axios.post(API_URL, examData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExams((prev) => [...prev, res.data.exam]);

      return res.data.exam;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create exam");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get All Exams
  const getAllExams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExams(res.data.exams);

      return res.data.exams;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch exams");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Single Exam
  const getExamById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      const res = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.exam;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch exam");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update Exam
  const updateExam = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      const res = await axios.put(
        `${API_URL}/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExams((prev) =>
        prev.map((exam) =>
          exam._id === id ? res.data.exam : exam
        )
      );

      return res.data.exam;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update exam");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete Exam
  const deleteExam = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExams((prev) =>
        prev.filter((exam) => exam._id !== id)
      );

      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete exam");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    exams,
    createExam,
    getAllExams,
    getExamById,
    updateExam,
    deleteExam,
  };
};

export default useExam;