import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

let box : JSX.Element = <div></div>; 


function App() {

  const [listTitle, setListTitle] = useState(['To-do-List 만들기','블로그 만들기', '노션 업무 일지 작성하기'])
  const [detailTitle, setDetailTitle] = useState(['자바스크립트, yarn, 리액트, 타입스크립트이용하기,','다이어리 작성 하기','오늘의 업무 체크리스트 작성 하기'])

  const [date, setDate] = useState(['23-02-04', '23-02-03']);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(0);
  const [inputVal, setInputVal] = useState('')
  const [detailVal, setDetailVal] = useState('')

  const getYear = new Date().getFullYear();
  const getMonth = new Date().getMonth() +1;
  const getDate = new Date().getDate();
  const postDate = `${getYear}-${getMonth}-${getDate}`

  const [newDate, setNewDate] = useState(postDate)



  return (
    <div className="App">
      <div className='nav'>
        <div>To do List</div>
      </div>




    {
      listTitle.map(function(a,i){
        return(
          <div className='list' key={i} >
            <h4 onClick={()=>{setModal(!modal); setTitle(i)}}>할일: {a}</h4>
            <p>내용: {detailTitle[i]}</p>

            <button onClick={()=>{
              const copy = [...listTitle];
              copy.splice(i, 1)
              setListTitle(copy);

              const copy2 = [...detailTitle];
              copy2.splice(i, 1);
              setDetailTitle(copy2);

            }}>delete</button>

          

            
    
            <div className='inputEdit'>
              <h5 style={{marginBottom:'5px'}}>수정하기</h5>
              할일: <input  onChange={(e)=>{setInputVal(e.target.value); console.log(e.target.value)}}></input>
              <br></br>내용: <input onChange={(e)=>{setDetailVal(e.target.value); console.log(e.target.value)}}></input>
            </div>
        
          <button style={{marginTop:'5px'}} onClick={ ()=>{
            let editTitle = [...listTitle];
            editTitle[i] = `${inputVal}`;
            setListTitle(editTitle);

            let editDetail = [...detailTitle];
            editDetail[i] = `${detailVal}`;
            setDetailTitle(editDetail);

          }}>edit</button>
          
                        


            

        </div>
        )
      })  
    }

      {
        modal == true ? <Modal date={date} detailTitle={detailTitle} listTitle={listTitle} title={title} ></Modal>: null
        
      }

      <div className="post">
        <h3>To Do List 추가하기</h3>
        <div className='inputTitle'>
        할일제목<input  onChange={(e)=>{setInputVal(e.target.value); console.log(e.target.value)}}></input>
        </div>
        <div className='inputDetails'>
        할일내용<input onChange={(e)=>{setDetailVal(e.target.value); console.log(e.target.value)}}></input>
        </div>
        

        <button className='postBtn' onClick={()=>{
          const copy = [...listTitle];
          copy.unshift(inputVal);
          
          const copy2 = [...detailTitle];
          copy2.unshift(detailVal);
          
          const copy3 = [...date];
          copy3.unshift(newDate);
          setDate(copy3)
          
          
          setListTitle(copy);
          setDetailTitle(copy2);
        }}>post</button>
      </div>





    </div>
  );

}

function Modal(props : {listTitle:string[], detailTitle:string[], date:any, title:number}) {
  
  return(
    <div className='modal'>
      <h3>상세내용</h3>      
      <h4>할일제목: {props.listTitle[props.title]}</h4>
      <p>포스트날짜: {props.date[props.title]} </p>
      <p>할일내용: {props.detailTitle[props.title]}</p>

    </div>
  )
}




export default App;
