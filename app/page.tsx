"use client";
import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import ContactList from "@/components/ContactList";

export default function Home() {
  const [contacts, setContacts] = useState([]);

  const load = async () => {
    const res = await fetch("/api/contacts");
    setContacts(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <h1>Contact Center</h1>
      <ContactForm reload={load} />
      <ContactList data={contacts} reload={load} />
    </>
  );
}
