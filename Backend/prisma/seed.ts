import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, Status } from "../generated/prisma/client";
import bcrypt from "bcrypt";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database....");
  await prisma.leaveBalance.deleteMany();
  await prisma.leaveRequestHistory.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();
  await prisma.leaveType.deleteMany();

  //leave types

  const [annual, sick, personal] = await Promise.all([
    prisma.leaveType.create({ data: { name: "Annual Leave" } }),
    prisma.leaveType.create({ data: { name: "Sick Leave" } }),
    prisma.leaveType.create({ data: { name: "Personal Leave" } }),
  ]);

  //departments
  const [engineering, marketing, accounting] = await Promise.all([
    prisma.department.create({ data: { name: "Engineering" } }),
    prisma.department.create({ data: { name: "Marketing" } }),
    prisma.department.create({ data: { name: "Accounnting" } }),
  ]);

  //employees

  const passwordHash = await bcrypt.hash("Password@123", 10);
  const [emp1, emp2, emp3, emp4] = await Promise.all([
    prisma.user.create({
      data: {
        email: "employee1@gmail.com",
        name: "employee1",
        password: passwordHash,
        departmentId: engineering.id,
        role: Role.employee,
        title: "Associate Softare Engineer",
      },
    }),
    prisma.user.create({
      data: {
        email: "employee2@gmail.com",
        name: "employee2",
        password: passwordHash,
        departmentId: accounting.id,
        role: Role.employee,
        title: "Accountant",
      },
    }),
    prisma.user.create({
      data: {
        email: "employee3@gmail.com",
        name: "employee3",
        password: passwordHash,
        departmentId: marketing.id,
        role: Role.employee,
        title: "Product Marketing Manager",
      },
    }),
    prisma.user.create({
      data: {
        email: "manager@gmail.com",
        name: "Marino Davis",
        password: passwordHash,
        departmentId: engineering.id,
        role: Role.manager,
        title: "Engineering Manager",
      },
    }),
  ]);

  await prisma.leaveBalance.createMany({
    data: [
      {
        employeeId: emp1.id,
        year: 2026,
        leaveTypeId: sick.id,
        allocatedDays: 20,
        usedDays: 15,
      },
      {
        employeeId: emp1.id,
        year: 2026,
        leaveTypeId: annual.id,
        allocatedDays: 20,
        usedDays: 5,
      },
      {
        employeeId: emp1.id,
        year: 2026,
        leaveTypeId: personal.id,
        allocatedDays: 20,
        usedDays: 17,
      },
      {
        employeeId: emp2.id,
        year: 2026,
        leaveTypeId: sick.id,
        allocatedDays: 20,
      },
      {
        employeeId: emp2.id,
        year: 2026,
        leaveTypeId: personal.id,
        allocatedDays: 10,
      },
      {
        employeeId: emp2.id,
        year: 2026,
        leaveTypeId: annual.id,
        allocatedDays: 20,
      },
      {
        employeeId: emp3.id,
        year: 2026,
        leaveTypeId: annual.id,
        allocatedDays: 30,
      },
      {
        employeeId: emp3.id,
        year: 2026,
        leaveTypeId: sick.id,
        allocatedDays: 20,
      },
      {
        employeeId: emp3.id,
        year: 2026,
        leaveTypeId: personal.id,
        allocatedDays: 20,
      },
    ],
  });
  await prisma.leaveRequestHistory.createMany({
    data: [
      {
        employeeId: emp1.id,
        from: new Date("2026-01-01"),
        to: new Date("2026-01-03"),
        status: Status.Approved,
        leaveTypeId: personal.id,
        reason: "Family function",
      },
      {
        employeeId: emp2.id,
        from: new Date("2026-03-11"),
        to: new Date("2026-01-12"),
        status: Status.Rejected,
        leaveTypeId: personal.id,
        reason: "Personal reason",
      },
      {
        employeeId: emp2.id,
        from: new Date("2026-03-25"),
        to: new Date("2026-03-25"),
        status: Status.Approved,
        leaveTypeId: annual.id,
        reason: "Personal reason",
      },
      {
        employeeId: emp2.id,
        from: new Date("2026-09-25"),
        to: new Date("2026-09-27"),
        status: Status.Rejected,
        leaveTypeId: sick.id,
        reason: "Medical appointment",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
