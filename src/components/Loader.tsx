export default function Loader({color}: {color: string}) {
  return (
    <div className="spinner-wave">
      <div className={`spinner-wave-dot bg-${color}`}></div>
      <div className={`spinner-wave-dot bg-${color}`}></div>
      <div className={`spinner-wave-dot bg-${color}`}></div>
      <div className={`spinner-wave-dot bg-${color}`}></div>
    </div>
  )
}
