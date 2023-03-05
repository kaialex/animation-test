import Head from "next/head";
import PopUp from "@/components/PopUp/popUp";
import { css } from "@emotion/react";
import { useState } from "react";

const animationVariantsList = ["CSS", "Spring", "FramerMotion"] as const;

export type AnimationVariantsType = typeof animationVariantsList[number];

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [animationVariants, setAnimationVariants] =
    useState<AnimationVariantsType>("CSS");

  return (
    <>
      <Head>
        <title>Animation-Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        css={css`
          width: 100%;
          height: 100vh;
          background-color: #f5f5f5;
        `}
      >
        {animationVariantsList.map((animationVariant) => (
          <div key={animationVariant}>
            <button
              css={css`
                padding: 5px;
                margin: 10px;
              `}
              onClick={() => {
                setAnimationVariants(animationVariant);
                setShowPopup(true);
              }}
            >
              OPEN:{animationVariant}
            </button>
          </div>
        ))}
        <PopUp
          type={animationVariants}
          show={showPopup}
          animationCallbackFunctions={{
            onStartShow: () => console.log("onStartShow"),
            onEndShow: () => console.log("onEndShow"),
            onStartHide: () => console.log("onStartHide"),
            onEndHide: () => console.log("onEndHide"),
          }}
        >
          <button
            onClick={() => setShowPopup(false)}
            css={css`
              padding: 5px;
              margin: 10px;
            `}
          >
            CLOSE
          </button>
        </PopUp>
      </main>
    </>
  );
}
