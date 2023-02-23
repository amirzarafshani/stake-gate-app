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
      <Circle r="12" cx="12" cy="12" fill="#79cc32" shape="circle"></Circle>
      <G transform="matrix(0.6000000000000011,0,0,0.6000000000000011,4.800265502929674,5.399999999999997)">
        <Path
          d="M20 24h-3c-.551 0-1-.449-1-1v-5h-2.5a.5.5 0 0 1-.354-.854l5-5a.5.5 0 0 1 .707 0l5 5A.499.499 0 0 1 23.5 18H21v5c0 .551-.449 1-1 1zm-5.293-7H16.5a.5.5 0 0 1 .5.5V23h3v-5.5a.5.5 0 0 1 .5-.5h1.793L18.5 13.207z"
          fill="#ffffff"
          data-original="#000000"
        ></Path>
        <Path
          d="M13.5 21h-11A2.503 2.503 0 0 1 0 18.5v-13C0 4.122 1.122 3 2.5 3h19C22.878 3 24 4.122 24 5.5v9a.5.5 0 0 1-1 0v-9c0-.827-.673-1.5-1.5-1.5h-19C1.673 4 1 4.673 1 5.5v13c0 .827.673 1.5 1.5 1.5h11a.5.5 0 0 1 0 1z"
          fill="#ffffff"
          data-original="#000000"
        ></Path>
        <Path
          d="M7.5 16h-7a.5.5 0 0 1-.5-.5v-7A.5.5 0 0 1 .5 8h7C8.878 8 10 9.122 10 10.5v3c0 1.378-1.122 2.5-2.5 2.5zM1 15h6.5c.827 0 1.5-.673 1.5-1.5v-3C9 9.673 8.327 9 7.5 9H1z"
          fill="#ffffff"
          data-original="#000000"
        ></Path>
        <Path
          d="M5 14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-3c-.551 0-1 .449-1 1s.449 1 1 1 1-.449 1-1-.449-1-1-1z"
          fill="#ffffff"
          data-original="#000000"
        ></Path>
      </G>
    </Svg>
  );
}
