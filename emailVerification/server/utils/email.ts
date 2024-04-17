// utils/email.ts (mock implementation)
export async function sendOTP(email: string, otp: number): Promise<void> {
    console.log(`Sending OTP ${otp} to ${email}`);
  }
  