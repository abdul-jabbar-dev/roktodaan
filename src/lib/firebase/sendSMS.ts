import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./";

let recaptchaVerifier: RecaptchaVerifier | null = null;

export const sendOTP = async (phone: string) => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response:any) => console.log("reCAPTCHA solved!", response),
    });
    await recaptchaVerifier.render(); // important
  }

  const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  return confirmation;
};
