import React, { useState } from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import { useKeyPress } from "commons/util/useKeyPress";
import { useLockBodyScroll } from "commons/util/useLockBodyScroll";
import { BREAKPOINTS } from "commons/util/breakpoints";
import { AnimatePresence, motion } from "framer-motion";
import {
  FloatingFocusManager,
  FloatingOverlay,
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useId,
} from "@floating-ui/react";

const Box = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-above);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 32px;

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 0;
  }
`;

const Backdrop = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--backdrop);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled(motion.div)`
  background-color: var(--neutral-200);
  border-radius: var(--border-radius-3);
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  /* overflow-y: auto; */
  z-index: var(--z-index-above);

  @media (max-width: ${BREAKPOINTS.small}) {
    border-radius: var(--border-radius-0);
  }
`;

function Modal({ className, onClose, content }) {
  const [isOpen, setIsOpen] = useState(true);
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  // const dismiss = useDismiss(context, {
  //   outsidePressEvent: "mousedown",
  // });
  const role = useRole(context);

  // useLockBodyScroll();
  // useKeyPress("Escape", closeModal);

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }
  const { getFloatingProps } = useInteractions([click, role]);

  return (
    <AnimatePresence>
      {isOpen && (
        <FloatingFocusManager context={context}>
          <Box ref={refs.setFloating}>
            <FloatingOverlay lockScroll />
            <Backdrop
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
              }}
            />
            <Content
              className={className}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{
                duration: 0.2,
              }}
            >
              {typeof content === "function" ? content(closeModal) : content}
            </Content>
          </Box>
        </FloatingFocusManager>
      )}
    </AnimatePresence>
  );
}

Modal.propTypes = {
  className: T.string,
  onClose: T.func.isRequired,
  content: T.oneOfType([T.object, T.string, T.node, T.func]).isRequired,
};

export default Modal;
