import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeUnit {
  value: number;
  label: string;
}

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

export default function FlipCountdown({
  targetDate,
  className = "",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: "Months" },
    { value: 0, label: "Days" },
    { value: 0, label: "Hours" },
    { value: 0, label: "Minutes" },
    { value: 0, label: "Seconds" },
  ]);

  // Removed unused prevTimeLeft state

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return [
          { value: 0, label: "Months" },
          { value: 0, label: "Days" },
          { value: 0, label: "Hours" },
          { value: 0, label: "Minutes" },
          { value: 0, label: "Seconds" },
        ];
      }

      // Calculate months, days, hours, minutes, seconds
      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.44);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return [
        { value: months, label: "Months" },
        { value: days, label: "Days" },
        { value: hours, label: "Hours" },
        { value: minutes, label: "Minutes" },
        { value: seconds, label: "Seconds" },
      ];
    };

    // Update time left initially
    setTimeLeft(calculateTimeLeft());

    // Update time left every second
    const timer = setInterval(() => {
      // Removed setPrevTimeLeft as prevTimeLeft is no longer used
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, timeLeft]);

  return (
    <div
      className={`flex flex-wrap justify-center gap-2 md:gap-4 ${className}`}
    >
      {timeLeft.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-lg bg-primary-foreground/20 shadow-lg">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={unit.value}
                initial={{
                  opacity: 0,
                  rotateX: -90,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                animate={{
                  opacity: 1,
                  rotateX: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                exit={{
                  opacity: 0,
                  rotateX: 90,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4,
                }}
                style={{ transformOrigin: "bottom center" }}
                className="flex items-center justify-center"
              >
                <span className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  {unit.value.toString().padStart(2, "0")}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Divider line */}
            <div className="absolute left-0 top-1/2 w-full h-[1px] bg-primary-foreground/20"></div>

            {/* Reflection effect */}
            <div className="absolute left-0 top-0 w-full h-1/2 bg-primary-foreground/5"></div>
          </div>
          <span className="mt-1 text-xs text-primary-foreground/70">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
