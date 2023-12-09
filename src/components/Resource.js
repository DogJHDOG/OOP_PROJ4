import React from 'react'
import styled from 'styled-components';

const Resource = ({title,content}) => {
  return (
    <div>
        <Title>
            {title}
        </Title>
        <Content>
            <div dangerouslySetInnerHTML={{ __html: content }}/>
        </Content>
    </div>
  )
}

export default Resource


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