"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserRound } from "lucide-react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// Define types based on your Prisma schema
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
type UserType = "CUSTOMER" | "EMPLOYEE" | "ADMIN";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  userType: UserType;
  status: UserStatus;
  customer: Customer;
}

interface Customer {
  id: string;
  address: string | null;
  city: string | null;
  country: string | null;
  idNumber: string | null;
}

interface ITableCustomer {
  customers: User[];
}

const TableCustomer = ({ customers }: ITableCustomer) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter customers based on search term

  return (
    <div className="space-y-4 bg-white p-3 border rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8 w-[250px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Số điện thoại
              </TableHead>
              <TableHead className="hidden md:table-cell">CMND/CCCD</TableHead>
              <TableHead className="hidden lg:table-cell">Địa điểm</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <UserRound className="h-4 w-4" />
                      </div>
                      <div>
                        {customer.firstName} {customer.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.phone || "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.customer.idNumber || "—"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {[customer.customer.city, customer.customer.country]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "ACTIVE"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        customer.status === "ACTIVE"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <PencilSquareIcon className="w-7 h-7 text-gray-500 inline-block mr-5 cursor-pointer hover:text-blue-500" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableCustomer;
