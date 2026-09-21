import z from "zod";

export const createLeaveRequestSchema = z.object({
  leaveTypeId: z.coerce.number(),
  startDate: z.coerce.date({ message: "Invalid start date" }),
  endDate: z.coerce.date({ message: "Invalid end date" }),
  reason: z.string(),
});



export type CreateLeaveRequestType=z.infer<typeof createLeaveRequestSchema>