import React from "react";
import "./style/loading.scss";

export default function Loading(extraclass) {
  return (
    <div className={`lds-ripple ${extraclass.extraClass} `}>
      <div></div>
      <div></div>
    </div>
  );
}
