import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import SearchCard from "@/components/SearchCard";

export default function Home() {
  // Sample images for the carousel
  const carouselImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop'
  ];

  return (
    <div className="font-sans min-h-screen">
      {/* Hero Carousel Section */}
      <section className="w-full overflow-x-clip overflow-y-visible">
        <ImageCarousel
          images={carouselImages}
          height="h-[90vh]"
          className="w-full"
        >
          <SearchCard />
        </ImageCarousel>
      </section>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas lacus ac mattis luctus. Vivamus sed urna quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas augue sem, efficitur a porta et, blandit quis tortor. Etiam placerat pellentesque dapibus. Maecenas ultricies hendrerit varius. Fusce eros dui, ultricies non nunc et, porttitor lacinia nisi. Donec velit urna, auctor a dapibus eget, gravida in lectus. Proin fermentum finibus mi, cursus interdum enim interdum sit amet. Suspendisse et egestas libero, eu viverra nisl. Sed tempor arcu at ante euismod viverra. Aenean tortor diam, mollis vel odio a, tincidunt vehicula sem. Curabitur eget accumsan sapien. Etiam nunc mauris, aliquet id nulla varius, rhoncus imperdiet odio. Nam tincidunt vehicula eros, vel dictum magna posuere nec.

Nullam dapibus id tellus at varius. Phasellus a aliquet lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris ex nunc, tempus in auctor vitae, semper cursus justo. Nam condimentum a velit et scelerisque. Phasellus accumsan neque nec rhoncus tempus. Sed in erat velit.

Curabitur faucibus interdum ex nec hendrerit. Mauris dignissim tristique est et commodo. Etiam iaculis pulvinar lacinia. Praesent est magna, molestie eget lacus a, malesuada feugiat metus. Aliquam a mollis ipsum. Donec scelerisque, libero in finibus tempus, leo erat sagittis dui, nec volutpat felis nisl quis odio. Cras nulla libero, imperdiet sit amet congue eget, efficitur non felis. Sed sodales lectus metus, non pretium sem bibendum vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse nec interdum ligula.

Aliquam eget dignissim tortor. Curabitur ut vehicula justo, id interdum nibh. Pellentesque ut massa id dui ultrices fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus tincidunt lacinia. Vestibulum imperdiet sed mauris at tempor. Nulla tempor, metus quis condimentum sollicitudin, risus dolor cursus turpis, eu dignissim augue erat id nibh. Etiam non pulvinar magna. In commodo sem ut lectus pellentesque interdum.

Phasellus aliquam, velit non ultricies malesuada, nunc est imperdiet mi, et fermentum velit nunc et dolor. Nam nec nunc facilisis, volutpat turpis non, laoreet lacus. In hac habitasse platea dictumst. Cras in lobortis magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus tempus convallis efficitur. Vivamus varius mi at aliquam condimentum. Maecenas faucibus molestie turpis, in molestie mi molestie sed. Sed nec mauris a mi lobortis fringilla. Pellentesque ultrices libero ut ligula elementum lacinia in at nunc. Aliquam aliquet lectus lacinia, gravida dui vel, tincidunt nisi. Integer sed tortor erat. Sed a accumsan tellus. Donec pretium tempor tellus ac varius. Duis sit amet tempor ipsum, non dictum dolor. Sed vestibulum molestie ante eget convallis.
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
        </main>
        
        <footer className="flex gap-[24px] flex-wrap items-center justify-center p-8">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </div>
  );
}
