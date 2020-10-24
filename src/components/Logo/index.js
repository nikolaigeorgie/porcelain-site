import React from "react"

import "./styles.scss"

import PorcelainLogo from "../Images/porcelain.png"

export default function Logo() {
  return (
    <a href="/" className="logo-container-static">
      <img className="logo" src={PorcelainLogo} alt="Porcelain" />
    </a>
  )
}
