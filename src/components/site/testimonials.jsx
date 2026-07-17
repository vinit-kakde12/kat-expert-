import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star, Quote, PlayCircle } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { Reveal, SectionHeading } from "./section";

function Testimonials() {
  const [index, setIndex] = useState(0);
  const perView = 3;
  const max = Math.max(1, TESTIMONIALS.length - perView + 1);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % max), 4000);
    return () => clearInterval(t);
  }, [max]);

  return (
    // Reduced global component section padding from py-20 sm:py-28 to py-16 sm:py-20
    <section id="testimonials" className="bg-secondary/40 py-16 sm:py-20">
      {/* Added max-w-6xl mx-auto to maintain layout symmetry across 100% full-width viewports */}
      <div className="container-x max-w-6xl mx-auto">
        
        {/* Header Section */}
        <Reveal>
          <SectionHeading
            eyebrow="Student Reviews"
            title={
              <>
                Loved by <span className="text-gradient-accent">students & parents</span>
              </>
            }
            subtitle="Hear it straight from the people who lived the KAT Expert journey."
          />
        </Reveal>

        {/* Testimonials Carousel */}
        {/* Reduced top spacing gap context from mt-12 to mt-8 */}
        <div className="mt-8 overflow-hidden">
          <motion.div
            className="flex gap-4" // Tightened spacing gaps from gap-6 to gap-4
            animate={{
              x: `calc(-${index} * (100% / ${perView}) - ${index} * 1rem / ${perView})`, // Balanced layout calculations for gap-4 (1rem)
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                // Downscaled internal card padding from p-6 to p-5
                className="flex w-[calc((100%-2rem)/1)] shrink-0 flex-col rounded-xl border border-border bg-card p-5 shadow-soft sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
              >
                {/* User Meta Data */}
                <div className="flex items-center gap-3 border-b border-border pb-3.5">
                  {t.image && (
                    // Scaled image avatar parameters down from h-12 w-12 to h-10 w-10
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white border border-border">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <span>
                    <span className="block text-xs font-bold text-navy">{t.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{t.college}</span>
                  </span>
                </div>

                {/* Quote Icon & Star Ratings */}
                <div className="mt-3 flex items-center justify-between">
                  {/* Reduced quote icon sizing from h-7 w-7 to h-5 w-5 */}
                  <Quote className="h-5 w-5 text-accent/40" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                {/* Shifted text size from text-sm to text-xs */}
                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-foreground/80 line-clamp-4">
                  "{t.text}"
                </p>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-5 flex justify-center gap-1.5">
          {Array.from({ length: max }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-5 bg-accent" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Video Testimonials Call to Action */}
        <Reveal>
          {/* Compressed callout padding to p-5 and margin gap to mt-8 */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-navy p-5 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <PlayCircle className="h-8 w-8 shrink-0 text-accent" />
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  Watch video testimonials
                </h3>
                <p className="text-xs text-white/65">
                  See our toppers share their full KAT Expert journey.
                </p>
              </div>
            </div>
            <Link
              to="/about?tab=Gallery&subtab=videos"
              className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors"
            >
              Watch Now
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export { Testimonials };