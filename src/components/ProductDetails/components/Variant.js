import React from "react"
import styled from "styled-components/macro"

const VariantButton = styled.button`
  padding: 5px;
  outline: none;
  border: 1px black solid;
  font-size: 20px;
  width: 50px;
  height: 50px;
  transition: 0.15s;

  //variant
  background-color: black;
  color: white;

  ${props => !props.selected && "cursor: pointer"};
  ${props => props.selected && "background-color: white"};
  ${props => props.selected && "color: black"};

  &:hover {
    background-color: white;
    color: black;
  }
`

const UnavailableVariant = styled(VariantButton)`
  border: 2px solid transparent;
  background-color: transparent;
  color: red;
  cursor: auto !important;

  &:hover {
    background-color: transparent;
    color: red;
  }
`

export default function Variant(props) {
  const { variant, curVariantId, setCurVariantId } = props
  const { available, id, title } = variant

  if (!available) {
    return <UnavailableVariant key={id}>{title}</UnavailableVariant>
  }

  const onClick = () => setCurVariantId(id)

  return (
    <VariantButton key={id} onClick={onClick} selected={curVariantId === id}>
      {title}
    </VariantButton>
  )
}
