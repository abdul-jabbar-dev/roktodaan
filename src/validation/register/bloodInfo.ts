import BloodGroup from "@/types/blood/group";
import * as z from "zod";

const Player = z.object({
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .refine((val) => !!val, {
      message: "আপনার রক্ত গ্রুপ নির্বাচন করুন",
    }),
  age: z
    .number()
    .min(18, { message: "রক্তদানের জন্য আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে" })
    .max(65, { message: "রক্তদানের জন্য সর্বোচ্চ বয়স ৬৫ বছর" }),

  weight: z
    .number()
    .min(45, { message: "রক্তদানের জন্য ওজন কমপক্ষে ৪৫ কেজি হতে হবে" }),
});

const validationBloodInfo = ({
  bloodGroup,
  age,
  weight,
}: {
  bloodGroup: BloodGroup;
  age: number;
  weight: number;
}) => { 
  const result = Player.safeParse({ bloodGroup, age, weight });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
export type ValidationBloodInfoType = ReturnType<
  typeof validationBloodInfo
>;

export default validationBloodInfo;
