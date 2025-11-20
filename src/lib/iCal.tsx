'use server'

import * as ical from "node-ical";
import { getFutureReservations } from "./reservationController";

function isVEvent(component: ical.CalendarComponent): component is ical.VEvent {
  return component.type === "VEVENT";
}

export async function fetchAirbnbCalendar() {
  const url = `${process.env.AIRBNB_ICAL_URL}`;

  if (!url) {
    throw new Error("AIRBNB_ICAL_URL is not defined");
  }

  const res = await fetch(url);
  const text = await res.text();

  const data = ical.sync.parseICS(text);

  const parsedEvents = Object.values(data)
    .filter(isVEvent)
    .map((event) => {
      return {
        checkInDate: event.start,
        checkOutDate: event.end,
      };
    });

  return parsedEvents;
}

export async function createICalFile() {
  const reservations = await getFutureReservations();

  function formatDateAsICAL(date: Date) {
    return date.toISOString().slice(0, 10).replace(/-/g, "");
  }

  function formatDateTimeAsICAL(date: Date) {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dezsavú Vendégház//Calendar//HU",
  ];

  for (const r of reservations) {
    const uid = `res_${r.id}@dezsavu`;
    const dtstamp = formatDateTimeAsICAL(new Date());

    const start = formatDateAsICAL(r.checkInDate);
    const end = formatDateAsICAL(r.checkOutDate);

    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      "SUMMARY:Reserved",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}
