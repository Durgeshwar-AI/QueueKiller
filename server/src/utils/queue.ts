import { config } from "dotenv";
import { Queue } from "bullmq";
import { setLockAtomic } from "./redis";

config();

export const updateDatabaseQueue = new Queue("updateDatabase", {
  connection: {
    url: process.env.REDIS_URL,
  },
});

/**
 * Enqueue a schedule processing job for a department, but only if one isn't already pending.
 * Uses Redis SET NX to ensure only one job per department at a time.
 * @param departmentId - The department to process
 * @returns true if job was enqueued, false if one was already pending
 */
export async function enqueueScheduleProcessing(
  departmentId: number,
): Promise<boolean> {
  const lockKey = `schedule-job:${departmentId}`;
  const lockDuration = 60; // 60 seconds: job should complete well within this

  try {
    // Try to acquire lock
    const lockAcquired = await setLockAtomic(
      lockKey,
      "processing",
      lockDuration,
    );

    if (lockAcquired) {
      // Lock acquired, enqueue the job
      await updateDatabaseQueue.add(
        "process-schedules",
        { departmentId },
        { removeOnComplete: true, removeOnFail: true },
      );
      console.log(`[Queue] Enqueued job for department ${departmentId}`);
      return true;
    } else {
      // Job already pending for this department
      console.log(
        `[Queue] Job already pending for department ${departmentId}, skipping`,
      );
      return false;
    }
  } catch (err) {
    console.error(
      `[Queue] Failed to enqueue for department ${departmentId}:`,
      err,
    );
    throw err;
  }
}
