"use client";
import { useState } from "react";

export default function ContactForm({ reload }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [file, setFile] = useState(null);

  const submit = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (file) data.append("file", file);

    await fetch("/api/contacts", {
      method: "POST",
      body: data,
    });

    setForm({ name: "", email: "", message: "" });
    setFile(null);
    reload();
  };

  return (
    <div>
      <h3>Contact Form</h3>
      <input placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <textarea placeholder="Message" value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={submit}>Send</button>
    </div>
  );
}
