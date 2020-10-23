/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from "react"

import PorcelainLogo from "../Images/porcelain.png"
import PorcelainShadow from "../Images/porcelain_shadow.png"

import "./styles.scss"

export default function Logo(props) {
  return (
    <div className="logo-container">
      <img className="logo" src={PorcelainShadow} alt="Porcelain" />
      <img className="logo no-shadow" src={PorcelainLogo} alt="Porcelain" />
    </div>
  )
}
