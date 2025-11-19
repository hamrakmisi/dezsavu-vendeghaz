export function calculateNights(checkInDate: Date, checkOutDate: Date) {
  return Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
}

export function calculateTotalPrice(nights: number, pricePerNight: number, discount: number | null) {
  if (!nights || !pricePerNight) return { totalPrice: null, discountAmount: null, finalPrice: null };
  const totalPrice = nights * pricePerNight;
  const discountAmount = discount ? totalPrice * (discount / 100) : null;
  const finalPrice = discountAmount ? totalPrice - discountAmount : totalPrice;

  return { totalPrice, discountAmount, finalPrice };
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