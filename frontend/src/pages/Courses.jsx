import React, { useEffect } from "react";
import useCourse from "../Hooks/Courses";
import useEnrollment from "../Hooks/enrollment";
import { toast } from "sonner";
import TeacherLoader from "../components/TeacherLoader";

const Courses = () => {
  
  const { courses, loading, error, fetchCourses } = useCourse();
  const {
    applyForCourse,
    enrollments,
    fetchMyEnrollments,
    loading: enrollLoading,
  } = useEnrollment();

  useEffect(() => {

    fetchCourses();
    fetchMyEnrollments();
  }, []);

  const handleApply = async (courseId) => {
    
    const res = await applyForCourse(courseId);

    if (res?.success) {
      toast.success("Application submitted. Waiting for admin approval ");
      fetchMyEnrollments();
    } else {
      toast.error("Failed to apply for course ❌");
    }
  };

  const isApplied = (courseId) => {
    if (!Array.isArray(enrollments)) return null;

    return enrollments.find((enrollment) => enrollment.course._id === courseId);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100 p-4 md:p-8">
    <div className="max-w-7xl mx-auto">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 p-8 md:p-10 mb-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            All Courses
          </h1>

          <p className="text-purple-100 mt-3 text-lg">
            Professional courses available for school students
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl">
            <span className="text-white text-sm">
              Total Courses
            </span>

            <span className="font-bold text-white text-xl">
              {courses.length}
            </span>
          </div>
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <TeacherLoader />
          <span className="mt-4 text-gray-600 font-medium">
            Loading Courses...
          </span>
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl text-center mb-6">
          {error}
        </div>
      )}

      {/* EMPTY */}

      {!loading && courses.length === 0 && (
        <div className="bg-white rounded-[32px] p-12 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700">
            No Courses Found
          </h3>

          <p className="text-gray-500 mt-2">
            Courses will appear here once available.
          </p>
        </div>
      )}

      {/* COURSES */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => {
          const applied = isApplied(course._id);

          return (
            <div
              key={course._id}
              className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* TOP GRADIENT */}
              <div className="h-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600" />

              <div className="p-6">

                {/* STATUS BADGE */}

                <div className="flex justify-between items-center mb-4">
                  <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Course
                  </span>

                  {applied && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Applied
                    </span>
                  )}
                </div>

                {/* TITLE */}

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-violet-600 transition">
                  {course.title}
                </h3>

                {/* DESCRIPTION */}

                <p className="text-gray-500 leading-relaxed line-clamp-4">
                  {course.description}
                </p>

                {/* FOOTER */}

                

              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};

export default Courses;
