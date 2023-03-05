import { AnimationProps } from "@/types/Animation";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";

const FramerMotionAnimation = ({
  show,
  children,
  animationCallbackFunctions,
}: AnimationProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          onAnimationStart={(def: any) => {
            if (def.opacity === 1) {
              animationCallbackFunctions?.onStartShow?.();
            } else {
              animationCallbackFunctions?.onStartHide?.();
            }
          }}
          onAnimationComplete={(def: any) => {
            if (def.opacity === 1) {
              animationCallbackFunctions?.onEndShow?.();
            } else {
              animationCallbackFunctions?.onEndHide?.();
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FramerMotionAnimation;
