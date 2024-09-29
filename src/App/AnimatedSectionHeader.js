import React, { useRef } from "react";
import Typography from "commons/components/Typography";
import T from "prop-types";
import { motion, useScroll, useTransform } from "framer-motion";

function AnimatedSectionHeader({ children }) {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: headerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div ref={headerRef} style={{ y: parallaxY, opacity: opacity, margin: "240px 0 160px" }}>
      <Typography variant="h3">{children}</Typography>
    </motion.div>
  );
}

AnimatedSectionHeader.propTypes = {
  children: T.oneOfType([T.object, T.string, T.node]),
};

export default AnimatedSectionHeader;
