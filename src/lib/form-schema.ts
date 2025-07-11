import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[A-Za-z\s-]*$/, "First name must contain letters only"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[A-Za-z\s-]*$/, "Last name must contain letters only"),
  interest: z
    .string()
    .min(1, "Please select an interest")
    .refine((val) => ["Cars", "Music", "Sport"].includes(val), {
      message: "Please select a valid interest",
    }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  favorite: z.string().min(1, "Please select an option"),
});
