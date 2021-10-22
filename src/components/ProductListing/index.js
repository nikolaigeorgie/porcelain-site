import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  flex: 0 auto;
  max-width: 300px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 50%;
  width: 50%;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  user-select: none;

  & > * {
    user-select: none;
  }

  & > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 130px;
`

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 70%;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`
const Subtitle = styled.h3`
  text-align: center;
  margin-top: 20px;
  font-weight: 100;
  color: white !important;
  text-shadow: 0 2px 4px rgb(0 0 0 / 0.6);
`

export default function ProductListing(props) {
  const { product } = props

  const { images, handle } = product
  const { price } = product.variants[0]

  return (
    <Container>
      <Link style={{ textDecoration: "none" }} to={`/${handle}`}>
        <Image src={images[0].src} />
        <Description>
          <Subtitle>${price}</Subtitle>
        </Description>
      </Link>
    </Container>
  )
}
