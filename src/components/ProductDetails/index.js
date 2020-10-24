import React, { useState, useCallback } from "react"
import styled from "styled-components/macro"
import ReactHtmlParser from "react-html-parser"

import Variant from "./components/Variant"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 40%;
  max-width: 420px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  color: white;

  & > * {
    td {
      border: 1px solid black;
      padding: 5px;
    }

    table {
      font-size: 10px;
    }
  }

  @media screen and (max-width: 875px) {
    height: auto;
    padding: 0 1px;
    margin: 0 auto;
    width: 100%;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 500px) {
    padding: 0 20px;
  }
`

const VariantContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`

const BuyButton = styled.button`
  outline: none;
  background-color: transparent;
  color: white;
  margin: 20px 0px 0px 0px;
  width: 40%;
  padding: 15px 5px;
  transition: 0.5s;
  text-align: center;
  font-size: 19px;
  border-radius: 30px;
  border: 2px solid white;

  &:hover {
    background-color: white;
    transition: 0.5s;
    color: black;
    cursor: pointer;
  }
`

const BuyNowButton = styled(BuyButton)`
  background: white;
  color: #41bbe2;

  &:hover {
    background: red;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SelectSize = styled.div`
  font-size: 1.5rem;
`

export default function ProductDetails(props) {
  const { product, checkout, setCheckout, client, setCheckoutOpen } = props

  const [curVariantId, setCurVariantId] = useState(0)
  const [dimsOpen, setDimsOpen] = useState("false")

  async function addToCheckout() {
    const lineItemsToAdd = { variantId: curVariantId, quantity: 1 }
    const newCheckout = await client.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd
    )
    setCheckout(newCheckout)
    setCheckoutOpen("true")
  }
  const toggleDims = useCallback(() => {
    setDimsOpen(dimsOpen === "true" ? "false" : "true")
  }, [dimsOpen])

  const { title, variants, descriptionHtml } = product

  const description = ReactHtmlParser(descriptionHtml).filter(
    obj => obj.type !== "meta" && obj.type !== "table"
  )

  const dims = ReactHtmlParser(descriptionHtml).find(
    obj => obj.type === "table"
  ) || <b>Dimensions not available.</b>

  return (
    <Container>
      <div>
        <h1 style={{ fontWeight: "lighter", margin: 0, fontSize: "1.8rem" }}>
          {title}
        </h1>
      </div>
      <div>
        <h2 style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
          ${variants[0].price}
        </h2>
        <div>{description}</div>
        <SelectSize>Select Size</SelectSize>
        <VariantContainer>
          {variants.map(variant => (
            <Variant
              variant={variant}
              curVariantId={curVariantId}
              setCurVariantId={setCurVariantId}
            />
          ))}
        </VariantContainer>
        <ButtonContainer>
          <BuyButton onClick={() => addToCheckout()}>ADD TO CART</BuyButton>
          <BuyNowButton onClick={() => addToCheckout()}>BUY NOW</BuyNowButton>
        </ButtonContainer>
      </div>
    </Container>
  )
}
