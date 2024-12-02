import { useEffect, useState } from "react";

const images = [
  "/images/photo1.png",
  "/images/photo2.png",
  "/images/photo3.png",
  "/images/photo4.png", // Add more images if needed
];

const Home = () => {
  const targetDate = new Date("2024-12-25T00:00:00"); // Set the birthday date
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({});
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-4xl h-96 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Grid */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 p-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Birthday ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Birthday Countdown</h1>
            {timeLeft.days !== undefined ? (
              <div className="text-2xl space-y-2">
                <p>{timeLeft.days} Days</p>
                <p>{timeLeft.hours} Hours</p>
                <p>{timeLeft.minutes} Minutes</p>
                <p>{timeLeft.seconds} Seconds</p>
              </div>
            ) : (
              <p className="text-2xl">Happy Birthday!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const Hero = () => {
  const [currentIndex, setcurrentIndex] = useState(1);
  const [hasClicked, sethasClicked] = useState(false);
  const [loadedImages, setloadedImages] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  const totalImages = 4;

  const handleImgLoad = () => {
    setloadedImages((prev) => prev + 1);
  };

  const nextImgRef = useRef(null);

  const upcomingImgIndex = (currentIndex % totalImages) + 1;

  const getImgSrc = (index) => `images/photo-${index}.png`;

  const handleMiniImgClick = () => {
    sethasClicked(true);
    setcurrentIndex(upcomingImgIndex);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (loadedImages === totalImages - 1) {
      setisLoading(false);
    }
  });

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-img", { visibility: "visible" });

        gsap.to("#next-img", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextImgRef.current.play(),
        });

        gsap.from("#current-img", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#img-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#img-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#img-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh overflow-hidden bg-violet-50 ">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div
        id="img-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniImgClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <img
                ref={nextImgRef}
                src={getImgSrc(upcomingImgIndex)}
                onLoad={handleImgLoad}
                id="current-img"
                className="size-64 origin-center scale-150 object-cover object-center"
              />
            </div>
          </div>

          <img
            ref={nextImgRef}
            src={getImgSrc(currentIndex)}
            id="next-img"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoad={handleImgLoad}
          />

          <img
            src={getImgSrc(currentIndex === totalImages - 1 ? 1 : currentIndex)}
            onLoad={handleImgLoad}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
