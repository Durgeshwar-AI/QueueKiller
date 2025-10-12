import crypto from "crypto";

export const createScheduleId = (): string => {
  return `s-${crypto.randomBytes(16).toString("hex")}`;
};
