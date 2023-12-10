import React from 'react'
import styled from 'styled-components';

const Resource = ({title,content, noticeId
}) => {
  return (
    <HoverDiv onClick={()=>{
      window.location.href=`/notice/${noticeId}`
    }}>
        <Title>
            {title}
        </Title>
        <Content>
            <div dangerouslySetInnerHTML={{ __html: content }}/>
        </Content>
    </HoverDiv>
  )
}

export default Resource



const HoverDiv = styled.div`
  width: 100%;
  height: auto;
  background-color: #F8F9FA; 
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #bdc3c7; /* 연한 회색으로 변경 */
  }
`;


const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 15px;
  line-height: 1.5;
  margin-top: 16px; /* 콘텐츠 위에 간격 추가 */
`;