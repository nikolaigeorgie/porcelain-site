import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  flex: 0 auto;
  width: 100%;
  max-width: 300px;
  padding: 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: auto;
  height: 25vh;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`

const Title = styled.h2`
  text-align: center;
  margin: 0.5rem 0;
  font-weight: 100;
`

const Subtitle = styled.h3`
  text-align: center;
  margin-top: 0;
  font-weight: 100;
`

const ShopNow = styled(Link)`
  padding: 0.5rem 1rem;
  border: 1px solid black;
  cursor: pointer;
  transition: background 0.15s linear;
  color: black !important;
  text-decoration: none !important;
  text-align: center;
  letter-spacing: 0.7px;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`

export default function ProductListing(props) {
  const { product } = props

  const { images, title, handle } = product
  const { price } = product.variants[0]

  return (
    <Container>
      <Image src={images[0].src} />
      <Description>
        <Title>{title}</Title>
        <Subtitle>${price}</Subtitle>
        <ShopNow to={`/${handle}`}>Shop Style</ShopNow>
      </Description>
    </Container>
  )
}
