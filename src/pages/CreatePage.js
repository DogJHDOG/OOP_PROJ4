import '../App.css';
import React, { useState, useRef, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import styled from 'styled-components';
import draftjsToHtml from 'draftjs-to-html';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkbox({ children, disabled, checked, onChange }) {
  return (
    <label style={{
      flexDirection: 'row',
      alignItems: 'flex-start',
      textAlign: 'flex-start'
    }}>
      <input
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {children}
    </label>
  );
}



function CreatePage() {

  const [calenderMemo, setCalenderMemo] = React.useState(false);
  const [notice, setNotice] = React.useState(false);
  const [resource, setResource] = React.useState(false);
  //const [marketing, setMarketing] = React.useState(false);

  const editorRef = useRef(null);

  useEffect(() => {
    const name = window.localStorage.getItem('admin');
    if(name!=='1234'){
      window.location.href = '/';
    }
    focusEditor();

  }, []);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focusEditor();
      //console.log("1. Editor has the focus now");
    }
  };
  
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  

  const sendTextToEditor = (text) => {
      setEditorState(insertText(text, editorState));
      focusEditor();
  };

  const insertText = (text, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text
    );

    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    return  EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  };

  const [editorState, setEditorState] = useState( () => {
    EditorState.createEmpty()
  });

  const navigate = useNavigate();

  let id = 0;
  const [inputTitle, setInputTitle] = useState(null);
  const [convertedContent, setConvertedContent] = useState(null);
  const [inputDay, setInputDay] = useState(null);
  const [inputMemo, setInputMemo] = useState(null);
  const [inputFile, setInputFile] = useState(null);


  const handleInputTitleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleInputDayChange = (event) => {
    setInputDay(event.target.value);
  };

  const handleInputBodyChange = () => {

    
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    let html = draftjsToHtml(rawContentState);
    setConvertedContent(html);

  };

  const handleInputMemoChange = (event) => {
    setInputMemo(event.target.value);
  };

  const handleInputFileChange = (event) => {
    const fileinput = document.getElementById(event.target.id);
    const selectedFile = [...fileinput.files];
    //console.log(selectedFile);
    setInputFile(selectedFile);
  };

  const handleButtonClick = async () => {
    //console.log('ID', id);
    //console.log('Input Title:', inputTitle);
    //console.log('Input Day:', inputDay);
    //console.log('Input Memo:', inputMemo);
    //console.log('Input Body' , convertedContent);
    console.log('Input File', inputFile);
    //console.log('Notice Tag: ', notice);
    //console.log('Resource Tag: ', resource);


    const formData = new FormData();


    let tagName = null;
    //let createData = null;

    if (notice === true) {
      tagName = 'Notice'
    } else if (resource === true) {
      tagName = 'Resource'
    }
    
    const headers = {};

    if (inputFile !== null && inputFile.length > 0) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    if (calenderMemo === true) {
      formData.append("title", inputTitle);
      formData.append("contents", convertedContent);
      formData.append("isCalendar", calenderMemo);
      formData.append("tagName", tagName);
      formData.append("memo", inputMemo);
      formData.append("time", inputDay);

      if (inputFile !== null) {
        for (let i = 0; i < inputFile.length; i++) {
          formData.append("files", inputFile[i]);
        }
      }
      
    } else if (calenderMemo === false) {
      formData.append("title", inputTitle);
      formData.append("contents", convertedContent);
      formData.append("isCalendar", calenderMemo);
      formData.append("tagName", tagName);
      //formData.append("memo", inputMemo);
      //formData.append("time", inputDay);
      if (inputFile !== null) {
        for (let i = 0; i < inputFile.length; i++) {
          formData.append("files", inputFile[i]);
        }
      }
    }
    
    try {
      
      const response = await axios.post(
        'https://oop.cien.or.kr/api/notice',
        formData, {
          headers: {headers},
        }
      );
      console.log([...formData.entries()]);
      console.log('응답:', response.data);
      // 성공적인 경우 처리, 예를 들어 다른 페이지로 리다이렉트
      navigate('/');
    } catch (error) {
      console.error('에러:', error);
      // 에러 처리
    }
    
    // 이제 inputValue를 사용하여 원하는 작업을 수행할 수 있습니다.
  };

  return (
    <div className="App">
      <form><RealTitle>
      <h1>Creating Page</h1></RealTitle>
      
      <Container>
      <Title>
      <div className='Notice'>
      
      
      <input 
        
        type='text'
        name='Title'
        placeholder='Title...'
        style={{width: "95%",
                height: "40px",
                fontSize: "20px",
                marginTop: '1rem'
                }
                }
        value={inputTitle}
        onChange={handleInputTitleChange}

       ></input>
       
       <div className='Editor'>
      <Editor
        
        ref={editorRef}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
        name='Body'
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        wrapperStyle={{textAlignment: 'center'}}
        editorStyle={{height: "400px",
                    textAlignment: 'center'}}      
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
    bold: { className: undefined },
    italic: { className: undefined },
    underline: { className: undefined },
    strikethrough: { className: undefined },
    monospace: { className: undefined },
    superscript: { className: undefined },
    subscript: { className: undefined },
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontSize: {
    
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { className: undefined },
    ordered: { className: undefined },
    indent: { className: undefined },
    outdent: { className: undefined },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
    left: { className: undefined },
    center: { className: undefined },
    right: { className: undefined },
    justify: { className: undefined },
  },
  colorPicker: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: './hello.txt',
    options: ['link', 'unlink'],
    link: { className: undefined },
    unlink: { className: undefined },
    linkCallback: undefined
  },
  embedded: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  remove: { className: undefined, component: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    undo: { className: undefined },
    redo: { className: undefined },
  },
        }}
        
        onEditorStateChange={onEditorStateChange}
        onContentStateChange={handleInputBodyChange}
        placeholder="The message goes here..."
      /></div>

      <Border>
      <div className='File'>
      <input type="file" id="fileUpload"
        multiple={true}
        onChange={handleInputFileChange}
        style={{alignItems: 'flex-start',
                flexDirection: 'row',
                padding: '1rem'}}

        
        ></input></div>

      <div className='Tags'>
      <Checkbox 
      style = {{fontSize: "20px",
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '1rem'}}
      name='mycheckbox' 
      disabled={resource}
      checked={notice} 
      onChange={(checked) => {
        setNotice(checked);
        if (checked) {
          sendTextToEditor('#Notice');
        }
      }}
      >Notice
      </Checkbox></div>

      <div className='Tags'>
      <Checkbox 
      style = {{fontSize: "20px",
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '1rem'}}
      name='mycheckbox' 
      disabled={notice}
      checked={resource} 
      onChange={(checked) => {
        setResource(checked);
        if (checked) {
          sendTextToEditor('#Resource');
        }
      }}
      >Resource
      </Checkbox></div></Border>
      </div>
        </Title></Container>
      

      <article>
      <Container><Title>
      <p>
        <div className='AllowNotice'>
      <Checkbox 
      style = {{fontSize: "20px",
      flexDirection: 'row',
      alignItems: 'flex-start'}}
      name='mycheckbox' checked={calenderMemo} onChange={setCalenderMemo}>
        Allow Calendar Schedule 
      </Checkbox></div></p>
        
        <div className='AllowNotice'>
        <p><input name='Calender' disabled={!calenderMemo} placeholder='Ex) 2022-12-04'
        value={inputDay}
        onChange={handleInputDayChange}
        ></input></p></div>

        <div className='AllowNotice'>
        <p><textarea name='Memo' disabled={!calenderMemo} placeholder='Memo..'
        value={inputMemo}
        onChange={handleInputMemoChange}
        ></textarea></p></div></Title></Container>
    </article>
    
    
    <p>
    <StyledButton type='submit' 
    disabled={!notice && !resource}
    onClick={(event) => {
      
      id = id + 1;
      event.preventDefault();
      handleButtonClick();
      // navigate('/');
      //sendTextToEditor("#Notice");  
    }}>Create</StyledButton>
    </p>
    </form>
    </div>
  );
}

export default CreatePage;

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

//border: 2px solid rgb(173, 194, 169);

const StyledButton = styled.button`
    background-color:rgb(112, 189, 255);
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;