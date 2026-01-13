import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import Contact from "../../lib/Contact";

// PUT - update contact
export async function PUT(req) {
  await connectDB();

  const body = await req.json();

  const contact = await Contact.findByIdAndUpdate(
    body.id,
    {
      name: body.name,
      email: body.email,
      message: body.message,
    },
    { new: true }
  );

  return NextResponse.json(contact);
}

// DELETE - delete contact
export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();
  await Contact.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}
