import React, { useContext, useState } from "react"
import styled from "styled-components/macro"

import Logo from "components/Logo"
import ProductListing from "components/ProductListing"
import FullScreenLoading from "components/FullScreenLoading"
import VideoBackground from "components/VideoBackground"
import PorcelainBG from "components/Images/Porcelain_Background.png"
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
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  flex-wrap: wrap;
  justify-content: space-around;
  // background-image: url(${PorcelainBG});
  background-color: rgba(0,0,0,0.4);
  color: white;
  background-size: cover;
  min-height: 100vh;
`

const CartIcon = styled.div`
  position: absolute;
  top: -20px;
  right: 30px;
  max-height: 10vw;
`

export default function Shop(props) {
  const { products } = useContext(ShopifyContext)
  const [isLoading, setLoading] = useState(true)

  return (
    <div>
      {(!products || isLoading) && (
        <div>
          <FullScreenLoading />
          <LoadingText>Loading...</LoadingText>
        </div>
      )}
      {products && (
        <Container>
          <Landing setLoading={setLoading} />
          <Logo />
          {products.map(product => (
            <ProductListing product={product} key={product.handle} />
          ))}
          <VideoBackground />
          <CartIcon>
            <svg
              width="117px"
              height="144px"
              viewBox="0 0 117 144"
              version="1.1"
              className="cart-icon"
              style={{ maxWidth: "30px" }}
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Group-Copy-5"
                  transform="translate(2.000000, 2.000000)"
                  fill="#FFFFFF"
                  fillRule="nonzero"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                >
                  <g id="126515">
                    <path
                      d="M112.578405,121.364172 L104.539141,30.836319 C104.366871,28.8265031 102.672883,27.3047853 100.691779,27.3047853 L84.153865,27.3047853 C83.9241718,12.202454 71.5781595,-1.08713039e-12 56.4184049,-1.08713039e-12 C41.2586503,-1.08713039e-12 28.912638,12.202454 28.6829448,27.3047853 L12.1450307,27.3047853 C10.1352147,27.3047853 8.46993865,28.8265031 8.29766871,30.836319 L0.258404908,121.364172 C0.258404908,121.479018 0.229693252,121.593865 0.229693252,121.708712 C0.229693252,132.016196 9.67582822,140.4 21.3040491,140.4 L91.5327607,140.4 C103.160982,140.4 112.607117,132.016196 112.607117,121.708712 C112.607117,121.593865 112.607117,121.479018 112.578405,121.364172 Z M56.4184049,7.75214724 C67.3001227,7.75214724 76.1720245,16.4804908 76.4017178,27.3047853 L36.435092,27.3047853 C36.6647853,16.4804908 45.5366871,7.75214724 56.4184049,7.75214724 Z M91.5327607,132.647853 L21.3040491,132.647853 C14.0112883,132.647853 8.09668712,127.824294 7.98184049,121.880982 L15.6765644,35.0856442 L28.6542331,35.0856442 L36.4063804,35.0856442 L76.4017178,35.0856442 L84.153865,35.0856442 L97.1315337,35.0856442 L104.854969,121.880982 sC104.740123,127.824294 98.7968098,132.647853 91.5327607,132.647853 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </CartIcon>
        </Container>
      )}
    </div>
  )
}
