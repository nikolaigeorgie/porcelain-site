import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components/macro"
import { useLocation } from "react-router-dom"

import LogoLandingPage from "components/LogoLandingPage"
import Logo from "components/Logo"
import ProductListing from "components/ProductListing"
import FullScreenLoading from "components/FullScreenLoading"
import VideoBackground from "components/VideoBackground"
import Cart from "components/Cart"
import PorcelainBG from "components/Images/Porcelain_Background.png"
import LoadingGif from "components/Images/loading.gif"
import { ShopifyContext } from "services/shopify"

import Landing from "../Landing"

const LoadingText = styled.h1`
  width: 100%;
  height: 100vh;
  position: absolute;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  flex-wrap: wrap;
  justify-content: space-around;
  // background-image: url(${PorcelainBG});
  // background: linear-gradient(rgba(0,0,0,0.7), rgb(35 0 68 / 80%));
  color: white;
  background-size: cover;
  min-height: 100vh;
`

export default function Shop(props) {
  const { products } = useContext(ShopifyContext)
  const [isLoading, setLoading] = useState(true)

  const location = useLocation()

  useEffect(() => {
    if (location.search === "?s") {
      setLoading(false)
    }
  }, [location])

  return (
    <div>
      {(!products || isLoading) && (
        <div>
          <FullScreenLoading />
          <LoadingText>
            <img src={LoadingGif} alt="LOADING..." />
            <h3>Loading...</h3>
          </LoadingText>
        </div>
      )}
      {products && (
        <Container>
          {location.search !== "?s" && <Landing setLoading={setLoading} />}
          {location.search !== "?s" && <LogoLandingPage />}
          {location.search === "?s" && <Logo />}
          {products.map(product => (
            <ProductListing product={product} key={product.handle} />
          ))}
          <VideoBackground />
          <Cart />
        </Container>
      )}
    </div>
  )
}
