import React from "react";
import Typography from "commons/components/Typography";
import T from "prop-types";

function SectionHeader({ children }) {
  return (
    <Typography variant="h3" margin="200px 0 32px">
      {children}
    </Typography>
  );
}

SectionHeader.propTypes = {
  children: T.oneOfType([T.object, T.string, T.node]),
};

export default SectionHeader;
