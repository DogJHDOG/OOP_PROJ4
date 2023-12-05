import React from 'react'
import styled from 'styled-components'

const Dropdown = ({x,y}) => {
    
  return (
    <Dropdiv x={x} y={y}>
        {console.log(x)}
        {console.log(y)}

        <ul >
        {
            Array(3).fill('').map((li, i) => (
                <li onClick={() => console.log(`Dropdown${i + 1}`)}>Dropdown{i + 1}</li>
            ))
        }
    </ul>
  </Dropdiv>
  )
}

export default Dropdown

const Dropdiv=styled.div`

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index : 100;
    width: 80vh;
    height:80vh;
    background-color: #ffffff; /* 배경 색상 추가 */

`