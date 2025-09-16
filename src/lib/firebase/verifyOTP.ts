export const verifyOTP = async (confirmation: any, code: string) => {
  try {
    const result = await confirmation.confirm(code);
    return result.user; // user verified
  } catch (err) {
    console.error("OTP verify error:", err);
  }
};