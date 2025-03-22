import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction, Home, Mail } from "lucide-react";

interface UnderDevelopmentProps {
  title?: string;
  description?: string;
  estimatedCompletion?: string;
  contactEmail?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

export default function UnderDevelopment({
  title = "Page Under Development",
  description = "We're working hard to bring you this feature soon. Thank you for your patience.",
  estimatedCompletion,
  contactEmail = "info@epicurious.edu",
  showHomeButton = true,
  showBackButton = true,
}: UnderDevelopmentProps) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="mb-6 rounded-full bg-primary/10 p-5"
        >
          <Construction className="h-12 w-12 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-3 text-3xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 text-muted-foreground"
        >
          {description}
        </motion.p>

        {estimatedCompletion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 rounded-md bg-muted p-3"
          >
            <p className="text-sm font-medium">
              Estimated completion:{" "}
              <span className="text-primary">{estimatedCompletion}</span>
            </p>
          </motion.div>
        )}

        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{
              duration: 1.5,
              delay: 0.8,
              ease: "easeInOut",
            }}
            className="h-full bg-primary"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0"
        >
          {showBackButton && (
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}

          {showHomeButton && (
            <Button
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          )}
        </motion.div>

        {contactEmail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            <p className="flex items-center justify-center gap-1">
              <Mail className="h-4 w-4" />
              Questions? Contact us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-primary hover:underline"
              >
                {contactEmail}
              </a>
            </p>
          </motion.div>
        )}

        {/* Animated construction elements */}
        <div className="relative mt-12 h-32 w-full">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute left-1/4 top-0"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9L12 3L22 9V20H2V9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 20V13C16 11.9391 15.5786 10.9217 14.8284 10.1716C14.0783 9.42143 13.0609 9 12 9C10.9391 9 9.92172 9.42143 9.17157 10.1716C8.42143 10.9217 8 11.9391 8 13V20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute left-1/2 top-1/4 -translate-x-1/2"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22V2M17 7L12 2L7 7M22 12H2M17 17L12 22L7 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="absolute right-1/4 top-0"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 6L4 16M16 4L18 6L22 2M4.5 19.5L2 22M8 16L10 18L8 20L6 18L8 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8L16 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 14L21 17L17 21L14 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
