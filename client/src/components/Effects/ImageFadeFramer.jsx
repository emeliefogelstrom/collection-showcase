import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2.2, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 2.2, ease: "easeIn" } },
};

export default function ImageSlideshowDynamic() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const modules = import.meta.glob("../../images/patches/*.png", {
      eager: true,
    });
    const imgs = Object.values(modules).map((mod) => mod.default || mod);
    setImages(imgs);
  }, []);

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images.length) return <p>Laddar bilder...</p>;

  return (
    <div className="relative w-64 md:w-96 h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          className="absolute inset-0 w-full h-full object-cover"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        />
      </AnimatePresence>
    </div>
  );
}
