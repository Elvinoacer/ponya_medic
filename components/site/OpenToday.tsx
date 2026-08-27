"use client";

import { useEffect, useState } from "react";

/** Renders today's OPD hours based on the visitor's clock. */
export function OpenToday() {
  const [label, setLabel] = useState<string>("7 days a week");

  useEffect(() => {
    const day = new Date().getDay(); // 0 Sun … 6 Sat
    if (day === 0) setLabel("8 AM – 7:30 PM");
    else if (day === 6) setLabel("8 AM – 7:30 PM");
    else setLabel("7:30 AM – 8:30 PM");
  }, []);

  return <span>{label}</span>;
}
