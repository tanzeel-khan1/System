import { motion } from "framer-motion";
import Navbar from "./Navbar";
import {
  GraduationCap,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Award,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  
 return (
  <section className="min-h-screen  py-16 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">

      {/* HERO SECTION */}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 p-10 md:p-14 mb-16 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
            About Our School
          </h1>

          <p className="text-purple-100 text-lg max-w-3xl mx-auto">
            Building bright futures through quality education,
            strong values, innovation and lifelong learning.
          </p>
        </div>
      </motion.div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-16">

        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <Award
            className="text-violet-600 mb-4"
            size={40}
          />

          <h3 className="text-3xl font-bold text-gray-800">
            15+
          </h3>

          <p className="text-gray-500">
            Years of Excellence
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <Users
            className="text-blue-600 mb-4"
            size={40}
          />

          <h3 className="text-3xl font-bold text-gray-800">
            1000+
          </h3>

          <p className="text-gray-500">
            Happy Students
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <GraduationCap
            className="text-green-600 mb-4"
            size={40}
          />

          <h3 className="text-3xl font-bold text-gray-800">
            50+
          </h3>

          <p className="text-gray-500">
            Expert Teachers
          </p>
        </motion.div>

      </div>

      {/* WHO WE ARE */}

      <div className="grid lg:grid-cols-2 gap-8 items-center mb-20">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-[32px] p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-5">
            Who We Are
          </h2>

          <p className="text-gray-600 leading-relaxed mb-5">
            Our school is a trusted educational institution
            dedicated to academic excellence, leadership,
            innovation and character development.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We provide a safe, supportive and inspiring
            environment where students grow academically,
            socially and personally.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl"
        >
          <ShieldCheck size={50} />

          <h3 className="text-3xl font-bold mt-5 mb-5">
            Our Commitment
          </h3>

          <ul className="space-y-4 text-purple-100">
            <li>✓ Quality education for every student</li>
            <li>✓ Strong moral and ethical values</li>
            <li>✓ Safe and friendly learning environment</li>
            <li>✓ Personal and academic growth</li>
            <li>✓ Modern teaching methodologies</li>
          </ul>
        </motion.div>

      </div>

      {/* VISION MISSION VALUES */}

      <div className="grid md:grid-cols-3 gap-8">

        <motion.div
          whileHover={{
            y: -8,
            transition: { duration: 0.2 },
          }}
          className="bg-white rounded-[32px] p-8 shadow-lg"
        >
          <Eye
            size={40}
            className="text-violet-600 mb-5"
          />

          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Our Vision
          </h3>

          <p className="text-gray-600">
            To empower students with knowledge,
            confidence and values for a successful
            future.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            y: -8,
            transition: { duration: 0.2 },
          }}
          className="bg-white rounded-[32px] p-8 shadow-lg"
        >
          <Target
            size={40}
            className="text-blue-600 mb-5"
          />

          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Our Mission
          </h3>

          <p className="text-gray-600">
            To provide high-quality education
            through innovation and a student-centered
            learning approach.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            y: -8,
            transition: { duration: 0.2 },
          }}
          className="bg-white rounded-[32px] p-8 shadow-lg"
        >
          <ShieldCheck
            size={40}
            className="text-green-600 mb-5"
          />

          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Our Values
          </h3>

          <p className="text-gray-600">
            Respect, discipline, honesty,
            teamwork and lifelong learning.
          </p>
        </motion.div>

      </div>
    </div>
  </section>
);
};

export default About;
