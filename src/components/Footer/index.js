import React from "react"
import styled from "styled-components/macro"

const Contianer = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  height: 30px;
  margin-top: 20px;
  padding: 0 10%;
  box-sizing: border-box;

  & > p {
    margin: 0;
  }

  @media screen and (max-width: 900px) {
    font-size: 0.7rem;
  }
`

const Footer = () => {
  return (
    <Contianer>
      <p>© 2020 PORCELAIN ALL RIGHTS RESERVED. TERMS | PRIVACY</p>
    </Contianer>
  )
}

export default Footer
