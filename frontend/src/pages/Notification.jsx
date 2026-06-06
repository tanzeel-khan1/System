import React, { useEffect, useState } from "react";
import { Bell, CalendarDays, Pin } from "lucide-react";
import useStudentNotification from "../Hooks/useNotification";

const StudentDashboard = () => {
  const { notifications, loading, error, getNotifications } =
    useStudentNotification();

  // 🔥 Example: yahan user pinned IDs store hongi
  const [pinnedIds, setPinnedIds] = useState([]);

  useEffect(() => {
    getNotifications();

    // example localStorage (optional)
    const savedPins =
      JSON.parse(localStorage.getItem("pinnedNotifications")) || [];
    setPinnedIds(savedPins);
  }, [getNotifications]);

  // 🔥 PIN TOGGLE (frontend only demo)
  const togglePin = (id) => {
    let updated;

    if (pinnedIds.includes(id)) {
      updated = pinnedIds.filter((pid) => pid !== id);
    } else {
      updated = [...pinnedIds, id];
    }

    setPinnedIds(updated);
    localStorage.setItem("pinnedNotifications", JSON.stringify(updated));
  };

  // 🔥 PIN + LATEST SORTING
  const sortedNotifications = [...notifications].sort((a, b) => {
    const aPinned = pinnedIds.includes(a._id);
    const bPinned = pinnedIds.includes(b._id);

    if (aPinned === bPinned) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    return bPinned - aPinned;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">
            Loading notifications...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen  p-4 md:p-8">

  {/* HEADER */}
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 p-8 shadow-2xl mb-8">

    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
          <Bell size={32} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            Notifications
          </h1>
          <p className="text-purple-100">
            Stay updated with latest announcements
          </p>
        </div>
      </div>

      <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl">
        <p className="text-sm text-purple-100">
          Total Notifications
        </p>
        <h2 className="text-3xl font-bold text-white">
          {notifications.length}
        </h2>
      </div>
    </div>
  </div>

  {/* NOTIFICATION LIST */}
  <div className="space-y-5">

    {sortedNotifications.map((n) => {
      const isPinned = pinnedIds.includes(n._id);

      return (
        <div
          key={n._id}
          className={`group relative overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1
          ${isPinned
            ? "border-yellow-300"
            : "border-gray-100"
          }`}
        >

          {/* LEFT ACCENT */}
          <div
            className={`absolute left-0 top-0 h-full w-2
            ${isPinned
              ? "bg-gradient-to-b from-yellow-400 to-orange-500"
              : "bg-gradient-to-b from-violet-500 to-indigo-600"
            }`}
          />

          {/* PIN BUTTON */}
          <button
            onClick={() => togglePin(n._id)}
            className={`absolute top-5 right-5 p-2 rounded-xl transition-all
            ${
              isPinned
                ? "bg-yellow-400 text-white shadow-lg"
                : "bg-gray-100 hover:bg-violet-100 text-gray-500"
            }`}
          >
            <Pin size={16} />
          </button>

          <div className="p-6 pl-8">

            <div className="flex gap-4">

              {/* ICON */}
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center
                ${
                  isPinned
                    ? "bg-yellow-100"
                    : "bg-violet-100"
                }`}
              >
                <Bell
                  className={
                    isPinned
                      ? "text-yellow-600"
                      : "text-violet-600"
                  }
                  size={24}
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-bold text-xl text-gray-800">
                    {n.title}
                  </h2>

                  {isPinned && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                      📌 Pinned
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mt-3 leading-relaxed">
                  {n.message}
                </p>

                <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
                  <CalendarDays size={16} />
                  <span>
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      );
    })}

  </div>
</div>
  );
};

export default StudentDashboard;