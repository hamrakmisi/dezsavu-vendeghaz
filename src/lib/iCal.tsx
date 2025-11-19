import * as ical from "node-ical";

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
