import CSSAnimation from "@/components/Animation/CSSAnimation";
import FramerMotionAnimation from "@/components/Animation/FramerMotionAnimation";
import ReactTransitionAnimation from "@/components/Animation/ReactTransitionAnimation";
import SpringAnimation from "@/components/Animation/SpringAnimation";
import { AnimationVariantsType } from "@/pages";
import { AnimationProps } from "@/types/Animation";
import { css, keyframes } from "@emotion/react";
import React from "react";

type PopUpProps = {
  type: AnimationVariantsType;
  children: React.ReactNode;
} & AnimationProps;

const PopUp = ({
  type,
  children,
  animationCallbackFunctions,
  show,
}: PopUpProps) => {
  if (type === "CSS") {
    return (
      <CSSAnimation
        show={show}
        animationCallbackFunctions={animationCallbackFunctions}
        animationcss={styles.popUpAnimation}
      >
        <div css={styles.background}>
          <div css={styles.popUp}>{children}</div>
        </div>
      </CSSAnimation>
    );
  } else if (type === "Spring") {
    return (
      <SpringAnimation
        show={show}
        animationCallbackFunctions={animationCallbackFunctions}
      >
        <div css={styles.background}>
          <div css={styles.popUp}>{children}</div>
        </div>
      </SpringAnimation>
    );
  } else if (type === "FramerMotion") {
    return (
      <FramerMotionAnimation
        show={show}
        animationCallbackFunctions={animationCallbackFunctions}
      >
        <div css={styles.background}>
          <div css={styles.popUp}>{children}</div>
        </div>
      </FramerMotionAnimation>
    );
  } else if (type === "Transition") {
    return (
      <ReactTransitionAnimation
        show={show}
        animationCallbackFunctions={animationCallbackFunctions}
        animationcss={styles.popUpAnimation}
      >
        <div css={styles.background}>
          <div css={styles.popUp}>{children}</div>
        </div>
      </ReactTransitionAnimation>
    );
  } else {
    throw new Error("Invalid type");
  }
};

const keyframe = {
  fadeIn: keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `,
  fadeOut: keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `,
};

const styles = {
  background: css`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(30, 30, 30, 0.5);
  `,
  popUp: css`
    width: 60%;
    height: 60%;
    background-color: white;
    border-radius: 10px;
    border: 2px solid black;
    color: black;
    text-align: center;
    padding: 20px;
  `,

  popUpAnimation: (show: boolean) => css`
    animation: 2s ease-in-out 0s 1 normal forwards running
      ${show ? keyframe.fadeIn : keyframe.fadeOut};
  `,
};

export default PopUp;
