export function calculateNights(checkInDate: Date, checkOutDate: Date) {
  return checkOutDate.getDate() - checkInDate.getDate()
}

export function calculateTotalPrice(nights: number) {
  return {totalPrice: nights * 22500, pricePerNight: 22500}; //TODO: price per night
}

export function toLocalISOString(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
}