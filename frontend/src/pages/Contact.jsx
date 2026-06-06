import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useContact from "../Hooks/Contact";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
const Contact = () => {
  const { sendContactMessage, getContactsByUserId, loading } = useContact();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    getContactsByUserId();
  }, []);

  const onSubmit = async (data) => {
    try {
      await sendContactMessage(data);
      toast.success("Message sent successfully ");
      reset();

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      toast.error("Something went wrong ❌");
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100 flex items-center justify-center p-4 md:p-8">
    <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] bg-white shadow-2xl">

      {/* LEFT SIDE */}

      <div className="relative bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-700 p-8 md:p-12 text-white overflow-hidden">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">

          <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm mb-6">
            Contact Information
          </span>

          <h2 className="text-4xl font-bold mb-4">
            Get in Touch
          </h2>

          <p className="text-purple-100 leading-relaxed mb-10">
            We'd love to hear from you. Send us a message and our
            team will respond as soon as possible.
          </p>

          <div className="space-y-5">

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <MapPin size={22} />
              </div>

              <div>
                <p className="text-sm text-purple-200">
                  Location
                </p>

                <h4 className="font-semibold">
                  Karachi, Pakistan
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Mail size={22} />
              </div>

              <div>
                <p className="text-sm text-purple-200">
                  Email
                </p>

                <h4 className="font-semibold">
                  support@example.com
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Phone size={22} />
              </div>

              <div>
                <p className="text-sm text-purple-200">
                  Phone
                </p>

                <h4 className="font-semibold">
                  +92 300 1234567
                </h4>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="p-8 md:p-12 bg-white">

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Contact Us
          </h2>

          <p className="text-gray-500 mt-2">
            Fill out the form below and we'll get back to you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* NAME */}

          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition-all focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* EMAIL */}

          <div>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition-all focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* MESSAGE */}

          <div>
            <textarea
              rows="5"
              placeholder="Write your message..."
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message:
                    "Message must be at least 10 characters",
                },
              })}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none resize-none transition-all focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />

            {errors.message && (
              <p className="text-red-500 text-sm mt-2">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-violet-300 disabled:opacity-50"
          >
            <Send size={18} />

            {loading || isSubmitting
              ? "Sending..."
              : "Send Message"}
          </button>

        </form>
      </div>
    </div>
  </div>
);
};

export default Contact;
