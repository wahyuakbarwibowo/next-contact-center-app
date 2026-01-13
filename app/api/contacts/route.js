import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/Contact";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");

/* ================= GET ================= */
export async function GET() {
  await connectDB();
  const data = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json(data);
}

/* ================= POST ================= */
export async function POST(req) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("file");
  let filename = null;

  if (file && file.size > 0) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    filename = Date.now() + "-" + file.name;
    fs.writeFileSync(path.join(uploadDir, filename), buffer);
  }

  const contact = await Contact.create({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    file: filename,
  });

  return NextResponse.json(contact, { status: 201 });
}

/* ================= PUT ================= */
export async function PUT(req) {
  await connectDB();

  const formData = await req.formData();
  const id = formData.get("id");
  const file = formData.get("file");

  const contact = await Contact.findById(id);
  if (!contact) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  contact.name = formData.get("name");
  contact.email = formData.get("email");
  contact.message = formData.get("message");

  if (file && file.size > 0) {
    if (contact.file) {
      const oldPath = path.join(uploadDir, contact.file);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const newFilename = Date.now() + "-" + file.name;
    fs.writeFileSync(path.join(uploadDir, newFilename), buffer);
    contact.file = newFilename;
  }

  await contact.save();
  return NextResponse.json(contact);
}

/* ================= DELETE ================= */
export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();
  const contact = await Contact.findById(id);

  if (contact?.file) {
    const filePath = path.join(uploadDir, contact.file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await Contact.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
