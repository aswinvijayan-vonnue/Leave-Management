import z from "zod";

const formatName = (value: unknown) => {
  if (typeof value === "string") {
    const name = value.trim().toLowerCase().trim().split(/\s+/);
    const formatted = name
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return formatted;
  }
};
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const signupSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" })
    .max(100, { message: "Password should not be more than 100 characters" }),
  role: z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
    z.enum(["employee", "manager"]).optional(),
  ),
  name: z.preprocess(formatName, z.string().min(1)),
});

export type LoginType = z.infer<typeof loginSchema>;
export type SignupType = z.infer<typeof signupSchema>;
