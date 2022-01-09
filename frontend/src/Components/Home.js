import React from "react";
import "./Home.css";
import background from "../background.png";

export default function Home() {
  return (
    <div>
      <img src={background} width={"100%"} />
      <h1 className={"homeHeader"}>Pinecone</h1>
      <h6 className={"homeDescription"}>Keeping Communities Safe</h6>
    </div>
  );
}
