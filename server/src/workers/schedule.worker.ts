import { Worker } from "bullmq";
import prisma from "../utils/client";
import { statusTypes } from "../generated/enums";

const QUEUE_NAME = "updateDatabase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processJob = async (job: any) => {
  console.log("schedule.worker: processing job", job.id, job.name, job.data);
  try {
    const departmentId = job.data?.departmentId
      ? Number(job.data.departmentId)
      : undefined;

    const now = new Date();

    // 1) Mark schedules as Expired when their startTime has passed and they are not booked
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereMarkExpired: any = {
      startTime: { lt: now },
      status: { in: [statusTypes.Available, statusTypes.Locked] },
      booked: { is: null },
    };
    if (departmentId) whereMarkExpired.departmentId = departmentId;

    const markResult = await prisma.schedules.updateMany({
      where: whereMarkExpired,
      data: { status: statusTypes.Expired as any },
    });

    console.log(
      `schedule.worker: marked ${markResult.count} schedules as Expired`,
    );

    // 2) Delete schedules that expired and are older than 30 days
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereDelete: any = {
      date: { lt: cutoff },
      status: statusTypes.Expired,
    };
    if (departmentId) whereDelete.departmentId = departmentId;

    const delResult = await prisma.schedules.deleteMany({
      where: whereDelete,
    });

    console.log(
      `schedule.worker: deleted ${delResult.count} expired schedules older than 30 days`,
    );
  } catch (error) {
    console.error("schedule.worker error:", error);
    throw error;
  }
};

// Start the worker
try {
  new Worker(QUEUE_NAME, async (job) => processJob(job), {
    connection: { url: process.env.REDIS_URL },
  });
  console.log("schedule.worker: started");
} catch (err) {
  console.error("schedule.worker: failed to start", err);
}
