import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Check } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

export default function Features() {
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
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  const features: Feature[] = [
    {
      title: "Student Authentication",
      description:
        "Secure login using your student ID and password ensures only eligible students can participate.",
    },
    {
      title: "Mobile Responsive",
      description:
        "Vote from any device - desktop, tablet, or mobile phone, anytime during the election period.",
    },
    {
      title: "Instant Verification",
      description:
        "Receive immediate confirmation that your vote has been recorded successfully.",
    },
    {
      title: "Detailed Analytics",
      description:
        "Access comprehensive voting statistics and turnout data after the election concludes.",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="w-full py-12 md:py-24 lg:py-32"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            variants={containerVariants}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Designed for the Modern Campus
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines security, accessibility, and transparency
                to create the ideal voting experience for Epicurious Institute.
              </p>
            </motion.div>
            <motion.ul className="grid gap-6" variants={containerVariants}>
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            variants={imageVariants}
          >
            <img
              src="/modern-campus.jpg"
              alt="Platform Features"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              width={550}
              height={550}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
