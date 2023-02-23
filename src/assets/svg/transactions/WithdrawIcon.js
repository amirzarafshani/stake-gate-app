import * as React from "react";
import Svg, { Circle, Rect, Path, G } from "react-native-svg";

export default function SvgComponent(props) {
  return (
    <Svg
      {...props}
      width="44"
      height="44"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
    >
      <Circle r="12" cx="12" cy="12" fill="#e4643a" shape="circle"></Circle>
      <G transform="matrix(0.6,0,0,0.6,4.8001789093017555,5.400000381469727)">
        <Path
          d="M18.5 24a.502.502 0 0 1-.354-.146l-5-5A.499.499 0 0 1 13.5 18H16v-5c0-.551.448-1 1-1h3c.552 0 1 .449 1 1v5h2.5a.5.5 0 0 1 .354.854l-5 5A.502.502 0 0 1 18.5 24zm-3.793-5 3.793 3.793L22.293 19H20.5a.5.5 0 0 1-.5-.5V13h-3v5.5a.5.5 0 0 1-.5.5z"
          fill="#ffffff"
          data-original="#000000"
          class=""
        ></Path>
        <Path
          d="M11.5 21h-9A2.503 2.503 0 0 1 0 18.5v-13C0 4.122 1.121 3 2.5 3h19C22.879 3 24 4.122 24 5.5v10a.5.5 0 0 1-1 0v-10c0-.827-.673-1.5-1.5-1.5h-19C1.673 4 1 4.673 1 5.5v13c0 .827.673 1.5 1.5 1.5h9a.5.5 0 0 1 0 1z"
          fill="#ffffff"
          data-original="#000000"
          class=""
        ></Path>
        <Path
          d="M7.5 16h-7a.5.5 0 0 1-.5-.5v-7A.5.5 0 0 1 .5 8h7C8.879 8 10 9.122 10 10.5v3c0 1.378-1.121 2.5-2.5 2.5zM1 15h6.5c.827 0 1.5-.673 1.5-1.5v-3C9 9.673 8.327 9 7.5 9H1z"
          fill="#ffffff"
          data-original="#000000"
          class=""
        ></Path>
        <Path
          d="M5 14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-3a1.001 1.001 0 0 0 0 2 1.001 1.001 0 0 0 0-2z"
          fill="#ffffff"
          data-original="#000000"
          class=""
        ></Path>
      </G>
    </Svg>
  );
}
