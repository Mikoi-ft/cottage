export interface Booking {
  id: string;
  guest_name: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  comment: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  comment: string;
}
