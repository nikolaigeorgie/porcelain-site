/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from "react"

import PorcelainLogo from "../Images/Porcelain_Title.png"

import "./styles.scss"

export default function Logo() {
  return (
    <div className="logo-container">
      <img className="logo" src={PorcelainLogo} alt="Porcelain" />
    </div>
  )
}
