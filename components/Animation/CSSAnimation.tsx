import { AnimationDetailedProps } from "@/types/Animation";
import React, { useEffect, useState } from "react";

const CSSAnimation = ({
  show,
  children,
  animationcss,
  animationCallbackFunctions,
}: AnimationDetailedProps) => {
  const [visible, setVisible] = useState(show);

  const onAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (show) {
      animationCallbackFunctions?.onEndShow?.();
    } else {
      setVisible(false);
      animationCallbackFunctions?.onEndHide?.();
    }
  };

  useEffect(() => {
    if (show) {
      setVisible(true);
      animationCallbackFunctions?.onStartShow?.();
    } else {
      animationCallbackFunctions?.onStartHide?.();
    }
  }, [show, animationCallbackFunctions]);

  return visible ? (
    <div
      onAnimationEnd={(e) => onAnimationEnd(e)}
      css={() => animationcss(show)}
    >
      {children}
    </div>
  ) : null;
};

export default CSSAnimation;
