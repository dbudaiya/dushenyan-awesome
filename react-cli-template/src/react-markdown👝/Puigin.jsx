import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

// 渲染函数
// const render = require('react-dom').render

export default function Puigin() {
  const markdown = `A paragraph with *emphasis* and **strong importance**.

  > A block quote with ~~strikethrough~~ and a URL: https://reactjs.org.
  
  * Lists
  * [x] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |

  
  `;
  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[[gfm,{singleTilde:false}]]}
        children={markdown}
        skipHtml={true}
      />
    </div>
  );
}
