import '../NoticeDetailed.css';
import React, { useState, useRef, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState} from 'draft-js';
import styled from 'styled-components';
import htmlToDraft from 'html-to-draftjs';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function NoticeDetailed() {
  


  //const [marketing, setMarketing] = React.useState(false);

  const editorRef = useRef(null);
  //처음에 true 로딩이 다 됬을때 false
  const isLoading = false;
  //content가 제대로 왔을때 false, content가 제대로 오지 않았을때 true
  const isWrong = false;


  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focusEditor();
      //console.log("1. Editor has the focus now");
    }
  };
  
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [qnaFile] = useState([
    { id: 1, value: '1.txt', url: 'https://example.com/1.txt' },
    { id: 2, value: '2.txt', url: 'https://example.com/2.txt' }
  ]);
  const fileOption = qnaFile.map(file => ({ value: file.value, label: file.value })); // 변경된 부분

  //const defaultOption = qnaFile[0].value;
  const defaultOption = 'Select';

  const [inputTitle, setInputTitle] = useState('None');
  const [inputDay, setInputDay] = useState('None');
  const [inputMemo, setInputMemo] = useState('None');

  const [responseUpdateData, setResponseUpdateDate] = useState();
  const [getId, setGetId] = useState();
  const [deleteUrl, setDeleteUrl] = useState();

  //let receivedHTML = '<ul><li><strong>The deadline: 2023-12-09</strong></li><li><span style="color: rgb(0,0,0);font-size: medium;font-family: Arial;"><strong>in your final report, please include the result of UML modeling</strong></span></li><li><span style="color: rgb(0,0,0);font-size: medium;font-family: AppleSDGothicNeoM00;">If </span><span style="color: rgb(0,0,0);background-color: rgb(247,218,100);font-size: medium;font-family: AppleSDGothicNeoM00;">your team size is one</span><span style="color: rgb(0,0,0);font-size: medium;font-family: AppleSDGothicNeoM00;"> (meaning you are the only student in your team or you did not register a team), you are supposed to do project 1, 2, and 3 as individual project (no report, no presentation). In this case, however, you are supposed to do project 4 as team project, which means you should submit report and presentation video file (.mp4) as well as source code for project 4.</span></li><li>#Notice</li></ul>';
  let receivedHTML = '';

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    
    const currentUrl = window.location.pathname; // 경로 부분만 가져오기
    setDeleteUrl(currentUrl);
    const id = parseInt(currentUrl.split("/").pop());
    setGetId(id);


    console.log(currentUrl)
    const getDetailNotice = async () => {
      try {
        const response = await axios.get(`https://oop.cien.or.kr/api${currentUrl}`);
        //console.log(response.data);
        return response.data;
      } catch (error) {
        return error;
      }
    };
    const fetchData = async () => {
      try {
        const responseData = await getDetailNotice();
        
        console.log(responseData);

        setResponseUpdateDate(responseData);

        setInputTitle(responseData.title); // 제목 처리
        receivedHTML = responseData.contents; // 본문 처리
        const blocksFromHtml = htmlToDraft(receivedHTML);
        if (blocksFromHtml) {
          const { contentBlocks, entityMap } = blocksFromHtml;

          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
      
         }

         // 파일 처리 부분 (추가 필요)

         if (responseData.isCalendar === true) {
          setInputDay(responseData.schedule.time); // 시간 처리
          setInputMemo(responseData.schedule.memo); // 메모 처리
         }
      } catch (error) {
        // 에러 처리
        console.error(error);
      }
    };

    fetchData();


    //receivedHTML = responseData.contents; 

    focusEditor();

    
  }, []);

  const deletingNotice = async () => {
    try {
      const url = deleteUrl;
      const response = await axios.delete(`https://oop.cien.or.kr/api${url}`);

    } catch (error) {
      console.error(error);
    }
  }

  const handleNavigate = () => {
    //console.log(responseUpdateData);
    //console.log(getId);
    navigate('/Update', { state: { responseUpdateData, getId } });
  };

  const handleFileChange = (selected) => {
    setSelectedFile(selected);

    // find the selected file by value
    const selectedFile = qnaFile.find(file => file.value === selected.value);

    if (selectedFile) {
      console.log('Selected File:', selectedFile.value, selectedFile.id, 'URL:', selectedFile.url);

      // Set the selected file's URL
      setSelectedFileUrl(selectedFile.url);
    }
  };

  const handleDownloadClick = () => {
    if (selectedFile && selectedFileUrl) {
      // Use the selected file's URL to create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = selectedFileUrl;
      downloadLink.download = selectedFile.value;
      downloadLink.click();
    }
  };

  const navigate = useNavigate();

  const handleInputTitleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleInputDayChange = (event) => {
    setInputDay(event.target.value);
  };

  return (
    <div className="App">
      {
        isLoading ? <h1> loading</h1>: 
          isWrong ? <h1>404</h1> :
          <form>
          <RealTitle><h1>Notice Page</h1></RealTitle>
        
        <Container>
        <Title2>
        
        <div className='Title3'>
        <label
          disabled={true} 
          type='text'
          name='Title'
          style={{width: "95%",
                  height: "40px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  paddingTop: '0.7rem',
                  
                  }
                  }
          value={inputTitle}
          onChange={handleInputTitleChange}
          
         >{inputTitle}</label></div>
         </Title2></Container>
         
         <div className='Notice'>
  
          
          <Container><Title2>
         <div className='Editor'>
        <Editor
          
          ref={editorRef}
          hashtag={{
            separator: ' ',
            trigger: '#',
          }}
          readOnly = {true}
          name='Body'
          editorState={editorState}
          wrapperClassName='wrapperClassName'
          //toolbarClassName='toolberClassName'
          //editorClassName="editorClassName"
          wrapperStyle={{textAlignment: 'flex-start',
                          width: '100%',
                          //border: '1px solid rgb(84, 84, 84)',
                          }}
                          
          editorStyle={{height: "100%",
                        backgroundColor: 'rgb(255,255,255)',
                        overflowY: 'auto',
                      textAlignment: 'center'}}      
          //toolbarHidden = {true}
          toolbarStyle={{display: 'none'}}
          
          onEditorStateChange={onEditorStateChange}
        /></div></Title2></Container>
  
        <Container>
        <Title>
        <Border>
        <Dropdown options={fileOption} onChange={handleFileChange} value={selectedFile || defaultOption}/>
        <SelectedFileUrl>
              {selectedFileUrl && (
                <p>
                  <strong style={{marginRight: '0.3rem'}}>Selected File URL:</strong> {selectedFileUrl}
                  <button style={{marginLeft: '0.5rem'}} onClick={handleDownloadClick}>Download</button>
                </p>
              )}
            </SelectedFileUrl>
          
       </Border></Title></Container>
  
  
        </div>
          
        
  
        <article>
        <Container><Title>
        <div className='AllowNotice'>
          <p><input name='Calender' disabled={true} 
          value={inputDay}
          onChange={handleInputDayChange}
          ></input></p></div>
        <label
          disabled={true} 
          type='text'
          name='Title'
          style={{
            border: '1px solid',
            width: "95%",
                  height: "40px",
                  fontSize: "20px",
                  
                  paddingTop: '0.7rem',
                  
                  }
                  }
          onChange={handleInputTitleChange}
          value={inputMemo}
          
         >{inputMemo}</label>
         
          </Title></Container>
      </article>
      
      <Container>
      <Title3>
      <Border2>
        <div className='WholeButton'
        style={{
          alignContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
      
      <StyledButton 
      style={{marginRight: '1rem'}}
      type='submit' 
      onClick={(event) => {
        event.preventDefault();
        handleNavigate(); 
  
        //sendTextToEditor("#Notice");  
      }}>Update</StyledButton> </div>
      
  
     
      <div className='WholeButton'>
      <StyledButton2 type='submit' 
      
      onClick={(event) => {
        alert("Delete the notice");
        deletingNotice();
        event.preventDefault();
        navigate('/');
        //sendTextToEditor("#Notice");  
      }}>Delete</StyledButton2></div>
      </Border2></Title3></Container>
      
      
  
  
      </form>

      }
    </div>
  );
}

export default NoticeDetailed;

const RealTitle = styled.div`

padding: 1rem
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.5rem;
  /* 다른 스타일들... */
`;

const Title = styled.div`
border: 2px solid rgb(84, 84, 84);
display: flex; /* 추가: flex 컨테이너로 설정 */
justify-content: center;
flex-direction: row; /* 또는 생략 가능: 기본값이 row 입니다 */
align-items: center;
width: 55%;
border-width: 2px;
border-radius: 8px; /* 수정: "bordoer-radius" -> "border-radius" */
padding: 8px 16px;
cursor: pointer;
`;

const Title2 = styled.div`
border: 2px solid rgb(84, 84, 84);
display: flex; /* 추가: flex 컨테이너로 설정 */
justify-content: flex-start;
flex-direction: row; /* 또는 생략 가능: 기본값이 row 입니다 */
align-items: flex-start;
width: 55%;
border-width: 2px;
border-radius: 8px; /* 수정: "bordoer-radius" -> "border-radius" */
padding: 8px 16px;
cursor: pointer;
`;

const Title3 = styled.div`
display: flex; /* 추가: flex 컨테이너로 설정 */
justify-content: center;
flex-direction: row; /* 또는 생략 가능: 기본값이 row 입니다 */
align-items: center;
width: 55%;
border-width: 2px;
border-radius: 8px; /* 수정: "bordoer-radius" -> "border-radius" */
padding: 8px 16px;
cursor: pointer;
`;

const Border = styled.div`
display: flex; /* 추가: flex 컨테이너로 설정 */
justify-content: center;
flex-direction: row; /* 또는 생략 가능: 기본값이 row 입니다 */
align-items: center;
width: 100%;
border-width: 2px;
border-radius: 8px; /* 수정: "bordoer-radius" -> "border-radius" */
padding: 8px 16px;
cursor: pointer;
`;

const Border2 = styled.div`
display: flex; /* 추가: flex 컨테이너로 설정 */
justify-content: flex-end;
flex-direction: row; /* 또는 생략 가능: 기본값이 row 입니다 */
align-items: flex-end;
width: 100%;
border-width: 2px;
border-radius: 8px; /* 수정: "bordoer-radius" -> "border-radius" */
padding: 8px 16px;
cursor: pointer;
`;

//border: 2px solid rgb(173, 194, 169);

const StyledButton = styled.button`
    background-color:rgb(186, 255, 156);
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

const StyledButton2 = styled.button`
    background-color:rgb(255, 156, 156);
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

const SelectedFileUrl = styled.div`
  padding: 0.5rem;
`;