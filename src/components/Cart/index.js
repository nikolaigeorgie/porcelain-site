import React, { useContext, useCallback } from "react"
import styled from "styled-components/macro"

import { ShopifyContext } from "services/shopify"

import Item from "./components/Item"

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 14;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.open === "false" && "display: none"};
`

const Checkout = styled.div`
  width: 80vw;
  height: 80vh;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  color: black;

  @media screen and (max-width: 650px) {
    width: 100%;
    height: 100%;
  }
`

const Header = styled.div`
  text-align: center;

  & h1 {
    text-transform: uppercase;
    margin: 10px;
  }
`

const Exit = styled.button`
  color: black;
  position: absolute;
  right: 20px;
  font-size: 30px;
  outline: none;
  border: none;
  background-color: transparent;
  transition: 0.3s;
  top: 20px;

  &:hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.5);
    transition: 0.3s;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  height: 70%;
  overflow: auto;
`

const Footer = styled.div`
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;

  @media screen and (max-width: 875px) {
    flex-direction: column;
  }

  & a {
    transition: 0.3s;

    &:hover {
      color: black;
      transition: 0.3s;
    }

    @media screen and (max-width: 650px) {
      font-size: 15px;
    }
  }
`

const CartIcon = styled.div`
  position: fixed;
  top: 20px;
  right: 30px;
  z-index: 9;
  `

const CartImage = styled.img`
height: 50px;
width: 50px;
`

const CartIndicator = styled.div`
  position: absolute;
  top: 50px;
  right: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-size: 10px;
  width: 15px;
  height: 15px;
  color: white;
  background: red;
  border: 2px solid white;
`

const EmptyText = styled.h4`
  text-align: center;
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CheckoutButton = styled.a`
  text-decoration: underline !important;
  color: black !important;
`

const ControlSpacer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default function Cart(props) {
  const {
    checkout,
    setCheckout,
    checkoutOpen,
    setCheckoutOpen,
    client
  } = useContext(ShopifyContext)

  const removeFromCheckout = useCallback(
    itemId => {
      const checkoutId = checkout.id
      const lineItemsToRemove = itemId
      client.checkout
        .removeLineItems(checkoutId, lineItemsToRemove)
        .then(newCheckout => {
          localStorage.setItem("id", newCheckout.id)
          setCheckout(newCheckout)
        })
    },
    [checkout, client.checkout, setCheckout]
  )

  if (!checkout) {
    return <></>
  }

  const { lineItems, subtotalPrice, webUrl } = checkout

  return (
    <div>
      <CartIcon
        onClick={() => {
          setCheckoutOpen("true")
        }}
      >
        <CartImage src="/cart.png" />
        {/* <svg
          width="117px"
          height="144px"
          viewBox="0 0 117 144"
          version="1.1"
          className="cart-icon"
          style={{ maxWidth: window.innerWidth < 800 ? "25px" : "30px" }}
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
                  d="M112.578405,121.364172 L104.539141,30.836319 C104.366871,28.8265031 102.672883,27.3047853 100.691779,27.3047853 L84.153865,27.3047853 C83.9241718,12.202454 71.5781595,-1.08713039e-12 56.4184049,-1.08713039e-12 C41.2586503,-1.08713039e-12 28.912638,12.202454 28.6829448,27.3047853 L12.1450307,27.3047853 C10.1352147,27.3047853 8.46993865,28.8265031 8.29766871,30.836319 L0.258404908,121.364172 C0.258404908,121.479018 0.229693252,121.593865 0.229693252,121.708712 C0.229693252,132.016196 9.67582822,140.4 21.3040491,140.4 L91.5327607,140.4 C103.160982,140.4 112.607117,132.016196 112.607117,121.708712 C112.607117,121.593865 112.607117,121.479018 112.578405,121.364172 Z M56.4184049,7.75214724 C67.3001227,7.75214724 76.1720245,16.4804908 76.4017178,27.3047853 L36.435092,27.3047853 C36.6647853,16.4804908 45.5366871,7.75214724 56.4184049,7.75214724 Z M91.5327607,132.647853 L21.3040491,132.647853 C14.0112883,132.647853 8.09668712,127.824294 7.98184049,121.880982 L15.6765644,35.0856442 L28.6542331,35.0856442 L36.4063804,35.0856442 L76.4017178,35.0856442 L84.153865,35.0856442 L97.1315337,35.0856442 L104.854969,121.880982 C104.740123,127.824294 98.7968098,132.647853 91.5327607,132.647853 Z"
                  id="Shape"
                />
              </g>
            </g>
          </g>
        </svg> */}
        {lineItems && lineItems.length > 0 ? (
          <CartIndicator>{lineItems.length}</CartIndicator>
        ) : (
          <></>
        )}
      </CartIcon>
      <Container open={checkoutOpen}>
        <Checkout>
          <Header>
            <Exit
              onClick={() => {
                setCheckoutOpen("false")
              }}
            >
              X
            </Exit>
            <h1>Cart</h1>
          </Header>
          {lineItems && lineItems.length > 0 ? (
            <>
              <Content>
                {lineItems.map(item => (
                  <Item
                    item={item}
                    key={item.id}
                    removeFromCheckout={removeFromCheckout}
                  />
                ))}
              </Content>
              <Footer>
                <div>
                  <h5>
                    ALL SALES ARE FINAL.
                    <br />
                    SHIPPING CAN TAKE UP TO FOUR WEEKS.
                  </h5>
                  <ControlSpacer>
                    <h4>Subtotal: ${subtotalPrice}</h4>
                    <CheckoutButton href={webUrl}>CHECKOUT</CheckoutButton>
                  </ControlSpacer>
                </div>
              </Footer>
            </>
          ) : (
            <EmptyText>YOUR CART IS EMPTY</EmptyText>
          )}
        </Checkout>
      </Container>
    </div>
  )
}
