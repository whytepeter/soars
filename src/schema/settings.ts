import { z } from "zod";

export const EditProfileSchema = z.object({
  full_name: z
    .string()
    .describe("Full Name")
    .trim()
    .min(2, "Full name is required"),
  user_name: z
    .string()
    .describe("User Name")
    .min(3, "User Name must be at least 3 characters long"),
  email: z.string().describe("Email").trim().email("Invalid email address"),
  password: z
    .string()
    .describe("Password")
    .min(6, "Password must be at least 6 characters"),
  dob: z.string().describe("Date of Birth").min(1, "Date of Birth is required"),
  present_address: z
    .string()
    .describe("Present Address")
    .min(1, "Present address is required"),
  permanent_address: z
    .string()
    .describe("Permanent Address")
    .min(1, "Permanent address is required"),
  city: z.string().describe("City").min(1, "City is required"),
  postal_code: z
    .string()
    .describe("Postal Code")
    .regex(/^\d+$/, "Postal Code must be numeric"),
  country: z.string().describe("Country").min(1, "Country is required"),
});

export const SecuritySchema = z
  .object({
    old_password: z
      .string()
      .describe("Old Password")
      .min(1, "Old Password is required"),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match.",
    path: ["confirm_password"],
  });
