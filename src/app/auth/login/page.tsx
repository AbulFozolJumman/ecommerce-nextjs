"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Logged in");
      router.push("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Login
        </button>
      </form>
    </div>
  );
}
