// PasswordInput.js

import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일을 정의한 컴포넌트
const Container = styled.div`
  margin: 20px;
  display: flex;
  gap : 10px;
  flex-direction: column; /* 세로(column) 방향으로 변경 */
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  height: 100vh; /* 뷰포트 높이에 맞게 설정 */
  `;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const LoginButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const Login = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      console.log('비밀번호:', password);
      if(password ==='1234'){
        window.localStorage.setItem('admin', '1234');
        window.location.href='/'
      }
    }
  }; 
  const handleLoginButtonClick = () => {
    console.log('비밀번호:', password);
    if(password==='1234'){
      window.localStorage.setItem('admin', '1234');
      window.location.href='/'
    }
  }; 
  return (
    <Container>
      <ProfileImage src="logo192.png" alt="Profile" />
      <div>
        <Label htmlFor="password">비밀번호:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handleEnterPress}

      />
      </div>
      <LoginButton onClick={handleLoginButtonClick}>로그인</LoginButton>

    </Container>
  );
};

export default Login;
