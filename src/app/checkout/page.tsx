import Checkout from '../../components/stripeCheckout'

export default function Page({ searchParams }: {
  searchParams: { reservationId: string }
}) {
  const reservationId = parseInt(searchParams.reservationId)

  return (
    <div id="checkout">
      <Checkout reservationId={reservationId} />
    </div>
  )
}