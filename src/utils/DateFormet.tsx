"use client";

export default function ClientDate({ dateString }: { dateString?: string }) {
  if (!dateString) return <span>--/--/----</span>;

  const formattedDate = new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return <span>{formattedDate==="Invalid Date"?"No Date":formattedDate}</span>;
}
