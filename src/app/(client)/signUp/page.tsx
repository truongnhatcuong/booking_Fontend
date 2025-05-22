/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    country: "",
    idNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/api/auth/signUp`,
        formData
      );
      if (res.data) {
        mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/auth/customer`);
        toast.success("Đăng Kí Thành Công");
        setTimeout(() => {
          router.push("/signIn");
          router.refresh();
        }, 1800);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Left side decorative image */}
          <div
            className="md:w-1/2 bg-cover bg-center h-64 md:h-auto relative"
            style={{
              backgroundImage: `url("https://katahome.com/wp-content/uploads/2021/10/Thiet-ke-khach-san-5-sao-tan-co-dien-phap-dep-kata-81065-05.jpg")`,
              backgroundSize: "cover", // phủ kín không méo ảnh
              backgroundPosition: "center", // canh giữa
              backgroundRepeat: "no-repeat", // không lặp lại ảnh
            }}
          ></div>

          {/* Right side form */}
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-serif text-gray-800 mb-6 text-center md:text-left">
              Đăng Ký Tài Khoản
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="animate-slide-in-left">
                  <Label
                    htmlFor="firstName"
                    className="text-gray-700 font-medium block mb-1"
                  >
                    Họ
                  </Label>
                  <Input
                    name="firstName"
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Nhập họ của bạn"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="animate-slide-in-right">
                  <Label
                    htmlFor="lastName"
                    className="text-gray-700 font-medium block mb-1"
                  >
                    Tên
                  </Label>
                  <Input
                    name="lastName"
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Nhập tên của bạn"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="animate-fade-in">
                <Label
                  htmlFor="email"
                  className="text-gray-700 font-medium block mb-1"
                >
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="email@example.com"
                  onChange={handleChange}
                />
              </div>

              <div className="animate-fade-in">
                <Label
                  htmlFor="phone"
                  className="text-gray-700 font-medium block mb-1"
                >
                  Số điện thoại
                </Label>
                <Input
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="+84 123 456 789"
                  onChange={handleChange}
                />
              </div>

              <div className="animate-fade-in">
                <Label
                  htmlFor="password"
                  className="text-gray-700 font-medium block mb-1"
                >
                  Mật khẩu
                </Label>
                <Input
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>

              <div className="animate-fade-in">
                <Label
                  htmlFor="address"
                  className="text-gray-700 font-medium block mb-1"
                >
                  Địa chỉ
                </Label>
                <Input
                  name="address"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="Số nhà, đường, phường/xã"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="animate-slide-in-left">
                  <Label
                    htmlFor="city"
                    className="text-gray-700 font-medium block mb-1"
                  >
                    Thành phố
                  </Label>
                  <Input
                    name="city"
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Thành phố"
                    onChange={handleChange}
                  />
                </div>
                <div className="animate-slide-in-right">
                  <Label
                    htmlFor="country"
                    className="text-gray-700 font-medium block mb-1"
                  >
                    Quốc gia
                  </Label>
                  <Input
                    name="country"
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Quốc gia"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="animate-fade-in">
                <Label
                  htmlFor="idNumber"
                  className="text-gray-700 font-medium block mb-1"
                >
                  Số CMND/CCCD
                </Label>
                <Input
                  name="idNumber"
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="Số chứng minh nhân dân/căn cước"
                  onChange={handleChange}
                />
              </div>

              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-200 mt-6 animate-bounce-in"
                type="submit"
              >
                Đăng Ký Ngay
              </Button>

              <div className="text-center text-gray-600 animate-fade-in">
                Đã có tài khoản?{" "}
                <Link
                  href="/signIn"
                  className="font-medium text-amber-600 hover:text-amber-700 transition-colors underline"
                >
                  Đăng nhập tại đây
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
