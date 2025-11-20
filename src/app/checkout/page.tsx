import Checkout from '../../components/stripeCheckout'

export default async function Page({ searchParams }: {
  searchParams: { reservationId: string }
}) {
  const { reservationId } = await searchParams

  return (
    <div id="checkout">
      <Checkout reservationId={parseInt(reservationId)} />
    </div>
  )
}