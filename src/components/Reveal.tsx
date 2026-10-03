"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function Reveal({
    children,
    delay = 0,
    className,
    ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
