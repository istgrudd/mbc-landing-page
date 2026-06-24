import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ images = [], alt = "" }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <img src={images[0]} alt={alt} loading="lazy" className="aspect-[16/10] w-full object-cover" />
      </div>
    );
  }

  const go = (n) => setI((prev) => (prev + n + images.length) % images.length);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]"
      role="group"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="relative aspect-[16/10] w-full">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={i}
            src={images[i]}
            alt={`${alt} (${i + 1}/${images.length})`}
            loading="lazy"
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
          />
        </AnimatePresence>
      </div>

      <button
        type="button" onClick={() => go(-1)} aria-label="Previous image"
        className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button" onClick={() => go(1)} aria-label="Next image"
        className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        {images.map((_, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Go to image ${n + 1}`}
            aria-current={n === i}
            onClick={() => setI(n)}
            className="group grid h-11 w-9 place-items-center"
          >
            <span
              className={`h-2 w-2 rounded-full transition ${
                n === i ? "bg-white" : "bg-white/45 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
