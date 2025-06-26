"use client"; // Chỉ cần nếu bạn dùng Next.js App Router

import { useEffect } from "react";

const ChatBox = () => {
  useEffect(() => {
    // Cấu hình LiveChat
    window.__lc = window.__lc || {};
    window.__lc.license = 19207342;
    window.__lc.integration_name = "manual_onboarding";
    window.__lc.product_name = "livechat";

    // Inject script tracking
    const script = document.createElement("script");
    script.src = "https://cdn.livechatinc.com/tracking.js";
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);
  }, []);

  return null; // Không cần render gì
};

export default ChatBox;
