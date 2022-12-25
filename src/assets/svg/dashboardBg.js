import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Mask, Rect, Path, G, Defs } from "react-native-svg";

export default function SvgComponent(props) {
  return (
    <Svg
      {...props}
      width={Dimensions.get("screen").width}
      height={30}
      viewBox="0 0 1440 30"
      preserveAspectRatio="none"
      className="absolute bottom-0"
      style={{
        // backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
      }}
    >
      <G mask='url("#SvgjsMask1125")' fill="none">
        <Path
          // d="M 0,0 C 144,3.6 432,18 720,18 C 1008,18 1296,3.6 1440,0L1440 30L0 30z"
          d="M 0,5 C 144,8.6 432,23.2 720,23 C 1008,22.8 1296,7.8 1440,4L1440 30L0 30z"
          fill="#000"
        ></Path>
      </G>
      <Defs>
        <Mask id="SvgjsMask1125">
          <Rect width="1440" height="30" fill="#ffffff"></Rect>
        </Mask>
      </Defs>
    </Svg>
  );
}
