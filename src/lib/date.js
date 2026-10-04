const f = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// "2026-09-30" -> "30 Sept 2026"
export const fmtDate = (iso) => f.format(new Date(`${iso}T12:00:00Z`));