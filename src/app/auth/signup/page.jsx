"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useMotionValue, useTransform } from "framer-motion";
import { useSpring } from "framer-motion";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

import {
  Person,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  StarFill,
} from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [3, -3]), {
    stiffness: 180,
    damping: 18,
  });

  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-3, 3]), {
    stiffness: 180,
    damping: 18,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('reader')
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Must be at least 6 characters";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      toast.warning("Please fill all fields correctly");

      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        role,
      });
      console.log("SIGNUP RESULT:", result);

      toast.success("🎉 Account created successfully!");
      router.push("/");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <main className=" flex-1 flex items-center justify-center py-10 sm:py-16">
        {/* ── Right: Sign-up card ── */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.01,
          }}
          className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl border border-amber-100 px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(251,191,36,0.18)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Free forever. No credit card needed.
              </p>
            </div>
            <div className="flex flex-col items-end bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              <div className="flex items-center gap-1">
                <StarFill className="text-amber-400 w-3 h-3" />
                <span className="text-xs font-bold text-gray-700">
                  Top Rated
                </span>
              </div>
              <span className="text-[10px] text-gray-400">4.9 / 5 stars</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Person className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition
                      ${
                        errors.name
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-gray-200 bg-gray-50 focus:border-amber-400 focus:bg-white"
                      }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Envelope className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition
                      ${
                        errors.email
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-gray-200 bg-gray-50 focus:border-amber-400 focus:bg-white"
                      }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label>Subscription plan</Label>
              <RadioGroup
              onChange={value => setRole(value)}
                defaultValue="reader"
                name="role"
                orientation="horizontal"
              >
                <Radio value="reader">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    Reader
                  </Radio.Content>
                </Radio>
                <Radio value="writer">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    Writer
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none transition
                      ${
                        errors.password
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-gray-200 bg-gray-50 focus:border-amber-400 focus:bg-white"
                      }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <EyeSlash className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none transition
                      ${
                        errors.confirmPassword
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-gray-200 bg-gray-50 focus:border-amber-400 focus:bg-white"
                      }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? (
                    <EyeSlash className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md shadow-amber-200"
              >
                {isLoading ? "Creating account..." : "Create Account →"}
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            {/* <LogoGoogle className="w-4 h-4" /> */}
            Continue with Google
          </button>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-amber-500 font-semibold hover:text-amber-600 transition"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
