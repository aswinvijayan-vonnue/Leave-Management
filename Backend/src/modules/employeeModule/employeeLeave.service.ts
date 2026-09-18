import { calculateWorkingDays } from "../../../utils/workingdays";
import { prisma } from "../../../lib/prisma";
import { ConflictError, NotFoundError } from "../../error/errors";
import type { CreateLeaveRequestType } from "./employee.schema";

export class EmployeeService {
  async getLeaveStat(id: number) {
    const currentYear = new Date().getFullYear();
    const stat = await prisma.leaveBalance.findMany({
      where: { employeeId: id, year: currentYear },
      include: { employee: true, leaveType: true },
    });
    if (!stat) throw new NotFoundError("Record not found");
    return stat.map((data) => ({
      id:data.id,
      name: data.employee.name,
      employeeId: data.employeeId,
      leave: data.leaveType.name,
      total: data.allocatedDays,
      used: data.usedDays,
    }));
  }
  async getRequestHistory(id: number) {
    const res = await prisma.leaveRequestHistory.findMany({
      where: { employeeId: id },
      include: { employee: true, leaveType: true },
      orderBy:{appliedOn:'desc'}
    });
    const formattedResult = res.map((data) => ({
      id:data.id,
      name: data.employee.name,
      employee_id: data.employeeId,
      leave: data.leaveType.name,
      from: data.from,
      to: data.to,
      duration: calculateWorkingDays(data.from, data.to),
      status: data.status,
      applied_on: data.appliedOn,
    }));
    return formattedResult;
  }
  async createRequest(data: CreateLeaveRequestType, employeeId: number) {
    const year = data.startDate.getFullYear();
    const leaveInfo = await prisma.leaveBalance.findUnique({
      where: {
        employeeId_year_leaveTypeId: {
          employeeId,
          year,
          leaveTypeId: data.leaveTypeId,
        },
      },
    });
    if (!leaveInfo) throw new NotFoundError("Record not found");
    const avail_Days = leaveInfo.allocatedDays - leaveInfo.usedDays;
    const duration = calculateWorkingDays(data.startDate, data.endDate);
    if (avail_Days < duration)
      throw new ConflictError("Available days are too low");
    const newReq = await prisma.leaveRequestHistory.create({
      data: {
        employeeId: employeeId,
        leaveTypeId: data.leaveTypeId,
        from: data.startDate,
        to: data.endDate,
        reason: data.reason,
      },
      include: { leaveType: true },
    });
    return newReq;
  }

  async getLeaveTypes() {
    const res = await prisma.leaveType.findMany({ orderBy: { name: "asc" } });
    return res;
  }
}
