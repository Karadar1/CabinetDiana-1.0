import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

const SPRING_OPTIONS = {
  mass: 1.5,
  stiffness: 500,
  damping: 100,
};

type ButtonProps = {
  children: string;
  mobile?: boolean; // when true, button takes ~80% of viewport width
  href?: string; // if set, navigate here on click
};

const Button = ({ children, mobile = false, href }: ButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, SPRING_OPTIONS);
  const ySpring = useSpring(y, SPRING_OPTIONS);

  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  // Parallax only for mouse pointers (desktop/laptop). Touch gets normal tap.
  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    if (e.pointerType !== "mouse") return;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const xPct = offsetX / rect.width;
    const yPct = 1 - offsetY / rect.height;

    const newY = 12 + yPct * 12;
    const newX = 12 + xPct * 12;

    x.set(newX);
    y.set(-newY);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (!href) return;
    // If it's an internal route, use SPA navigation; otherwise fall back to full load
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      className={
        mobile
          ? "h-20 w-[80vw] bg-blue-700"
          : "h-20 w-full max-w-40 md:max-w-50 bg-blue-700"
      }
    >
      <motion.button
        ref={ref}
        type="button"
        style={{ transform }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handleReset}
        onPointerDown={handleReset}
        onPointerUp={handleReset}
        whileTap={reduceMotion ? {} : { scale: 0.98 }}
        onClick={handleClick}
        className="group flex h-full w-full items-center justify-between border-2 border-black bg-white px-8 text-xl font-semibold"
        // let screen readers know this behaves like a link when href is set
        aria-haspopup={href ? undefined : "false"}
        aria-label={href ? children : undefined}
      >
        <Copy>{children}</Copy>
        <Arrow />
      </motion.button>
    </div>
  );
};

const Copy = ({ children }: { children: string }) => {
  return (
    <span className="relative overflow-hidden">
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
};

const Arrow = () => (
  <div className="pointer-events-none flex h-6 w-6 overflow-hidden text-2xl">
    <FiArrowRight className="shrink-0 -translate-x-full text-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
    <FiArrowRight className="shrink-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
  </div>
);

export default Button;
