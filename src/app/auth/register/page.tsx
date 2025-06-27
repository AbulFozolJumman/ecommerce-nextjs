"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form);
      toast.success("Registration successful");
      signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          onChange={handleChange}
          required
          placeholder="Name"
          className="input"
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          required
          placeholder="Email"
          className="input"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          required
          placeholder="Password"
          className="input"
        />
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}
