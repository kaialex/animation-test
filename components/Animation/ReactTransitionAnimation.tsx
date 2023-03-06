import { AnimationDetailedProps, AnimationProps } from "@/types/Animation";
import React, { useRef } from "react";
import { CSSTransition, Transition } from "react-transition-group";

const ReactTransitionAnimation = ({
  show,
  children,
  animationcss,
  animationCallbackFunctions,
}: AnimationDetailedProps) => {
  const nodeRef = useRef(null);
  return (
    <Transition
      in={show}
      appear
      unmountOnExit
      timeout={2000}
      onEntering={() => animationCallbackFunctions?.onStartShow?.()}
      onEntered={() => animationCallbackFunctions?.onEndShow?.()}
      onExiting={() => animationCallbackFunctions?.onStartHide?.()}
      onExited={() => animationCallbackFunctions?.onEndHide?.()}
      nodeRef={nodeRef}
    >
      {(state) => (
        <div ref={nodeRef} style={styles[state]}>
          {children}
          <p>{state}</p>
        </div>
      )}
    </Transition>
  );
};

const styles = {
  entering: {
    opacity: 1,
    transition: "opacity 2s ease-in-out",
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 0,
    transition: "opacity 2s ease-in-out",
  },
  exited: {
    opacity: 0,
  },
  unmounted: {
    opacity: 0,
  },
};

export default ReactTransitionAnimation;
