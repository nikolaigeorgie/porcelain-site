import React, { useContext } from "react"
import styled from "styled-components/macro"

import ProductListing from "components/ProductListing"
import FullScreenLoading from "components/FullScreenLoading"
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
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export default function Shop(props) {
  const { products } = useContext(ShopifyContext)

  if (!products) {
    return (
      <div>
        <FullScreenLoading />
        <LoadingText>Loading...</LoadingText>
      </div>
    )
  }

  return (
    <div>
      <Container>
        <Landing />
        {products.map(product => (
          <ProductListing product={product} key={product.handle} />
        ))}
      </Container>
    </div>
  )
}
