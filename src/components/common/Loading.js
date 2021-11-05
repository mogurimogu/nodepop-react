import React from "react";
import "./style/loading.scss"

export default function Loading() {
  return (
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
}