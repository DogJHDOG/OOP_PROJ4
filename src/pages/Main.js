import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import Notice from '../components/Notice';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import Dropdown from '../components/Dropdown';
import { getMainData } from '../apis/Axios';
import Resource from '../components/Resource';


var events ={
  '2023-12-20':[            
  { title: '기말고사 시험1', date: '2023-12-20' ,memo:'a'},
  { title: '기말고사 시험2', date: '2023-12-20' ,memo:'a'},
  { title: '기말고사 시험3', date: '2023-12-20' ,memo:'a'},
  { title: '기말고사 시험4', date: '2023-12-20' ,memo:'a'},
  { title: '기말고사 시험', date: '2023-12-20' ,memo:'a'},
  ],
  '2023-12-19':[
    { title: '기말고사 시험', date: '2023-12-19' ,memo:'a'},
  ]
  
}


const Main= ()=> {


  const newArray = Object.entries(events).reduce((result, [date, eventsList]) => {
    const transformedEvents = eventsList.map(({ title, date }) => ({ title, date }));
    result.push(...transformedEvents);
    return result;
  }, []);
  const [isDropdownView, setDropdownView] = useState(null);
  const [noticeDiv, setNoticeDiv] = useState([]);
  const [resourceDiv, setResourceDiv] = useState([]);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  //useState로 나중에 넣기, admin임이 확인되면 생기는 버튼에 대한 처리
  const [isAdmin,setIsAdmin] = useState(true);

  let clickX = 0;
  let clickY = 0;


  useEffect(()=>{

    const name = window.localStorage.getItem('admin');
    console.log(name);
    const a = async()=>{
      try{
        const NoticeData = await getMainData('/api/notice');
        console.log(NoticeData[1])
        if(NoticeData!=null){
          setNoticeDiv(NoticeData[0]);
          setResourceDiv(NoticeData[1]);
        }
      }catch{

      }
      try{
        const ScheduleData = await getMainData('/api/schedule');
        console.log(ScheduleData);
      }catch{

      }

    }
    a();
    if(name=='1234'){
      setIsAdmin(false);
    }
  },[])

  return (
    <div>
    {isDropdownView !== null && <Dropdown 
      x={curX} 
      y={curY} 
      eventsArray={events[isDropdownView] || []}
      setDropdownView={setDropdownView}
    /> }    
    <Container>
      {isAdmin ? (<Login onClick={
        ()=>{window.location.href=`/login`}
      }>
        로그인
      </Login>):
      (<Login onClick={
        ()=>{
          window.localStorage.removeItem('admin')
          setIsAdmin(true)
        }}>로그아웃</Login>)}
      <Title>2023.2 Object Oriented Programming</Title>
      {      
      isAdmin ? null:(<CreateNewButton
          onClick = {
            ()=>{window.location.href='/createPage'}
          }
          >Add Schedule</CreateNewButton>) 
          
      }    
    <Caldiv>

        <FullCalendar
            plugins={[dayGridPlugin ]}
            initialView="dayGridMonth"
            contentHeight="auto" // 높이를 자동으로 조절
            aspectRatio={1.8}
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
              setCurX(clickX);
              setCurY(clickY);
              const date = arg.date.toISOString().split('T')[0]
              setDropdownView(date);
              console.log(isDropdownView);
              console.log(date);
                     
              // 기본 동작을 막고자 할 때는 아래와 같이 preventDefault()를 호출합니다.
            }}
          
            events={newArray}


  
        ></FullCalendar>


    </Caldiv>
      <Underdiv>
        <Noticediv>
          <NoticeTitle>Notice</NoticeTitle>
          <Notice onClick={
            ()=>{
              window.location.href=`/project/04`
            }}
          ></Notice>
          {
            Array.isArray(noticeDiv) ? (
              noticeDiv.map((notice, index) => {
                return <Notice key={index} title={notice.title} content={notice.contents} noticeId={notice.noticeId}> </Notice>
              })
            ) : null
          }
        </Noticediv>
        <Lecturediv>
          <NoticeTitle>
          {          
            Array.isArray(resourceDiv) ? (
              resourceDiv.map((resource, index) => {
                return<Resource title={resource.title} content={resource.contents}></Resource>
              })            
            ): null
          }
          </NoticeTitle>
        </Lecturediv>
      </Underdiv>
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

const CreateNewButton = styled.button`
  background-color: #f0f0f0; /* 연한 회색 */
  color: #333; /* 연한 검정색 */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #ccc; /* 마우스 호버 시 더 어두운 회색으로 변경 */
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

const Underdiv =styled.div`

    width :100%;
    height : auto;
    display : flex;
    flex-direction : row;
    justify-content : space-evenly; /* 올바른 속성명으로 수정 */
`

const Noticediv =styled.div`

    width : 40%;
    height:auto;
    display: flex;
    flex-direction : column;

`
const Lecturediv = styled.div`

  width : 40%;
  height:auto;
  display: flex;
  flex-direction : column;

` 

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
