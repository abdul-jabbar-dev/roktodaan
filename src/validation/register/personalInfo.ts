import * as z from "zod";
const requiredString = (message: string) =>
  z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty({ message })
  );
// Step5 personal info er jonno Zod schema
const personalInfoSchema = z.object({
  fullName: requiredString("নাম অবশ্যই দিতে হবে"),
  email: z.string().optional(),
  phoneNumber: z
    .string()
    .nonempty({ message: "ফোন নম্বর অবশ্যই দিতে হবে" })
    .regex(/^\d{10,15}$/, { message: "সঠিক ফোন নম্বর দিন" }),
  gender: z.enum(["Male", "Female"], {
    message: "লিঙ্গ সঠিকভাবে নির্বাচন করুন",
  }),
  address: z.object({
    division: requiredString("বিভাগ অবশ্যই দিতে হবে"),
    district: requiredString("জেলা অবশ্যই দিতে হবে"),
    upazila: requiredString("উপজেলা অবশ্যই দিতে হবে"),
  }),
});

// Validation function
const validationPersonalInfo = (params: {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  gender?: "Male" | "Female";
  address?: {
    division: string;
    district: string;
    upazila: string;
  };
}) => {
  const result = personalInfoSchema.safeParse(params);

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

// Type for return value
export type ValidationPersonalInfoType = ReturnType<
  typeof validationPersonalInfo
>;

export default validationPersonalInfo;
