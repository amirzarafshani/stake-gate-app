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
        <Path d="M18.04 13.55a2.008 2.008 0 00-.6 1.63 2.132 2.132 0 002.16 1.87h1.9v1.19A3.768 3.768 0 0117.74 22H6.26a3.768 3.768 0 01-3.76-3.76v-6.73a3.768 3.768 0 013.76-3.76h11.48a3.768 3.768 0 013.76 3.76v1.44h-2.02a1.993 1.993 0 00-1.44.6z"></Path>
        <Path d="M2.5 12.41V7.84a2.848 2.848 0 011.84-2.67l7.94-3a1.9 1.9 0 012.57 1.776v3.8M22.559 13.97v2.06a1.027 1.027 0 01-1 1.02h-1.96a2.132 2.132 0 01-2.16-1.87 2.008 2.008 0 01.6-1.63 1.993 1.993 0 011.44-.6h2.08a1.027 1.027 0 011 1.02zM7 12h7"></Path>
      </G>
    </Svg>
  );
}
