import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "../ui/button";

interface ElectionEvent {
  title: string;
  startDate: string;
  positions: string;
}

export default function CallToAction() {
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

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const listItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const upcomingElections: ElectionEvent[] = [
    {
      title: "Student Council Elections",
      startDate: "April 15, 2025",
      positions: "President, Vice President, Secretary, Treasurer",
    },
    {
      title: "Department Representatives",
      startDate: "May 1, 2025",
      positions: "Representatives for each academic department",
    },
    {
      title: "Campus Improvement Referendum",
      startDate: "May 20, 2025",
      positions: "Vote on proposed campus facility improvements",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-2">
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.h2
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight"
              variants={itemVariants}
            >
              Ready to make your voice heard?
            </motion.h2>
            <motion.p
              className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed"
              variants={itemVariants}
            >
              Join thousands of Epicurious Institute students who are shaping
              the future of our campus through democratic participation.
            </motion.p>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              variants={itemVariants}
            >
              <Button asChild size="lg" variant="secondary">
                <Link to="/login?redirect=dashboard">Vote Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="#!">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.h3 className="text-xl font-bold" variants={itemVariants}>
              Upcoming Elections
            </motion.h3>
            <motion.ul className="space-y-4" variants={listVariants}>
              {upcomingElections.map((election, index) => (
                <motion.li
                  key={index}
                  className="rounded-lg bg-primary-foreground/10 p-4"
                  variants={listItemVariants}
                >
                  <h4 className="font-bold text-primary-foreground">
                    {election.title}
                  </h4>
                  <p className="text-sm text-primary-foreground/80">
                    Starting: {election.startDate}
                  </p>
                  <p className="text-sm text-primary-foreground/80">
                    Positions: {election.positions}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
