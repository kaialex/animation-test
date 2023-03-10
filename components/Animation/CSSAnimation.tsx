import { AnimationDetailedProps } from "@/types/Animation";
import { Interpolation, Theme, SerializedStyles } from "@emotion/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const CSSAnimation = ({
  show,
  children,
  elementcss,
  animationcss,
  animationCallbackFunctions,
}: AnimationDetailedProps & { elementcss?: Interpolation<Theme> }) => {
  const [visible, setVisible] = useState(show);
  const animationId = useMemo(() => {
    return "animation-" + Math.random().toString(32).substring(2);
  }, []);

  const onAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (e.target.id !== animationId) return;
      if (show) {
        animationCallbackFunctions?.onEndShow?.();
      } else {
        setVisible(false);
        animationCallbackFunctions?.onEndHide?.();
      }
    },
    [animationCallbackFunctions, animationId, show]
  );

  useEffect(() => {
    if (show && !visible) {
      setVisible(true);
      animationCallbackFunctions?.onStartShow?.();
    }
    if (!show && visible) {
      animationCallbackFunctions?.onStartHide?.();
    }
  }, [show, animationCallbackFunctions, visible]);

  return visible ? (
    <div
      onAnimationEnd={(e) => onAnimationEnd(e)}
      css={[animationcss(show), elementcss]}
      id={animationId}
    >
      {children}
    </div>
  ) : null;
};

export default CSSAnimation;
