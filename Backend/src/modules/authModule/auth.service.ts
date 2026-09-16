import type { LoginType, SignupType } from "./auth.schema";
import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { ValidationError, ConflictError } from "../../error/errors";
import { generateToken } from "../../../utils/jwt";

function toSafeUser(data: {
  email: string;
  password: string;
  id: number;
  name: string | null;
  role: string;
  department: {
    id: number;
    name: string;
  };
}) {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role,
    department:data.department.name
  };
}

export class AuthService {
  async login(data: LoginType) {
    const res = await prisma.user.findUnique({
      where: { email: data.email },
      include: { department: true },
    });
    if (!res) throw new ValidationError("Invalid email or password");
    const isOk = await bcrypt.compare(data.password, res.password);
    if (!isOk) throw new ValidationError("Invalid email or password");
    return {
      data: toSafeUser(res),
      token: generateToken({ userId: res.id, role: res.role }),
    };
  }
  async signup(data: SignupType) {
    console.log("here");
    const res = await prisma.user.findUnique({ where: { email: data.email } });
    if (res)
      throw new ConflictError("User with given email already already exists");
    const dept = await prisma.department.findUnique({
      where: { name: data.department },
    });
    if (!dept) throw new ValidationError("Given department doesnot exists");
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const response = await prisma.user.create({
      data: {
        name: data.name,
        role: data.role,
        email: data.email,
        password: hashedPassword,
        departmentId: dept.id,
      },
      include: {
        department: true,
      },
    });
    return {
      data: toSafeUser(response),
      token: generateToken({ userId: response.id, role: response.role }),
    };
  }
  async getInfo(id: number) {
    const res = await prisma.user.findUnique({ where: { id },include:{department:true} });
    if (!res) throw new ValidationError("Invalid email or password");
    return {
      data: toSafeUser(res),
    };
  }
}
