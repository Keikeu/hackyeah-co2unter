import React, { useEffect, useRef } from "react";
import Typography from "commons/components/Typography";
import T from "prop-types";
import { motion, useAnimation, useInView } from "framer-motion";

const squareVariants = {
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0.95, y: 20 },
};

function SectionHeader({ children }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" variants={squareVariants}>
      <Typography variant="h3" marginY={32}>
        {children}
      </Typography>
    </motion.div>
  );
}

SectionHeader.propTypes = {
  children: T.oneOfType([T.object, T.string, T.node]),
};

export default SectionHeader;
