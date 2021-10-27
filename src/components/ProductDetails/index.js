import React, { useState } from "react"
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
  text-shadow: 0 2px 4px rgb(0 0 0 / 0.6);

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

  @media screen and (max-width: 875px) {
    justify-content: center;
  }
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
  font-size: 0.9em;
  border-radius: 30px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.6);

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
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.6);

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
  font-size: 1.3rem;

  @media screen and (max-width: 875px) {
    display: none;
  }
`

const Description = styled.div`
  font-size: 1.3rem;
  margin-bottom: 25px;
  text-transform: uppercase;

  @media screen and (max-width: 875px) {
    display: none;
  }
`

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: lighter;
  text-transform: uppercase;
  margin-bottom: 10px;

  @media screen and (max-width: 875px) {
    display: none;
  }
`

const Price = styled.div`
  font-size: 1.3rem;
  font-weight: lighter;
  margin-bottom: 10px;

  @media screen and (max-width: 875px) {
    text-align: center;
  }
`

const SalesFinalText = styled.div`
  font-size: 0.7rem;
  opacity: 0.9;
  margin: 40px 0;
  width: 100%;
  text-align: center;
`

export default function ProductDetails(props) {
  const { product, checkout, setCheckout, client, setCheckoutOpen } = props

  const [curVariantId, setCurVariantId] = useState(0)

  async function addToCheckout() {
    const lineItemsToAdd = { variantId: curVariantId, quantity: 1 }
    const newCheckout = await client.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd
    )
    localStorage.setItem("id", newCheckout.id)
    setCheckout(newCheckout)
    setCheckoutOpen("true")
  }

  const { title, variants, descriptionHtml } = product

  const description = ReactHtmlParser(descriptionHtml).filter(
    obj => obj.type !== "meta" && obj.type !== "table"
  )

  return (
    <Container>
      <div>
        <Title>{title}</Title>
      </div>
      <div>
        <Price>${variants[0].price}</Price>
        <Description>{description}</Description>
        <SelectSize>Select Size</SelectSize>
        <VariantContainer>
          {variants.map(variant => (
            <Variant
              variant={variant}
              curVariantId={curVariantId}
              setCurVariantId={setCurVariantId}
              key={variant.id}
            />
          ))}
        </VariantContainer>
        <ButtonContainer>
          <BuyButton onClick={() => addToCheckout()}>ADD TO CART</BuyButton>
          <BuyNowButton onClick={() => addToCheckout()}>BUY NOW</BuyNowButton>
        </ButtonContainer>
        <SalesFinalText>ALL SALES FINAL</SalesFinalText>
      </div>
    </Container>
  )
}
