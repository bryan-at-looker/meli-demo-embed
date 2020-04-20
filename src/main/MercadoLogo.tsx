import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import { Flex } from '@looker/components';
// import { MercadoShopsSvg } from './MercadoShopsSvg';
import { MercadoLibreSvg } from './MercadoLibreSvg';

export function MercadoLogo ({animate, onClick}: any ) {

  const Loader = styled(Flex)`
  -webkit-animation: ${(animate) ? kf: ''} 2.5s both infinite;
  animation: ${(animate) ? kf: ''} 2.5s both infinite;
  `
  console.log(animate)
  return (
    <Loader mt="xsmall" width='100%' height="75%" onClick={onClick}>
      {/* <MercadoShopsSvg onClick={onClick} width="400" height="100%"></MercadoShopsSvg> */}
      <MercadoLibreSvg onClick={onClick} width={(animate)?'600':'150'} height="100%"></MercadoLibreSvg>
    </Loader>
  )
}

const kf = keyframes`
0% {
  -webkit-transform: translateY(-500px);
          transform: translateY(-500px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
  opacity: 0;
}
19% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
  opacity: 1;
}
23% {
  -webkit-transform: translateY(-65px);
          transform: translateY(-65px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
36% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
41% {
  -webkit-transform: translateY(-28px);
          transform: translateY(-28px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
45% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
43% {
  -webkit-transform: translateY(-8px);
          transform: translateY(-8px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
100% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
}
@keyframes bounce-in-top {
0% {
  -webkit-transform: translateY(-500px);
          transform: translateY(-500px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
  opacity: 0;
}
19% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
  opacity: 1;
}
23% {
  -webkit-transform: translateY(-65px);
          transform: translateY(-65px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
36% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
41% {
  -webkit-transform: translateY(-28px);
          transform: translateY(-28px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
45% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
43% {
  -webkit-transform: translateY(-8px);
          transform: translateY(-8px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
100% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}`

// const Loader = styled(Flex)`
// -webkit-animation: ${kf} 2s linear 0.5s 1 infinite;
// 	        animation: ${kf} 2s linear 0.5s 1 infinite;
// `
// bubble 2s linear 0.5s 1 normal forwards