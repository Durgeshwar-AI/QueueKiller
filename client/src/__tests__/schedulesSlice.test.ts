import schedulesReducer from "../redux/schedulesSlice";
import type { ISchedule } from "../types";

describe("schedulesSlice", () => {
  const initialState = {
    schedules: [] as ISchedule[],
    loading: false,
    error: null as string | null,
  };

  it("should handle initial state", () => {
    expect(schedulesReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle fetchSchedulesByDept.pending", () => {
    const action = { type: "schedules/fetchByDept/pending" };
    const state = schedulesReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchSchedulesByDept.fulfilled", () => {
    const mockSchedules: ISchedule[] = [
      { id: 1, departmentId: 1, date: "2026-04-10", startTime: "09:00", endTime: "10:00", status: "Available" },
    ];
    const action = { type: "schedules/fetchByDept/fulfilled", payload: mockSchedules };
    const state = schedulesReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.schedules).toEqual(mockSchedules);
  });
});
