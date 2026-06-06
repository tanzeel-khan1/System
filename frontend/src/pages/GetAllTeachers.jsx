import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useTeacher from "../Hooks/TeacherHook";
import TeacherLoader from "../components/TeacherLoader";

const getInitials = (name = "") => {
  const words = name.trim().split(" ");
  return words.length > 1 ? `${words[0][0]}${words[1][0]}` : words[0]?.[0];
};


const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const GetAllTeachers = () => {
  const { loading, error, teachers, getAllTeachers } = useTeacher();

  useEffect(() => {
    getAllTeachers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-purple-600 font-medium">
        <TeacherLoader />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-purple-700 text-center mb-10"
      >
        Teacher's
      </motion.h2>

      {teachers.length === 0 ? (
        <p className="text-center text-gray-500">No teachers found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <motion.div
  key={teacher._id}
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  custom={index}
  whileHover={{
    y: -8,
    transition: { duration: 0.2 },
  }}
  className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
>
  {/* TOP GRADIENT */}
  <div className="h-24 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600" />

  <div className="px-6 pb-6 relative">

    {/* AVATAR */}

    <div className="-mt-10 mb-4">
      <div className="h-20 w-20 rounded-3xl bg-white shadow-lg flex items-center justify-center border-4 border-white">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl">
          {getInitials(teacher.name)}
        </div>
      </div>
    </div>

    <h3 className="text-xl font-bold text-gray-800">
      {teacher.name}
    </h3>

    <p className="text-violet-600 font-medium">
      {teacher.employmentType}
    </p>

    {/* SUBJECT TAGS */}

    <div className="flex flex-wrap gap-2 mt-4">
      {teacher.subjects?.map((subject, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium"
        >
          {subject}
        </span>
      ))}
    </div>

    {/* DETAILS */}

    <div className="mt-5 space-y-3 text-sm">

      <div className="flex justify-between">
        <span className="text-gray-500">
          Qualification
        </span>

        <span className="font-medium">
          {teacher.qualification}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">
          Experience
        </span>

        <span className="font-medium">
          {teacher.experience} Years
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">
          Class Teacher
        </span>

        <span
          className={`font-medium ${
            teacher.isClassTeacher
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {teacher.isClassTeacher ? "Yes" : "No"}
        </span>
      </div>

    </div>

    {/* FOOTER */}

    <div className="mt-5 pt-5 border-t flex justify-between items-center">

      <div>
        <p className="text-xs text-gray-400">
          Salary
        </p>

        <h4 className="font-bold text-green-600">
          PKR {teacher.salary}
        </h4>
      </div>

      <div className="bg-indigo-50 px-3 py-2 rounded-xl">
        <p className="text-xs text-gray-400">
          Classes
        </p>

        <p className="font-semibold text-indigo-600">
          {teacher.classesAssigned?.length || 0}
        </p>
      </div>

    </div>

  </div>
</motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllTeachers;
