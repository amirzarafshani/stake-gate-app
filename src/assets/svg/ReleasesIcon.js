import * as React from "react";
import Svg, { Circle, Rect, Path, G } from "react-native-svg";

export default function SvgComponent(props) {
  return (
    <Svg {...props} width="32" height="32" viewBox="0 0 24 28">
      <G
        fill="none"
        stroke={props.sroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="flex items-center justify-center"
      >
        <Path d="M9.724 12h7"></Path>
        <Path d="M7.276 8h9.447M7 18.43h4l4.45 2.96a1 1 0 001.55-.83v-2.13a4.724 4.724 0 005-5v-6a4.724 4.724 0 00-5-5H7a4.724 4.724 0 00-5 5v6a4.724 4.724 0 005 5z"></Path>
      </G>
    </Svg>
  );
}
