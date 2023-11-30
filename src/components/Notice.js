import React from 'react';
import styled from 'styled-components';

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

const Notice = () => {
  return (
    <div>
      <Title>
        Project 4
      </Title>
      <Content>
        In your final report, please include the result of UML modeling (class diagram, use case diagram and activity diagram).
        <br />
        Introduction to UML
        <br />
        StarUML - Open Source UML Platform
        <br />
        Team-Project Presentation Schedule
        <br />      
        </Content>
    </div>
  );
};

export default Notice;
