import React from "react";
import {
  UserIcon,
  HomeIcon,
  CalendarIcon,
  CreditCardIcon,
  TagIcon,
  StarIcon,
  WrenchIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export interface IListItemAdmin {
  id: number;
  link: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subMenuItem: {
    id: number;
    link: string;
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
}

export const adminMenu: IListItemAdmin[] = [
  {
    id: 1,
    link: "/admin/users",
    title: "Quản lý người dùng",
    icon: UserIcon,
    subMenuItem: [
      {
        id: 102,
        link: "/admin/users/customers",
        title: "Khách hàng",
        icon: UserIcon,
      },
      {
        id: 103,
        link: "/admin/users/employees",
        title: "Nhân viên",
        icon: UserIcon,
      },
      { id: 104, link: "/admin/users/roles", title: "Vai trò", icon: UserIcon },
    ],
  },
  {
    id: 2,
    link: "/admin/rooms",
    title: "Quản lý phòng",
    icon: HomeIcon,
    subMenuItem: [
      {
        id: 201,
        link: "/admin/rooms/room",
        title: "Danh sách phòng",
        icon: HomeIcon,
      },
      {
        id: 202,
        link: "/admin/rooms/room-types",
        title: "Loại phòng",
        icon: HomeIcon,
      },
      {
        id: 203,
        link: "/admin/rooms/amenities",
        title: "Tiện nghi",
        icon: HomeIcon,
      },
      {
        id: 204,
        link: "/admin/rooms/maintenance",
        title: "Danh sách bảo trì",
        icon: WrenchIcon,
      },
    ],
  },
  {
    id: 3,
    link: "/admin/bookings",
    title: "Quản lý đặt phòng",
    icon: CalendarIcon,
    subMenuItem: [
      {
        id: 301,
        link: "/admin/bookings/listbooking",
        title: "Danh sách đặt phòng",
        icon: CalendarIcon,
      },
      {
        id: 302,
        link: "/admin/bookings/addbooking",
        title: "Đặt phòng ",
        icon: CalendarIcon,
      },
    ],
  },
  {
    id: 5,
    link: "/admin/discounts",
    title: "Quản lý khuyến mãi",
    icon: TagIcon,
    subMenuItem: [
      {
        id: 501,
        link: "/admin/discounts",
        title: "Danh sách khuyến mãi",
        icon: TagIcon,
      },
    ],
  },
  {
    id: 6,
    link: "/admin/reviews",
    title: "Quản lý đánh giá",
    icon: StarIcon,
    subMenuItem: [
      {
        id: 601,
        link: "/admin/reviews",
        title: "Danh sách đánh giá",
        icon: StarIcon,
      },
      {
        id: 602,
        link: "/admin/reviews/pending",
        title: "Đánh giá chờ duyệt",
        icon: StarIcon,
      },
    ],
  },
  {
    id: 8,
    link: "/admin/audit-logs",
    title: "Nhật ký kiểm tra",
    icon: DocumentTextIcon,
    subMenuItem: [
      {
        id: 801,
        link: "/admin/audit-logs",
        title: "Xem nhật ký",
        icon: DocumentTextIcon,
      },
      {
        id: 802,
        link: "/admin/audit-logs/users",
        title: "Nhật ký người dùng",
        icon: DocumentTextIcon,
      },
      {
        id: 803,
        link: "/admin/audit-logs/bookings",
        title: "Nhật ký đặt phòng",
        icon: DocumentTextIcon,
      },
    ],
  },
  {
    id: 9,
    link: "/admin/seasonal-rates",
    title: "Quản lý giá theo mùa",
    icon: ChartBarIcon,
    subMenuItem: [
      {
        id: 901,
        link: "/admin/seasonal-rates",
        title: "Danh sách giá theo mùa",
        icon: ChartBarIcon,
      },
      {
        id: 902,
        link: "/admin/seasonal-rates/add",
        title: "Thêm giá theo mùa",
        icon: ChartBarIcon,
      },
    ],
  },
];
