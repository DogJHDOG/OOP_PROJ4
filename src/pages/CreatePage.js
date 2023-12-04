import '../App.css';
import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import styled from 'styled-components';
import { convertToHTML } from 'draft-convert';


function Checkbox({ children, disabled, checked, onChange }) {
  return (
    <label>
      <input
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
  //const [marketing, setMarketing] = React.useState(false);

  const [editorState, setEditorState] = useState( () => {
    EditorState.createEmpty()
  });

  const [inputTitle, setInputTitle] = useState('');
  const [convertedContent, setConvertedContent] = useState(null);
  const [inputDay, setInputDay] = useState('');
  const [inputMemo, setInputMemo] = useState('');
  const [inputFile, setInputFile] = useState();


  const handleInputTitleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleInputDayChange = (event) => {
    setInputDay(event.target.value);
  };

  const handleInputBodyChange = () => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  };

  const handleInputMemoChange = (event) => {
    setInputMemo(event.target.value);
  };

  const handleInputFileChange = (event) => {
    const fileinput = document.getElementById(event.target.id);
    const selectedFile = fileinput.files[0];
    //console.log(selectedFile);
    setInputFile(selectedFile);
  };

  const handleButtonClick = () => {
    console.log('Input Title:', inputTitle);
    console.log('Input Day:', inputDay);
    console.log('Input Memo:', inputMemo);
    console.log('Input Body' , convertedContent);
    console.log('Input File', inputFile);
    // 이제 inputValue를 사용하여 원하는 작업을 수행할 수 있습니다.
  };

  return (
    <div className="App">
      <form>
      <h2>Writing Page</h2>
      <Title>
      <input 
        type='text'
        name='Title'
        placeholder='Title...'
        style={{width: "1000px"}}
        value={inputTitle}
        onChange={handleInputTitleChange}

       ></input></Title>
      <Editor
        name='Body'
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
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
    defaultTargetOption: '_self',
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
        
        onEditorStateChange={setEditorState}
        onContentStateChange={handleInputBodyChange}
        placeholder="The message goes here..."
      />
      
      <Title>
      <article>
      <header>
        <h3>Calaneder & Memo</h3>
      </header>
      <p>
      <Checkbox name='mycheckbox' checked={calenderMemo} onChange={setCalenderMemo}>
        Allow Caleander Schedule 
      </Checkbox></p>
        <p><input name='Calender' disabled={!calenderMemo} placeholder='Ex) 2022-12-04'
        value={inputDay}
        onChange={handleInputDayChange}
        ></input></p>
        <p><textarea name='Memo' disabled={!calenderMemo} placeholder='Memo..'
        value={inputMemo}
        onChange={handleInputMemoChange}
        ></textarea></p>
    </article></Title>
    <Title>
        <h3>File upload</h3>
        <input type="file" id="fileUpload"
        onChange={handleInputFileChange}
        />
    </Title>
    <p>
    <button type='submit' onClick={(event) => {
      event.preventDefault();
      handleButtonClick();
    }}>Create</button>
    </p>
    </form>
    </div>
  );
}

export default CreatePage;

const Title = styled.div`
border: 2px solid rgb(177, 187, 228);
padding: 1rem
`;

const Body = styled.div`
background-color:rgb(222, 222, 239);
    border-radius: 10px;  
    padding: 1rem; 
    `;
