"use client";

export default function ContactList({ data, reload }) {
  const del = async (id) => {
    await fetch("/api/contacts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    reload();
  };

  return (
    <ul>
      {data.map(c => (
        <li key={c._id}>
          <b>{c.name}</b> ({c.email})
          <p>{c.message}</p>

          {c.file && (
            <a
              href={`${process.env.NEXT_PUBLIC_UPLOAD_PATH}/${c.file}`}
              target="_blank"
            >
              File
            </a>
          )}

          <button onClick={() => del(c._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
