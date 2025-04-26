"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Logic xử lý đăng ký email (có thể gọi API ở đây)
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Dịch Vụ */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">Dịch Vụ</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Đặt Phòng
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Nhà Hàng
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Spa & Làm Đẹp
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Hội Nghị
              </Link>
            </li>
          </ul>
        </div>

        {/* Hỗ Trợ */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">Hỗ Trợ</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Liên Hệ
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Câu Hỏi Thường Gặp
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Hướng Dẫn Đặt Phòng
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Trung Tâm Trợ Giúp
              </Link>
            </li>
          </ul>
        </div>

        {/* Về Chúng Tôi */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">
            Về Chúng Tôi
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Giới Thiệu
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Tuyển Dụng
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Tin Tức
              </Link>
            </li>
          </ul>
        </div>

        {/* Chính Sách */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">
            Chính Sách
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Điều Khoản Dịch Vụ
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Chính Sách Bảo Mật
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Chính Sách Hoàn Tiền
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-yellow-400 transition-colors"
              >
                Quy Định Chung
              </Link>
            </li>
          </ul>
        </div>

        {/* Đăng Ký Nhận Tin */}
        <div>
          <h3 className="text-white font-semibold uppercase mb-4">
            Đăng Ký Nhận Tin
          </h3>
          <p className="text-gray-400 mb-4">
            Nhận thông tin mới nhất về ưu đãi, sự kiện và dịch vụ của chúng tôi
            qua email.
          </p>
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 transition-colors"
            >
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          Thiết Kế WebSite ©𝙏𝙧𝙪̛𝙤̛𝙣𝙜 𝙉𝙝𝙖̣̂𝙩 𝘾𝙪̛𝙤̛̀𝙣𝙜
        </p>
        <div className="flex space-x-4">
          <Link
            href="https://www.facebook.com/tncuong2004/"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12.061C22 6.504 17.496 2 12 2S2 6.504 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03h-2.54v-2.909h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.476h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.909h-2.33v7.03C18.343 21.245 22 17.083 22 12.061z" />
            </svg>
          </Link>
          <Link
            href="https://www.instagram.com/tncuong2004/"
            className="text-gray-400 hover:text(removed)hover:text-yellow-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c-5.523 0-10 4.477-10 10 0 4.411 2.854 8.144 6.8 9.453-.094-.086-.178-.214-.24-.42-.065-.21-.13-.424-.13-.64 0-1.548 1.263-2.803 2.82-2.803 1.574 0 2.82 1.255 2.82 2.803 0 .216-.065.43-.13.64-.062.206-.146.334-.24.42 3.946-1.31 6.8-5.042 6.8-9.453 0-5.523-4.477-10-10-10zm0 18.163c-1.574 0-2.82-1.255-2.82-2.803s1.246-2.803 2.82-2.803 2.82 1.255 2.82 2.803-1.246 2.803-2.82 2.803zm4-8.163c0 2.206-1.794 4-4 4s-4-1.794-4-4 1.794-4 4-4 4 1.794 4 4z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
