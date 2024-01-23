import React from 'react';
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Diary from "./Diary";

type dummyList = Diary[];

const dummyList = [
    {
        id:1,
        author:"김진석",
        content:"하이 ~",
        emotion:5,
        create_date : new Date().getTime()
    },
    {
        id:2,
        author:"김진석2",
        content:"하이 ~2",
        emotion:2,
        create_date : new Date().getTime()
    },
    {
        id:3,
        author:"김진석3",
        content:"하이 ~3",
        emotion:5,
        create_date : new Date().getTime()
    }
]

function App() {
  return (
    <div className="App">
        <DiaryEditor/>
        <DiaryList diaryList={dummyList}/>
    </div>
  );
}

export default App;
