import React from 'react';
import styled from 'styled-components';

const Dropdown = ({ x, y, eventsArray, setDropdownView }) => {
  console.log(eventsArray);

  return (
    <Dropdiv x={x} y={y}>
      <CloseButton onClick={() => setDropdownView(null)}>X</CloseButton>

      <ul>
        {eventsArray.map((event, i) => (
          <CalDiv key={i} onClick={() =>window.location.href=`/notice/${event.noticeId}` }>
            <div>
              <div>{`Title: ${event.title}`}</div>
              <div>{`Memo: ${event.memo}`}</div>
            </div>
          </CalDiv>
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
  background-color: #F8F9FA;
  overflow: auto; /* 스크롤이 가능하도록 설정 */
`;


const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #333; /* X 마크의 색상 설정 */
`;

const CalDiv = styled.ul`
  width: 90%;
  height: 100px;
  border-bottom: 1px solid #000; /* 짝대기 스타일 지정 */
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

