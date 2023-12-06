import React from 'react';
import styled from 'styled-components';

const Dropdown = ({ x, y, ref,setDropdownView }) => {
  return (
    <Dropdiv x={x} y={y}>
      <CloseButton onClick={()=>setDropdownView(false)}>X</CloseButton>

      <ul>
        {Array(3).fill('').map((li, i) => (
          <li key={i} onClick={() => console.log(`Dropdown${i + 1}`)}>Dropdown{i + 1}</li>
        ))}
      </ul>
    </Dropdiv>
  );
};

export default Dropdown;

const Dropdiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 80vh;
  height: 80vh;
  background-color: #ffffff; /* 배경 색상 추가 */
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #333; /* X 마크의 색상 설정 */
`;

