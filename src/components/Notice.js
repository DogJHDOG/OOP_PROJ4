import React from 'react';
import styled from 'styled-components';
import { getDetailNotice } from '../apis/Axios';

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-top: 16px; /* 콘텐츠 위에 간격 추가 */
`;

const Notice = ({ title,content, noticeId}) => {

  return (
    <div>
      <Title onClick={()=>{
        window.location.href=`/notice/${noticeId}`
      }}>
        {title}
      </Title>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Content>
    </div>
  );
};

export default Notice;
