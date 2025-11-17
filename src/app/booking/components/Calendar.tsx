import { useEffect, useState } from 'react'
import { Reservation } from '@/lib/queries/reservations';

interface CalendarProps {
  days: string[];
  daysOffset: number;
  daysInMonth: number;
  monthOffset: number;
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  currentMonth: Date
  onDateClick: (day: number, monthOffset: number, currentMonth: Date) => void
  hoveredDate: Date | null
  setHoveredDate: (date: Date | null) => void
}

export default function Calendar({
  days, daysOffset,
  daysInMonth, monthOffset,
  checkInDate, checkOutDate,
  currentMonth, onDateClick,
  hoveredDate, setHoveredDate
}: CalendarProps) {
  const [requestedUntil, setRequestedUntil] = useState<Date>(currentMonth)
  const [bookedDates, setBookedDates] = useState<Date[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (requestedUntil > currentMonth) {
      return;
    }

    setLoading(true);

    const requestMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 4, 1);
    
    const fetchReservations = async () => {
      try {
        const response = await getReservations({
          from: currentMonth,
          to: requestMonth
        });
        
        return response.data;
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
    };

    fetchReservations().then((reservations) => {
      const newBookedDates = reservations.flatMap((reservation: Reservation) => {
        const startDate = new Date(reservation.checkInDate);
        const endDate = new Date(reservation.checkOutDate);
        const dates: Date[] = [];

        const currentDate = new Date(startDate);
        currentDate.setHours(0, 0, 0, 0);
        
        const lastDate = new Date(endDate);
        lastDate.setHours(0, 0, 0, 0);

        while (currentDate <= lastDate) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return dates;
      });

      setBookedDates((prev: Date[]) => {
        const allDates = [...prev, ...newBookedDates];
        const uniqueDates = allDates.filter(
          (date, index, self) => 
            index === self.findIndex(d => d.getTime() === date.getTime())
        );
        return uniqueDates;
      });

      setRequestedUntil(requestMonth);
      setLoading(false);
    });
  }, [currentMonth]);

  async function getReservations({ from, to }: { from: Date, to: Date }) {
    try {
      const params = new URLSearchParams({
        from: from.toISOString(),
        to: to.toISOString()
      });
      
      const response = await fetch(`/api/bookings?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
  }

  function hasExactlyOneAvailableDateBetweenBookings(date: Date): boolean {
    const oneDayBefore = new Date(new Date(date).setDate(date.getDate() - 1));

    const isDayBeforeBooked = isDateBooked(oneDayBefore);
    const isNextDayBooked = isDateBooked(new Date(date.getTime() + 24 * 60 * 60 * 1000));
    
    return isDayBeforeBooked && isNextDayBooked;
  }

  function isAfterNextBookedDate(date: Date): boolean {
    if (!checkInDate || checkOutDate) {
      return false;
    }

    const firstBookedAfterCheckIn = bookedDates.sort((a, b) =>
      a.getTime() - b.getTime()
    ).find(bookedDate => bookedDate > checkInDate);

    if (!firstBookedAfterCheckIn) {
      return false;
    }

    return date >= firstBookedAfterCheckIn;
  }

  function isDateBooked(date: Date): boolean {
    return bookedDates.some(bookedDate =>
      bookedDate.getTime() === date.getTime()
    );
  }

  function isDisabled(day: number, monthOffset: number) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
    date.setHours(0, 0, 0, 0)

    if (date <= today) {
      return true;
    }

    if (isDateBooked(date)) {
      return true;
    }

    if (hasExactlyOneAvailableDateBetweenBookings(date)) {
      return true;
    }

    if (isAfterNextBookedDate(date)) {
      return true;
    }

    return false;
  }

  function dateIsSelected(day: number, monthOffset: number) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
    return date.toDateString() === checkInDate?.toDateString() || date.toDateString() === checkOutDate?.toDateString()
  }

  function dateIsBetween(day: number, monthOffset: number) {
    if (!checkInDate || !checkOutDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
    return date.getTime() >= checkInDate.getTime() && date.getTime() <= checkOutDate.getTime()
  }

  function onMouseHover(day: number, monthOffset: number) {
    if (!checkInDate || checkOutDate) {
      setHoveredDate(null)
      return;
    }

    setHoveredDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day))
  }

  function shouldShowPreviewRange(day: number, monthOffset: number): boolean {
    if (!checkInDate || !hoveredDate || checkOutDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
    return date > checkInDate && date <= hoveredDate
  }

  return (
    <div className="flex flex-col mx-auto">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, index) => (
          <div key={index} className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-700">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: daysOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="w-8 h-8"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          return (
            <div
              key={day}
              className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded ${
                loading ? 'skeleton cursor-not-allowed' : isDisabled(day, monthOffset)
                  ? 'text-gray-300 cursor-not-allowed line-through'
                  : dateIsSelected(day, monthOffset)
                    ? 'text-gray-700 cursor-pointer bg-[#F0A202]'
                    : dateIsBetween(day, monthOffset) || shouldShowPreviewRange(day, monthOffset)
                      ? 'text-gray-700 cursor-pointer bg-orange-100'
                      : 'text-gray-700 cursor-pointer hover:bg-orange-100'
              }`}
              onClick={() => onDateClick(day, monthOffset, currentMonth)}
              onMouseOver={() => onMouseHover(day, monthOffset)}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
