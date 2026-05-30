import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { guest_name, guest_phone, check_in, check_out, guests_count, comment } = body;

    if (!guest_name || !guest_phone || !check_in || !check_out || !guests_count) {
      return NextResponse.json({ error: "Не все поля заполнены" }, { status: 400 });
    }

    const supabase = createClient();
    const { error } = await supabase.from("bookings").insert({
      guest_name,
      guest_phone,
      check_in,
      check_out,
      guests_count,
      comment,
      status: "pending",
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
