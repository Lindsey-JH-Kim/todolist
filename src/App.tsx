import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

import dayjs from "dayjs";

// import relativeTime from 'dayjs/plugin/relativetime' // import plugin
// import 'dayjs/locale/ko' // import locale

// dayjs.extend(relativeTime) // use plugin
dayjs.locale("ko"); // use locale

let box: JSX.Element = <div></div>;

function App() {
  const [listTitle, setListTitle] = useState([
    { title: "To-do-List 만들기", isEdit: false },
    { title: "To-do-List 만들기", isEdit: false },
    { title: "To-do-List 만들기", isEdit: false },
  ]);
  const [detailTitle, setDetailTitle] = useState([
    "자바스크립트, yarn, 리액트, 타입스크립트이용하기,",
    "다이어리 작성 하기",
    "오늘의 업무 체크리스트 작성 하기",
  ]);

  const [date, setDate] = useState(["23-02-04", "23-02-03", "23-02-01"]);
  const [date2, setDate2] = useState(["", "", ""]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [detailVal, setDetailVal] = useState("");

  const getYear = new Date().getFullYear();
  const getMonth = new Date().getMonth() + 1;
  const getDate = new Date().getDate();
  // const postDate = `${getYear}-${getMonth}-${getDate}`
  const postDate = dayjs(new Date()).format("YYYY-MM-DD HH:mm");

  const [newDate, setNewDate] = useState(postDate);
  const [editDate, setEditDate] = useState(postDate);

  // const dayjs = require('dayjs')
  // dayjs().format()

  interface IProps {
    index: number;
  }
  const EditComp = ({ index }: IProps) => {
    //---------------------------------------------------
    // 에디트 토글
    const [editToggle, setEditToggle] = useState(false);
    //---------------------------------------------------
    return (
      <div className="inputEdit">
        <h5 style={{ marginBottom: "5px" }}>수정하기</h5>
        할일:{" "}
        <input
          onChange={(e) => {
            setInputVal(e.target.value);
            console.log(e.target.value);
          }}
        ></input>
        <br></br>내용:{" "}
        <input
          onChange={(e) => {
            setDetailVal(e.target.value);
            console.log(e.target.value);
          }}
        ></input>
        <button
          style={{ marginTop: "5px" }}
          onClick={() => {
            let editTitle = [...listTitle];
            editTitle[index].title = `${inputVal}`;
            setListTitle(editTitle);

            let editDetail = [...detailTitle];
            editDetail[index] = `${detailVal}`;
            setDetailTitle(editDetail);

            const copyEditDate = [...date2];
            copyEditDate.unshift(editDate);
            setDate2(copyEditDate);
          }}
        >
          edit
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="nav">
        <div>To do List</div>
      </div>

      {listTitle.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setTitle(i);
              }}
            >
              할일: {a.title}
            </h4>
            <p>내용: {detailTitle[i]}</p>

            <button
              onClick={() => {
                const copy = [...listTitle];
                copy.splice(i, 1);
                setListTitle(copy);

                const copy2 = [...detailTitle];
                copy2.splice(i, 1);
                setDetailTitle(copy2);
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                const newArr = listTitle;
                newArr[i].isEdit = !newArr[i].isEdit;
                setListTitle([...newArr]);
              }}
            >
              Edit
            </button>

            {a.isEdit && <EditComp index={i} />}
            {/* <div className='inputEdit'>
              <h5 style={{marginBottom:'5px'}}>수정하기</h5>
              할일: <input  onChange={(e)=>{setInputVal(e.target.value); console.log(e.target.value)}}></input>
              <br></br>내용: <input onChange={(e)=>{setDetailVal(e.target.value); console.log(e.target.value)}}></input>
            </div> */}
          </div>
        );
      })}

      {modal == true ? (
        <Modal
          date={date}
          date2={date2}
          detailTitle={detailTitle}
          listTitle={listTitle.map((o) => o.title)}
          title={title}
        ></Modal>
      ) : null}

      <div className="post">
        <h3>To Do List 추가하기</h3>
        <div className="inputTitle">
          할일제목
          <input
            onChange={(e) => {
              setInputVal(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
        </div>
        <div className="inputDetails">
          할일내용
          <input
            onChange={(e) => {
              setDetailVal(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
        </div>

        <button
          className="postBtn"
          onClick={() => {
            const copy = [...listTitle];
            copy.unshift({ title: inputVal, isEdit: false });

            const copy2 = [...detailTitle];
            copy2.unshift(detailVal);

            const copy3 = [...date];
            copy3.unshift(newDate);
            setDate(copy3);

            setListTitle(copy);
            setDetailTitle(copy2);
          }}
        >
          post
        </button>
      </div>

      <script
        src="
https://cdn.jsdelivr.net/npm/dayjs@1.11.7/dayjs.min.js
"
      ></script>
    </div>
  );
}

function Modal(props: {
  listTitle: string[];
  detailTitle: string[];
  date: any;
  date2: any;
  title: number;
}) {
  return (
    <div className="modal">
      <h3>상세내용</h3>
      <h4>할일제목: {props.listTitle[props.title]}</h4>
      <p>포스트날짜: {props.date[props.title]} </p>
      <p>수정한 날짜: {props.date2[props.title]} </p>
      <p>할일내용: {props.detailTitle[props.title]}</p>
    </div>
  );
}

export default App;
