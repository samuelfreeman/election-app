import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "../ui/button";

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
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

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-12 md:py-20 lg:py-24 xl:py-32 overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Blurred background image - only visible on desktop */}
      <div className="absolute inset-0 hidden lg:block">
        <img
          src="/header-banner-desktop.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm"></div>
      </div>

      {/* Gradient background for mobile */}
      <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-background to-muted/30"></div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            variants={containerVariants}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Your Voice Matters at Epicurious Institute
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Secure, transparent, and accessible voting platform designed for
                the Epicurious Institute community. Make your voice heard in
                campus elections.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Link to="/register">Register to Vote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/candidates">View Candidates</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.img
            src="/institute-header.jpg"
            alt="Epicurious Institute Voting"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-lg"
            width={550}
            height={550}
            variants={imageVariants}
          />
        </div>
      </div>
    </motion.section>
  );
}
