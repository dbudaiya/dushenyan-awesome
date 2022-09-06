import React, { useState } from "react";

import ImgCrop from "antd-img-crop";
import { Upload } from "antd";

// 导入样式
import "antd/dist/antd.css";

export default function BasicUse() {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onlaod = () => resolve(reader.result);
      });
    }
    const image = new Image();
    console.log(image);
    image.src = src;
    const imageWindow = window.open(src);

    if (imageWindow) {
      imageWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <ImgCrop grid>
        {/* <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 3 && "+ Upload"}
        </Upload> */}

         <Upload>+ Add image</Upload>
      </ImgCrop>
    </div>
  );
}
