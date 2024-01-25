import React, {useRef, useState} from 'react';
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Diary from "./Diary";

// type dummyList = Diary[];
// const dummyList = [
//     {
//         id:1,
//         author:"김진석",
//         content:"하이 ~",
//         emotion:5,
//         create_date : new Date().getTime()
//     },
//     {
//         id:2,
//         author:"김진석2",
//         content:"하이 ~2",
//         emotion:2,
//         create_date : new Date().getTime()
//     },
//     {
//         id:3,
//         author:"김진석3",
//         content:"하이 ~3",
//         emotion:5,
//         create_date : new Date().getTime()
//     }
// ]

function App() {
    const [data ,setData] = useState<Diary[]>([]);

    const dataId = useRef(0);
    const onCreate = (author:string, content:string, emotion:number) =>{
        const created_date:number = new Date().getTime();

        const newItem : Diary = {
            author,
            content,
            emotion,
            created_date,
            id : dataId.current
        }
        dataId.current += 1;
        setData([newItem,...data])
    }

  return (
    <div className="App">
        <DiaryEditor onCreate = {onCreate}/>
        <DiaryList diaryList={data}/>
    </div>
  );
}

export default App;
