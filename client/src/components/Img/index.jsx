import React from "react";

const Img = ({ className, src = "defaultNoData.png", alt = "testImg", ...restProps }) => {
  return <img className={className} src={`http://localhost:5173/${src}`} alt={alt} {...restProps} loading={"lazy"} />;
};
export { Img };
