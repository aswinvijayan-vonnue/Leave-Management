import { prisma } from "../../../lib/prisma";
import type { Status } from "../../../generated/prisma/enums";
import { calculateWorkingDays } from "../../../utils/workingdays";
import { ValidationError, NotFoundError } from "../../error/errors";

export class ManagerService {
  async updateStatus(id: number, status: Status) {
    const resposne = await prisma.$transaction(async (tx) => {
      const res = await tx.leaveRequestHistory.update({
        data: { status },
        where: { id: id },
      });
      if (res.status === "Approved") {
        const year = res.from.getFullYear();
        const balance = await tx.leaveBalance.findUnique({
          where: {
            employeeId_year_leaveTypeId: {
              employeeId: res.employeeId,
              leaveTypeId: res.leaveTypeId,
              year,
            },
          },
        });
        if (!balance) throw new NotFoundError("Leave data not found");

        const requestedDays = calculateWorkingDays(res.from, res.to);
        const availableDays = balance.allocatedDays - balance.usedDays;
        if (availableDays < requestedDays)
          throw new ValidationError(
            `Insufficient balance. Requested: ${requestedDays}, Available: ${availableDays}`,
          );
        await tx.leaveBalance.update({
          data: { usedDays: balance.usedDays + requestedDays },
          where: {
            employeeId_year_leaveTypeId: {
              employeeId: balance.employeeId,
              leaveTypeId: balance.leaveTypeId,
              year: balance.year,
            },
          },
        });
      }
      return res;
    });
    return resposne;
  }
  async getPendingRequest() {
    const res = await prisma.leaveRequestHistory.findMany({
      where: { status: "Pending" },
      include: { employee: true, leaveType: true },
      take: 10,
      orderBy: { appliedOn: "desc" },
    });
    const formattedRes = res.map((data) => ({
      id: data.id,
      name: data.employee.name,
      role: data.employee.title,
      leave: data.leaveType.name,
      from: data.from,
      to: data.to,
      duration: calculateWorkingDays(data.from, data.to),
      applied_on: data.appliedOn,
    }));
    return formattedRes;
  }

  async getRequestStat() {
    const total = await prisma.leaveRequestHistory.count();
    const pendingCount = await prisma.leaveRequestHistory.count({
      where: { status: "Pending" },
    });

    return {
      total,
      pendingCount,
    };
  }
  async getRequests() {
    const res = await prisma.leaveRequestHistory.findMany({
      include: { employee: true, leaveType: true },
      take: 10,
      orderBy: { appliedOn: "desc" },
    });
    const formattedRes = res.map((data) => ({
      id: data.id,
      name: data.employee.name,
      role: data.employee.title,
      leave: data.leaveType.name,
      from: data.from,
      to: data.to,
      duration: calculateWorkingDays(data.from, data.to),
      applied_on: data.appliedOn,
      status: data.status,
    }));
    return formattedRes;
  }
}
