import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import ProductImages from "components/ProductImages"
import ProductDetails from "components/ProductDetails"
import PorcelainBG from "components/Images/Porcelain_Background.png"
import LoadingGif from "components/Images/loading.gif"
import Logo from "components/Logo"
import Cart from "components/Cart"
import Footer from "components/Footer"
import VideoBackground from "components/VideoBackground"
import { ShopifyContext } from "services/shopify"

const LoadingText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  // min-height: 100vh;
  // justify-content: center;
  // background-image: url(${PorcelainBG});
  // background: linear-gradient(rgba(0,0,0,0.5), rgb(35 0 68 / 80%));
  background-size: cover;
  width: 100%;
  overflow: auto;
  padding-top: 40px;
  

  @media (max-height: 900px) {
    padding-top: 40px;
  }

  @media screen and (max-width: 875px) {
    display: block;
  }
`

export default function Product(props) {
  const {
    match: {
      params: { handle }
    }
  } = props

  const shopify = useContext(ShopifyContext)

  if (!shopify.products) {
    return (
      <LoadingText>
        <img src={LoadingGif} alt="LOADING..." />
      </LoadingText>
    )
  }

  console.log(shopify.products)

  const product = shopify.products.find(prod => prod.handle === handle)

  if (!product) {
    return (
      <LoadingText>
        We couldn't find the product you're looking for...
        <br />
        <br />
        <Link to="/">Return to Shop</Link>
      </LoadingText>
    )
  }

  return (
    <Container>
      <Logo />
      <ProductImages product={product} />
      <ProductDetails product={product} {...shopify} />
      <VideoBackground />
      <Cart />
      <Footer />
    </Container>
  )
}
