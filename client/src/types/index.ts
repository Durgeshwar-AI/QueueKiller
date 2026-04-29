export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ICompany {
  id: number;
  name: string;
}

export interface IDepartment {
  id: number;
  name: string;
  description?: string;
  type: string;
  companyId: number;
  company?: ICompany;
  price?: number;
}

export interface ISchedule {
  id: number;
  departmentId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: "Available" | "Locked" | "Booked";
  booked?: unknown[];
  department?: IDepartment;
}

export interface IBooking {
  id: number;
  userId: number;
  schedulesId: number;
  qrCode: string;
  status: "Upcoming" | "Attended" | "Missed";
  schedules?: ISchedule;
  user?: IUser;
}

export interface IAuthState {
  isLoggedIn: boolean;
  token: string | null;
  name: string | null;
  email?: string | null;
  accountType: "user" | "company" | "admin" | null;
  loading: boolean;
  error: string | null;
}

export interface IRazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface IPaymentData extends IRazorpayResponse {
  scheduleId: number;
  bookingPrice?: number;
  platformFee?: number;
  totalAmount?: number;
}
