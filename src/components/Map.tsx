export default function Map() {
  return (
    <div className="w-[95%] h-[450px] border rounded-lg overflow-hidden mx-auto my-10">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.175850911294!2d17.841180377043912!3d46.087472091636776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476807977c273aa5%3A0x2b9d3b6cca443413!2zRMOpenNhdsWxIFZlbmTDqWdow6F6!5e0!3m2!1shu!2shu!4v1759223152467!5m2!1shu!2shu"
        style={{ border: 0, width: '100%', height: '100%' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  )
}
