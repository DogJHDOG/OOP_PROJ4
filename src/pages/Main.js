import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import styled from 'styled-components';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Notice from '../components/Notice';



function Main() {

    
    
    return (
      <Container>
        <Title>
            2023.2 Object Oriented Programming
        </Title>

        <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={[{title:'Project04 Announcement', date:'2023-12-01',},{title:'기말고사 시험',date:'2023-12-20',}]}

                >
            
        </FullCalendar>

        <div>
            <NoticeTitle>
                Notice
            </NoticeTitle>
            <Notice></Notice>
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

    width : 80%;
    margin: 0 auto;
    padding-bottom: 0px;
    display : flex;
    flex-direction: column;
    gap : 40px;

`

const Title = styled.div`
    // margin-top : 40px;
    font-size: 40px;
    border-bottom: 1px solid #000; /* 선 색상 및 두께 설정 */
    padding-bottom: 40px; /* 선과 글자 간의 간격을 주기 위해 padding-bottom 사용 */
    text-align : center;
    flex-shrink: 0;
`

const NoticeTitle = styled.div`
    font-size: 25px;
    text-decoration: underline; /* 텍스트에만 밑줄 설정 */

`