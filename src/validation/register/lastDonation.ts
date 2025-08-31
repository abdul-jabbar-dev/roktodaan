import * as z from "zod";

const Player = z.object({
  lastDonationDate: z.string().min(1, "শেষ রক্তদানের তারিখ দিন"),
  lastDonationLocation: z.string().min(2, "শেষ রক্তদানের স্থান দিন"),
});

const validationLastDonation = ({
  lastDonationDate,
  lastDonationLocation,
}: {
  lastDonationDate: string;
  lastDonationLocation: string;
}) => {
  const result = Player.safeParse({ lastDonationDate, lastDonationLocation });

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
export type ValidationLastDonationType = ReturnType<typeof validationLastDonation>;

export default validationLastDonation;
