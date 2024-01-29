import React, {useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Diary from "./Diary";

type jsonData = {
    email : string,
    body : string,
    emotion : number,
}
function App() {
    const [data ,setData] = useState<Diary[]>([]);

    const dataId = useRef(0);

    const getData = async() => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        ).then((res) => res.json());

        const initData = res.slice(0, 20).map((it:jsonData) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id : dataId.current++
            }as Diary;
        });
        setData(initData);
    };

    useEffect(() => {
        getData();
    }, []);
    const onCreate = (author:string, content:string, emotion:number) =>{
        const created_date:number = new Date().getTime();

        dataId.current += 1;
        const newItem : Diary = {
            author,
            content,
            emotion,
            created_date,
            id : dataId.current
        }

        setData([newItem,...data])
    }
    const onRemove = (targetId:number) =>{
        const newDiaryList:Diary[] = data.filter((it:Diary) => it.id !== targetId);
        setData(newDiaryList);
    };

    const onEdit =(targetId:number, newContent:string) =>{
        setData(
            data.map((it)=>
                it.id === targetId ? {...it, content : newContent}:it
            )
        );
    };


    const getDiaryAnalysis = useMemo(
        () => {
            const goodCount: number = data.filter((it) => it.emotion >= 3).length;
            const badCount: number = data.length - goodCount;
            const goodRatio: number = (goodCount / data.length) * 100;
            return {goodCount, badCount, goodRatio};
        },[data.length] // data.length 변할때만 계산한다
    );

    const {goodCount,badCount,goodRatio} = getDiaryAnalysis;
    // 함수를 리턴하는게 아니라 함수가 리턴하는 값을 리턴하므로 getDiaryAnalysis() 가 아닌 getDiaryAnalysis 가 된다

  return (
      <div className="App">
          {/*<OptimizeTest/>*/}
          {/*<OptimizeTest2/>*/}
          <DiaryEditor onCreate={onCreate}/>
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data}/>
      </div>
  );
}

export default App;
