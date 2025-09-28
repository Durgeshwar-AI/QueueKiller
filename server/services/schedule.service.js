import crypto from "crypto";

export const createScheduleId = async () => {
  return `s-${crypto.randomBytes(16).toString("hex")}`;
};
