import ImageCarousel from "@/components/ImageCarousel";
import BookingCard from "@/components/BookingCard";
import Map from "@/components/Map";

export default function Home() {
  // Sample images for the carousel
  const carouselImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop'
  ];

  return (
    <div className="font-sans min-h-screen">
      <section className="w-full overflow-x-clip overflow-y-visible">
        <ImageCarousel
          images={carouselImages}
          height="h-[90vh]"
          className="w-full"
        >
          <BookingCard />
        </ImageCarousel>
      </section>
      <Map />
    </div>
  );
}
