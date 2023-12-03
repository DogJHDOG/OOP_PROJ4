import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Notice from '../components/Notice';
import 'tippy.js/dist/tippy.css';
import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';

function Main() {
  return (
    <Container>
      <Login onClick={
        ()=>{window.location.href=`/login`}
      }>
        로그인
      </Login>
      <Title>2023.2 Object Oriented Programming</Title>

    <div>

        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            contentHeight="auto" // 높이를 자동으로 조절
            aspectRatio={1.8}
            eventDidMount={(info) => {
            tippy(info.el, {
                animation: 'scale',
                content: '111111111111111111111111111',
                allowHTML: true,
                interactive: true,
                interactiveDebounce: 75,
                trigger: 'click',
            });
            }}
            events={[
            { title: 'Project04 Announcement', date: '2023-12-01' },
            { title: '기말고사 시험', date: '2023-12-20' },
            ]}
        ></FullCalendar>


    </div>

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
