import React from "react"

import PorcelainLogo from "../Images/Porcelain_Title.png"

import "./styles.scss"

export default function Logo() {
  return (
    <a href="/" className="logo-container-static">
      <img className="logo" src={PorcelainLogo} alt="Porcelain" />
    </a>
  )
}