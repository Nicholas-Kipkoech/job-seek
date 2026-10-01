import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "You must be logged in." },
        { status: 401 },
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "Your session is invalid or expired." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const {
      job_type,
      job_role,
      country,
      passport_status,
      fee_acknowledged,
      first_name,
      last_name,
      phone,
      whatsapp,
      email,
      country_of_birth,
      country_living_in,
    } = body;

    if (
      !job_type ||
      !job_role ||
      !country ||
      !passport_status ||
      !first_name ||
      !last_name ||
      !phone ||
      !whatsapp ||
      !email ||
      !country_of_birth
    ) {
      return NextResponse.json(
        { success: false, error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (user.email?.toLowerCase() !== String(email).trim().toLowerCase()) {
      return NextResponse.json(
        {
          success: false,
          error: "The application email does not match your account.",
        },
        { status: 400 },
      );
    }

    const { data: application, error } = await supabase
      .from("applications")
      .insert({
        user_id: user.id,
        job_type,
        job_role: String(job_role).trim(),
        country,
        passport_status,
        fee_acknowledged: Boolean(fee_acknowledged),
        first_name: String(first_name).trim(),
        last_name: String(last_name).trim(),
        phone: String(phone).trim(),
        whatsapp: String(whatsapp).trim(),
        email: String(email).trim().toLowerCase(),
        country_of_birth,
        country_living_in: country_living_in || null,
        status: "new",
        whatsapp_sent: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Application insert error:", error);
      return NextResponse.json(
        { success: false, error: "Unable to save your application." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Application API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting your application.",
      },
      { status: 500 },
    );
  }
}
