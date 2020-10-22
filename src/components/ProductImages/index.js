import React, { useCallback, useState } from "react"
import styled from "styled-components/macro"
import InnerImageZoom from "react-inner-image-zoom"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  flex-direction: column;

  @media screen and (max-width: 875px) {
    height: auto;
    margin-top: 70px;
  }
`

// this inner image zoom thing doesn't seem to be working
const MainImage = styled(InnerImageZoom)`
  width: 350px;
  margin-top: 50px;
  // border: 1px solid black;
  margin-bottom: 20px;

  @media screen and (max-width: 500px) {
    width: 250px;
  }

  @media screen and (max-width: 400px) {
    width: 220px;
  }

  img {
    max-width: 100%;
  }
`

const Thumbnail = styled.img`
  width: 55px;
  height: 55px;
  margin: 10px;
  transition: 0.2s;
  object-fit: cover;
  object-position: top center;
  ${props => !props.selected && "cursor: pointer"};
  opacity: ${props => (props.selected ? 0.5 : 1)};
`

const PaginateButton = styled.button`
  font-size: 35px;
  background-color: transparent;
  outline: none;
  border: none;
  color: black;
  cursor: pointer;
  margin: 0 20px;

  &:hover {
    opacity: 0.6;
  }

  @media screen and (max-width: 500px) {
    margin: 0 5px;
  }
`

const SubContainer = styled.div`
  display: flex;
`

export default function ProductImages(props) {
  const { product } = props

  const { images } = product
  const [index, setIndex] = useState(0)

  const changeIndex = useCallback(
    diff => {
      let newIndex = index + diff
      if (newIndex < 0) {
        newIndex = images.length - 1
      }
      if (newIndex > images.length - 1) {
        newIndex = 0
      }
      setIndex(newIndex)
    },
    [images.length, index]
  )
  return (
    <Container>
      <SubContainer>
        {images.length > 1 && (
          <PaginateButton onClick={() => changeIndex(-1)}>{"<"}</PaginateButton>
        )}
        <MainImage src={images[index].src} />
        {images.length > 1 && (
          <PaginateButton onClick={() => changeIndex(1)}>{">"}</PaginateButton>
        )}
      </SubContainer>
      <div className="shop-other__images">
        {images.map((image, i) => {
          return (
            <Thumbnail
              key={image.src}
              src={image.src}
              selected={i === index}
              onClick={() => setIndex(i)}
            />
          )
        })}
      </div>
    </Container>
  )
}
