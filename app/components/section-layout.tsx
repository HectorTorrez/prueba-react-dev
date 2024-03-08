import React from "react";

export default function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        marginTop: "50px",
      }}
    >
      {children}
    </section>
  );
}
