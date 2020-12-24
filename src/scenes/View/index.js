import React from "react"

import Helmet from "components/Helmet"
import Footer from "components/Footer"

import Shop from "../Shop"

export default function View(props) {
  return (
    <>
      <Helmet title="Porcelain Site" />
      <Shop />
      <Footer />
    </>
  )
}
