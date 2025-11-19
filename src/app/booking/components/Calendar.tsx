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
  const [bookedDates, setBookedDates] = useState<{ checkInDate: Date, checkOutDate: Date }[]>([])
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
        return {
          checkInDate: new Date(new Date(reservation.checkInDate).setHours(0, 0, 0, 0)),
          checkOutDate: new Date(new Date(reservation.checkOutDate).setHours(0, 0, 0, 0))
        }
      });

      console.log(newBookedDates);

      setBookedDates((prev: { checkInDate: Date; checkOutDate: Date; }[]) => {
        const allDates = [...prev, ...newBookedDates];
        const uniqueDates = allDates.filter(
          (date, index, self) =>
            index === self.findIndex(
              (d) =>
                d.checkInDate.getTime() === date.checkInDate.getTime() &&
                d.checkOutDate.getTime() === date.checkOutDate.getTime()
            )
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

    const sortedRanges = [...bookedDates].sort(
      (a, b) => a.checkInDate.getTime() - b.checkInDate.getTime()
    );

    const firstRangeAfterCheckIn = sortedRanges.find(
      (range) => range.checkInDate.getTime() > checkInDate.getTime()
    );

    if (!firstRangeAfterCheckIn) {
      return false;
    }

    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    return normalizedDate.getTime() > firstRangeAfterCheckIn.checkInDate.getTime();
  }

  function isDateBooked(date: Date): boolean {
    return bookedDates.some(bookedDate =>
      bookedDate.checkInDate.getTime() < date.getTime() && bookedDate.checkOutDate.getTime() > date.getTime()
    );
  }

  function isDisabled(date: Date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
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

  function dateIsSelected(date: Date) {
    return date.toDateString() === checkInDate?.toDateString() || date.toDateString() === checkOutDate?.toDateString()
  }

  function dateIsBetween(date: Date) {
    if (!checkInDate || !checkOutDate) return false
    return date.getTime() >= checkInDate.getTime() && date.getTime() <= checkOutDate.getTime()
  }

  function onMouseHover(date: Date) {
    if (!checkInDate || checkOutDate) {
      setHoveredDate(null)
      return;
    }

    setHoveredDate(date)
  }

  function shouldShowPreviewRange(date: Date): boolean {
    if (!checkInDate || !hoveredDate || checkOutDate) return false
    return date > checkInDate && date <= hoveredDate
  }

  function dateIsOnlyAvailableForCheckIn(date: Date): boolean {
    return bookedDates.some(
      (bookedDate) => bookedDate.checkOutDate.getTime() === date.getTime()
    );
  }

  function dateIsOnlyAvailableForCheckOut(date: Date): boolean {
    return bookedDates.some(
      (bookedDate) => bookedDate.checkInDate.getTime() === date.getTime()
    );
  }

  function calculateClasses(date: Date) {
    const baseString = 'w-8 h-8 flex items-center justify-center text-sm font-medium rounded'

    if (loading) {
      return `${baseString} skeleton`
    }
    
    if (isDisabled(date)) {
      return `${baseString} text-gray-300 cursor-not-allowed line-through`
    }
    
    if (dateIsSelected(date)) {
      return `${baseString} text-gray-700 cursor-pointer bg-[#F0A202]`
    }
    
    if (dateIsBetween(date) || shouldShowPreviewRange(date)) {
      return `${baseString} text-gray-700 cursor-pointer bg-orange-100`
    }
    
    if (dateIsOnlyAvailableForCheckIn(date)) {
      return `${baseString} text-[#7ED957] cursor-pointer hover:bg-orange-100`
    }
    
    if (dateIsOnlyAvailableForCheckOut(date)) {
      const checkoutString = `${baseString} text-[#6ECFF6] hover:bg-orange-100`

      if (!checkInDate || checkOutDate || checkInDate.getTime() > date.getTime()) {
        return `${checkoutString} cursor-not-allowed`
      }

      return `${checkoutString} cursor-pointer`
    }
    
    return `${baseString} text-gray-700 cursor-pointer hover:bg-orange-100`
  }

  function clickIsDisabled(date: Date) {
    if (isDisabled(date)) {
      return true;
    }

    if (dateIsOnlyAvailableForCheckOut(date) && (!checkInDate || checkOutDate || checkInDate.getTime() > date.getTime())) {
      return true;
    }

    return false;
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
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, day)
          return (
            <div
              key={day}
              className={calculateClasses(date)}
              onClick={() => !clickIsDisabled(date) && onDateClick(day, monthOffset, currentMonth)}
              onMouseOver={() => onMouseHover(date)}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
