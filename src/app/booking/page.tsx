import BookingSummary from "./components/BookingSummary"

export default function page() {
  return (
    <>
      <div className="flex justify-center items-center text-2xl font-bold pt-40">
        Válassza ki az időpontot
      </div>
      <BookingSummary />
    </>
  )
}
