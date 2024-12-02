import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

const CarouselComponent = () => {
  const images = [
    "/images/photo-1.jpg",
    "/images/photo-2.jpg",
    "/images/photo-3.jpg",
    "/images/photo-4.jpg",
    "/images/photo-5.jpg",
    "/images/photo-6.jpg",
    "/images/photo-7.jpg",
    "/images/photo-8.jpg",
    "/images/photo-9.jpg",
    "/images/photo-10.jpg",
    "/images/photo-11.jpg",
    "/images/photo-12.jpg",
    "/images/photo-13.jpg",
    "/images/photo-14.jpg",
    "/images/photo-15.jpg",
    "/images/photo-16.jpg",
    "/images/photo-17.jpg",
    "/images/photo-18.jpg",
    "/images/photo-19.jpg",
    "/images/photo-20.jpg",
    "/images/photo-21.jpg",
    "/images/photo-22.jpg",
    "/images/photo-23.jpg",
    "/images/photo-24.jpg",
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full h-auto px-4 md:px-10"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4"
          >
            <div className="p-1">
              <Card className="h-full">
                <CardContent className="flex items-center justify-center p-0 h-full">
                  <div className="relative w-full h-80">
                    <img
                      src={image}
                      alt={`carousel-image-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
};

export default CarouselComponent;
