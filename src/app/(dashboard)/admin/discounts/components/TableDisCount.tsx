"use client";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDiscount } from "../page";
import DeleteDisCount from "./DeleteDisCount";
import { formatDate } from "@/lib/formatDate";

interface TableDiscountProps {
  discounts: IDiscount[];
}

const TableDiscount = ({ discounts }: TableDiscountProps) => {
  return (
    <div className="rounded-md border px-5 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã Giảm Giá</TableHead>
            <TableHead>Phần Trăm Giảm Giá (%)</TableHead>
            <TableHead>Ngày Bắt Đầu</TableHead>
            <TableHead>Ngày Kết Thúc</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell className="font-medium">{discount.code}</TableCell>
              <TableCell>{discount.percentage}%</TableCell>
              <TableCell>{formatDate(discount.validFrom)}</TableCell>
              <TableCell>{formatDate(discount.validTo)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <DeleteDisCount id={discount.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDiscount;
