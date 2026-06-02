import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Amenities from "@/components/sections/Amenities";
import Location from "@/components/sections/Location";
import BookingCalendar from "@/components/sections/BookingCalendar";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import LodgingSchema from "@/components/schema/LodgingSchema";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 300; // кэш 5 минут

async function getBookedDates() {
  const supabase = createClient();
  const { data } = await supabase
    .from("bookings")
    .select("check_in, check_out, guest_name")
    .eq("status", "confirmed")
    .gte("check_out", new Date().toISOString().split("T")[0]);

  return data ?? [];
}

export default async function HomePage() {
  const bookedDates = await getBookedDates();

  return (
    <>
      <LodgingSchema />
      <main>
        <Hero />
        <BookingCalendar bookedDates={bookedDates} />
        <Gallery />
        <Amenities />
        <Location />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}