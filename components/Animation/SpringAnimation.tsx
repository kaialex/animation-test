import { AnimationProps } from "@/types/Animation";
import React, { useCallback, useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

const SpringAnimation = ({
  show,
  children,
  animationCallbackFunctions,
}: AnimationProps) => {
  const [visible, setVisible] = useState(show);

  const [springs, api] = useSpring(() => {
    return {
      opacity: 0,
      config: {
        duration: 500,
      },
    };
  });

  useEffect(() => {
    if (show && !visible) {
      setVisible(true);
      api.start({
        opacity: 1,
        onRest: () => {
          animationCallbackFunctions?.onEndShow?.();
        },
      });
      animationCallbackFunctions?.onStartShow?.();
    }
    if (!show && visible) {
      api.start({
        opacity: 0,
        onRest: () => {
          setVisible(false);
          animationCallbackFunctions?.onEndHide?.();
        },
      });
      animationCallbackFunctions?.onStartHide?.();
    }
  }, [show, api, animationCallbackFunctions, visible]);

  return visible ? (
    <animated.div style={{ ...springs }}>{children}</animated.div>
  ) : null;
};

export default SpringAnimation;
