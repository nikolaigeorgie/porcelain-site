import React, { useContext } from "react"
import styled from "styled-components/macro"

import ProductListing from "components/ProductListing"
import { ShopifyContext } from "services/shopify"

const LoadingText = styled.h1`
  width: 100%;
  height: 100vh;
  background: white;
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
    return <LoadingText>Loading...</LoadingText>
  }

  return (
    <div>
      <Container>
        {products.map(product => (
          <ProductListing product={product} key={product.handle} />
        ))}
      </Container>
    </div>
  )
}
