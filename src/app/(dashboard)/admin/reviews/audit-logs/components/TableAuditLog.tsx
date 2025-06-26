import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  userType?: "Customer" | "Employee" | "System" | null;
  details?: string | null;
  createdAt: Date;
  lastName: string;
  firstName: string;
}

moment.locale("vi");

interface IAuditLogProps {
  auditLogs: AuditLog[];
}

const TableAuditLog = ({ auditLogs }: IAuditLogProps) => {
  return (
    <div className="p-6 bg-white border rounded-xl ">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hành Động</TableHead>
              <TableHead>Đối Tượng</TableHead>
              <TableHead>Người Dùng</TableHead>
              <TableHead>Chi Tiết</TableHead>
              <TableHead>Thời Gian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.action}</TableCell>
                <TableCell>{log.userType || "Hệ thống"}</TableCell>
                <TableCell>
                  {log.firstName + " " + log.lastName || "Hệ thống"}
                </TableCell>
                <TableCell>{log.details || "-"}</TableCell>
                <TableCell>{moment(log.createdAt).fromNow()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableAuditLog;
