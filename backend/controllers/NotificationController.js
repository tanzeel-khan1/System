import Notification from "../models/Notification.js";

export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const user = req.user;

    let query = {};

    // role-based filtering
    if (user.role === "student") {
      query.$or = [
        { roleTarget: "all" },
        { roleTarget: "student" },
      ];
    }

    if (user.role === "teacher") {
      query.$or = [
        { roleTarget: "all" },
        { roleTarget: "teacher" },
      ];
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false,
      message: error.message,
    });
  }
};