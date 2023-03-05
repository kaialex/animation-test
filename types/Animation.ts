import { SerializedStyles } from "@emotion/react";

export type AnimationProps = {
  show: boolean;
  children: React.ReactNode;
  animationCallbackFunctions?: {
    onStartShow?: () => unknown;
    onEndShow?: () => unknown;
    onStartHide?: () => unknown;
    onEndHide?: () => unknown;
  };
};

export type AnimationDetailedProps = AnimationProps & {
  animationcss: (show: boolean) => SerializedStyles;
};
