"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      remember: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Đăng Nhập Thành Công");
        mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/auth/user`);
        setTimeout(() => {
          router.push("/");
        }, 1800);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 md:mt-6 ">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold">Đăng Nhập</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        {/* Form wrapped around inputs */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mật Khẩu</Label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              name="remember"
              checked={formData.remember}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <Link href="#" className="text-sm text-primary hover:underline">
            Quên Mật Khẩu ?
          </Link>
        </div>
        <Button className="w-full" type="submit">
          Đăng Nhập
        </Button>
      </form>
      <div className="text-sm text-center text-red-500">{message}</div>

      <div className="text-center text-sm text-muted-foreground">
        bạn chưa có tài khoản ?{" "}
        <Link
          href="/signUp"
          className="font-medium text-blue-600 hover:underline"
        >
          Đăng Ký Ngay
        </Link>
      </div>
    </div>
  );
}
