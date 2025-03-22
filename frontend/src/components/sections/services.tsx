import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { ShieldCheck, Vote, Users, Award, BarChart3 } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const services: ServiceItem[] = [
    {
      title: "Secure Voting",
      description:
        "End-to-end encryption and secure authentication ensure your vote remains confidential and tamper-proof.",
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    },
    {
      title: "Easy Participation",
      description:
        "Simple registration and voting process designed for all students, accessible from any device.",
      icon: <Vote className="h-10 w-10 text-primary" />,
    },
    {
      title: "Candidate Profiles",
      description:
        "Detailed information about each candidate to help you make informed decisions.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Real-time Results",
      description:
        "Watch election results unfold in real-time with our transparent counting system.",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
    },
    {
      title: "Position Tracking",
      description:
        "Track all available positions and their candidates in one convenient location.",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    // Function to check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Update on resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
  }, [services.length]);

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length
    );
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next slide
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };

  // Auto-advance carousel (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMobile) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, nextSlide]);

  return (
    <motion.section
      ref={ref}
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/30"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Services
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Epicurious Institute Voting Platform offers a comprehensive suite
              of features to ensure fair and accessible elections.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto mt-12 max-w-5xl">
          {/* Mobile Carousel with Touch Support */}
          {isMobile ? (
            <div
              className="relative overflow-hidden touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                  width: `${services.length * 100}%`,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset }) => {
                  const swipe = offset.x < -50 ? 1 : offset.x > 50 ? -1 : 0;
                  if (swipe === 1) nextSlide();
                  if (swipe === -1) prevSlide();
                }}
              >
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="w-full px-4"
                    variants={itemVariants}
                    style={{ width: `${100 / services.length}%` }}
                  >
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-4 rounded-full bg-primary/10 p-4">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === activeIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Desktop Carousel
            <div className="relative">
              <div className="flex overflow-hidden">
                <motion.div
                  className="flex transition-transform duration-300"
                  variants={containerVariants}
                  style={{
                    transform: `translateX(-${
                      (activeIndex * 100) / services.length
                    }%)`,
                  }}
                >
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-4"
                      variants={itemVariants}
                    >
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-4 rounded-full bg-primary/10 p-4">
                            {service.icon}
                          </div>
                          <h3 className="text-xl font-bold">{service.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full shadow-md hidden sm:block"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full shadow-md hidden sm:block"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Desktop Indicators */}
              <div className="flex justify-center mt-4 gap-1">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === activeIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
