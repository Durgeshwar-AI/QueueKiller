/**
 * API Service for Company Backend Integration
 * Replace mock data with actual API calls using this service
 */

const API_BASE = process.env.VITE_API_URL || "http://localhost:8000/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ============ AUTHENTICATION ============

export const authService = {
  login: async (key: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE}/company/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE}/company/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

// ============ DEPARTMENTS ============

export const departmentService = {
  getAll: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE}/company/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  getById: async (token: string, departmentId: number) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/departments/${departmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  create: async (
    token: string,
    data: { name: string; type: "General" | "Health" },
  ) => {
    try {
      const response = await fetch(`${API_BASE}/company/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  update: async (
    token: string,
    departmentId: number,
    data: { name: string; type: "General" | "Health" },
  ) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/departments/${departmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  delete: async (token: string, departmentId: number) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/departments/${departmentId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

// ============ SCHEDULES ============

export const scheduleService = {
  getByDepartment: async (token: string, departmentId: number) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/schedules/${departmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  create: async (
    token: string,
    data: {
      departmentId: number;
      date: string;
      startTime: string;
      endTime: string;
      status: "Available" | "Locked" | "Booked";
    },
  ) => {
    try {
      const response = await fetch(`${API_BASE}/company/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  update: async (
    token: string,
    scheduleId: number,
    data: {
      departmentId: number;
      date: string;
      startTime: string;
      endTime: string;
      status: "Available" | "Locked" | "Booked";
    },
  ) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/schedules/${scheduleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  delete: async (token: string, scheduleId: number) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/schedules/${scheduleId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

// ============ BOOKINGS ============

export const bookingService = {
  getAll: async (token: string, companyId: number) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/bookings?companyId=${companyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  verify: async (token: string, data: { qrCode: string; status: string }) => {
    try {
      const response = await fetch(`${API_BASE}/company/bookings/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  updateStatus: async (
    token: string,
    bookingId: number,
    status: "Upcoming" | "Attended" | "Missed",
  ) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/bookings/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

// ============ DASHBOARD STATS ============

export const dashboardService = {
  getStats: async (token: string, companyId: number) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/dashboard/stats?companyId=${companyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  getRecentActivity: async (token: string, companyId: number) => {
    try {
      const response = await fetch(
        `${API_BASE}/company/dashboard/activity?companyId=${companyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
