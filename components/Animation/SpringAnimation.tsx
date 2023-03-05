import { AnimationProps } from "@/types/Animation";
import React, { useEffect, useState } from "react";
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
    if (show) {
      setVisible(true);
      api.start({
        opacity: 1,
        onRest: () => {
          animationCallbackFunctions?.onEndShow?.();
        },
      });
      animationCallbackFunctions?.onStartShow?.();
    }
    if (!show) {
      api.start({
        opacity: 0,
        onRest: () => {
          setVisible(false);
          animationCallbackFunctions?.onEndHide?.();
        },
      });
      animationCallbackFunctions?.onStartHide?.();
    }
  }, [show, api, animationCallbackFunctions]);

  return visible ? (
    <animated.div style={{ ...springs }}>{children}</animated.div>
  ) : null;
};

export default SpringAnimation;
