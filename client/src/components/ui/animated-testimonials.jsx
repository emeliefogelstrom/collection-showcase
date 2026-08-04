"use client";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";
import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const AnimatedTestimonials = ({ images, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [fullImage, setFullImage] = useState(null); // <-- ny state

  // Funktioner för att navigera mellan bilder
  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };

  // Memoize randomRotateY för animationen
  const randomRotateY = useMemo(() => {
    return images.map(() => Math.floor(Math.random() * 21) - 10);
  }, [images]);

  // Autoplay logik
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <>
      <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-8 md:px-8 lg:px-12 py-2">
        <div className="relative grid grid-cols-1 md:grid-cols-1 gap-1">
          <div>
            <div className="relative h-[30vh] md:h-96 w-50">
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={image}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY[index],
                    }}
                    animate={{
                      opacity: index === active ? 1 : 0.7,
                      scale: index === active ? 1 : 0.95,
                      z: index === active ? 0 : -100,
                      rotate: index === active ? 0 : randomRotateY[index],
                      zIndex:
                        index === active ? 999 : images.length + 2 - index,
                      y: index === active ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY[index],
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={image}
                      alt="Testimonial Image"
                      draggable={false}
                      className="w-full h-[30vh] md:h-full rounded-2xl object-cover object-center cursor-pointer"
                      onClick={() => setFullImage(image)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-center gap-4 px-4 z-20 pointer-events-auto md:static md:justify-center">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal för fullstor bild */}
      <AnimatePresence>
        {fullImage && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center p-4"
            onClick={() => setFullImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative"
              onClick={(e) => e.stopPropagation()} // hindra stängning om man klickar på bilden
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={fullImage}
                alt="Full Image"
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              <button
                className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-2 hover:bg-opacity-90 transition"
                onClick={() => setFullImage(null)}
              >
                <IconX className="text-white w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
