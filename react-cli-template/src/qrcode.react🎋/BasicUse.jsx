import React from "react";
import QRCode from "qrcode.react";

export default function BasicUse() {
  return (
    <div>
      <QRCode
        value={"http://www.baidu.com"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        renderAs={"svg"}
        imageSettings={{
          src: "https://static.zpao.com/favicon.png",
          x: null,
          y: null,
          height: 39,
          width: 32,
          excavate: true,
        }}
      />
    </div>
  );
}
