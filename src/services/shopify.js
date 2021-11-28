import React, {  useEffect, useState } from "react"
import ShopifyBuy from "shopify-buy"

export const ShopifyContext = React.createContext()

const client = ShopifyBuy.buildClient({
  domain: "porcelainforsale.myshopify.com",
  storefrontAccessToken: "c6e12c244fdd1bdea0acc6058c0bb461"
})

export function ShopifyProvider(props) {
  const { children } = props

  const [products, setProducts] = useState()
  const [checkout, setCheckout] = useState()
  const [checkoutOpen, setCheckoutOpen] = useState("false")

  useEffect(() => {
    if (!products && !checkout) {
      const id = localStorage.getItem("id")

      client.product
        .fetchAll()
        .then(shopifyProducts => setProducts(shopifyProducts))

      if (id) {
        client.checkout
          .fetch(id)
          .then(shopifyCheckout => setCheckout(shopifyCheckout))
      } else {
        client.checkout
          .create()
          .then(shopifyCheckout => setCheckout(shopifyCheckout))
      }
    }
  }, [products, checkout])

  const providerValue = {
    client,
    products,
    checkout,
    setCheckout,
    checkoutOpen,
    setCheckoutOpen
  }

  return (
    <ShopifyContext.Provider value={providerValue}>
      {children}
    </ShopifyContext.Provider>
  )
}
