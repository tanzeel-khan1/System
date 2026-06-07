import React, { useEffect, useState } from "react";
import Courses from "../Hooks/Courses";
import {
  BookOpen,
  FileText,
  ClipboardList,
  Search,
  X,
  PlayCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AllCourses = () => {
  const { courses, loading, error, fetchCourses } = Courses();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-violet-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 px-6 py-4 rounded-xl text-red-600 font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen  py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* HERO SECTION */}

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 p-10 mb-12 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Explore Courses
              </h1>

              <p className="text-purple-100 mt-4 text-lg">
                Learn professional skills with industry-standard diploma
                courses
              </p>

              <div className="grid md:grid-cols-3 gap-5 mt-8">
                <div className="bg-white/15 backdrop-blur-md p-5 rounded-2xl">
                  <p className="text-purple-100">Total Courses</p>
                  <h2 className="text-white text-3xl font-bold">
                    {courses.length}
                  </h2>
                </div>

                <div className="bg-white/15 backdrop-blur-md p-5 rounded-2xl">
                  <p className="text-purple-100">Lessons</p>
                  <h2 className="text-white text-3xl font-bold">
                    {courses.reduce(
                      (acc, c) => acc + (c.lessons?.length || 0),
                      0
                    )}
                  </h2>
                </div>

                <div className="bg-white/15 backdrop-blur-md p-5 rounded-2xl">
                  <p className="text-purple-100">Modules</p>
                  <h2 className="text-white text-3xl font-bold">
                    {courses.reduce(
                      (acc, c) => acc + (c.syllabus?.length || 0),
                      0
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SEARCH */}

          <div className="relative max-w-md mx-auto mb-10">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl shadow-md outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* COURSES */}

          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
              <BookOpen
                size={60}
                className="mx-auto text-gray-300 mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-700">
                No Course Found
              </h2>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"></div>

                    <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                      {course.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                      {course.title}
                    </h2>

                    <p className="text-gray-500 mt-3 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="bg-blue-50 rounded-xl p-3 text-center">
                        <BookOpen
                          size={18}
                          className="mx-auto text-blue-600"
                        />
                        <p className="font-bold text-blue-600">
                          {course.lessons?.length || 0}
                        </p>
                        <span className="text-xs text-gray-500">
                          Lessons
                        </span>
                      </div>

                      <div className="bg-purple-50 rounded-xl p-3 text-center">
                        <ClipboardList
                          size={18}
                          className="mx-auto text-purple-600"
                        />
                        <p className="font-bold text-purple-600">
                          {course.quizzes?.length || 0}
                        </p>
                        <span className="text-xs text-gray-500">
                          Quizzes
                        </span>
                      </div>

                      <div className="bg-green-50 rounded-xl p-3 text-center">
                        <FileText
                          size={18}
                          className="mx-auto text-green-600"
                        />
                        <p className="font-bold text-green-600">
                          {course.syllabus?.length || 0}
                        </p>
                        <span className="text-xs text-gray-500">
                          Modules
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full mt-6 py-3 cursor-pointer rounded-2xl text-white font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}

      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-[32px] overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="w-full h-80 object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30"></div>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute cursor-pointer top-5 right-5 bg-white/20 backdrop-blur-md p-3 rounded-full text-white"
                >
                  <X />
                </button>

                <div className="absolute bottom-8 left-8">
                  <h2 className="text-4xl font-bold text-white">
                    {selectedCourse.title}
                  </h2>

                  <p className="text-purple-100 mt-2">
                    {selectedCourse.category}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-600 leading-relaxed">
                  {selectedCourse.description}
                </p>

                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">
                    Course Syllabus
                  </h3>

                  <div className="grid gap-3">
                    {selectedCourse.syllabus?.map((item, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 rounded-xl p-4"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-purple-600 mb-4">
                    Lessons
                  </h3>

                  <div className="space-y-3">
                    {selectedCourse.lessons?.map((lesson, index) => (
                      <div
                        key={lesson._id}
                        className="flex items-center justify-between border rounded-2xl p-5"
                      >
                        <div>
                          <p className="text-sm text-purple-500">
                            Lesson {index + 1}
                          </p>

                          <h4 className="font-semibold">
                            {lesson.title}
                          </h4>
                        </div>

                        <a
                          href={lesson.content}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl"
                        >
                          <PlayCircle size={18} />
                          Watch
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Quizzes
                  </h3>

                  <div className="space-y-3">
                    {selectedCourse.quizzes?.map((quiz) => (
                      <div
                        key={quiz._id}
                        className="bg-green-50 rounded-xl p-4"
                      >
                        <p className="font-semibold">
                          {quiz.question}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCourse.notes && (
                  <div className="mt-10">
                    <h3 className="text-2xl font-bold text-orange-600 mb-4">
                      Notes
                    </h3>

                    <div className="bg-orange-50 rounded-xl p-5">
                      {selectedCourse.notes}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AllCourses;