import React, { useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import Notice from '../components/Notice';
import 'tippy.js/dist/tippy.css';
import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import Dropdown from '../components/Dropdown';

function Main() {
  const [isDropdownView, setDropdownView] = useState(false);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);

  let clickX = 0;
  let clickY = 0;
  return (
    <div>
    {isDropdownView && <Dropdown x={curX} y={curY}/> }    
    <Container>
      <Login onClick={
        ()=>{window.location.href=`/login`}
      }>
        로그인
      </Login>
      <Title>2023.2 Object Oriented Programming</Title>

    <Caldiv>

        <FullCalendar
            plugins={[dayGridPlugin ]}
            initialView="dayGridMonth"
            contentHeight="auto" // 높이를 자동으로 조절
            aspectRatio={1.8}
            // eventDidMount={(info) => {
            // tippy(info.el, {
            //     animation: 'scale',
            //     content: '111111111111111111111111111',
            //     allowHTML: true,
            //     interactive: true,
            //     interactiveDebounce: 75,
            //     trigger: 'click',
            // });
            // }}
            
            dateClick={(info) => {
              alert('Clicked on: ' + info.dateStr);
              alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            }}
            dayMaxEventRows={3}
            moreLinkClick={(arg) => {
              // arg 객체에는 "more" 링크와 관련된 정보가 담겨 있습니다.
              
              
              // 또는 alert를 사용하여 간단한 메시지를 표시할 수 있습니다.
              clickX = arg.jsEvent.pageX;
              clickY = arg.jsEvent.pageY;
              alert(clickX +'and'+clickY)
              setCurX(clickX);
              setCurY(clickY);

              setDropdownView(!isDropdownView);

                     
              // 기본 동작을 막고자 할 때는 아래와 같이 preventDefault()를 호출합니다.
            }}
          
            events={[
            { title: 'Project04 Announcement', date: '2023-12-01' },
            { title: '기말고사 시험1', date: '2023-12-20' },
            { title: '기말고사 시험2', date: '2023-12-20' },
            { title: '기말고사 시험3', date: '2023-12-20' },
            { title: '기말고사 시험4', date: '2023-12-20' },
            { title: '기말고사 시험', date: '2023-12-20' },
            ]}


  
        ></FullCalendar>


    </Caldiv>

      <div>
        <NoticeTitle>Notice</NoticeTitle>
        <Notice onClick={
          ()=>{
            window.location.href=`/project/04`
          }}
        ></Notice>
        <Notice></Notice>
        <Notice></Notice>
        <Notice></Notice>
        <Notice></Notice>
      </div>
    </Container>
    </div>

  );
}

export default Main;

const Container = styled.div`
    width: 100%;
    min-height: 300px; // 최소 높이 설정
    // 나머지 스타일들...  margin: 0 auto;
    padding-bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 내부 요소들을 수직 방향(세로) 가운데 정렬 */
    gap: 40px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Caldiv = styled.div`
    width: 80%;
    min-height: 30vh; /* Set minimum height as 30% of viewport height */
    margin: 0 auto; /* Center the div */

    @media (max-width: 768px) {
        width: 90%;
        min-height: 20vh; /* Adjust height for smaller screens */
    }

    @media (max-width: 480px) {
        width: 95%;
        min-height: 15vh; /* Further adjust height for even smaller screens */
    }
`;
const Login = styled.div`
  margin-top : 20px;
  cursor: pointer;
  padding: 10px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: auto; /* auto를 사용하여 오른쪽으로 이동합니다. */
  margin-right: 10px; /* 여유 공간을 조절할 수 있습니다. */
`;

const Title = styled.div`
  font-size: 40px;
  border-bottom: 1px solid #000;
  padding-bottom: 40px;
  text-align: center;
  flex-shrink: 0;
`;

const NoticeTitle = styled.div`
  font-size: 25px;
  text-decoration: underline;
`;
