import { useEffect, useState } from "react";
import CarouselComponent from "./CarouselComponent";

const Hero = () => {
  const targetDate = new Date("2024-12-12T03:12:00");
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
  });

  return (
    <section className="w-full h-dvh flex justify-center items-center bg-gradient-to-b from-[#3ED484] from-30% to-[#083051] to-70% text-white overflow-hidden">
      <div className="w-full h-auto">
        <div className="text-center my-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#CECECE] to-[#E8E8E8] bg-clip-text text-transparent">
            YOUR BIRTHDAY COUNTDOWN!!!!!!!!!!
          </h1>
        </div>
        <CarouselComponent />
        <div className="p-4 mt-8 justify-center items-center flex flex-col">
          <h2 className="text-3xl mb-2 font-bold bg-gradient-to-b from-[#CECECE] to-[#E8E8E8] bg-clip-text text-transparent">
            Time Remaining :{" "}
          </h2>
          {timeLeft.days !== undefined ? (
            <div className="text-2xl flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="flex flex-row gap-4 justify-center">
                <p>{timeLeft.days} Days</p>
                <p>{timeLeft.hours} Hours</p>
              </div>
              <div className="flex flex-row gap-4 justify-center">
                <p>{timeLeft.minutes} Minutes</p>
                <p>{timeLeft.seconds} Seconds</p>
              </div>
            </div>
          ) : (
            <p className="text-2xl">Happy Birthday!</p>
          )}
          <div className="text-center mb-10">
            <p className="text-lg sm:text-xl md:text-2xl mt-8 font-bold bg-gradient-to-b from-[#FF4C4C] via-[#FF66B2] to-[#CECECE] bg-clip-text text-transparent">
              I LOOOOOOOVEEEEEEEEEEE YOUUUUUUUUUUUUUUUUUUU
            </p>
            <p className="text-3xl sm:text-4xl mt-4 mb-10">🫂❤‍🩹🎀</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
