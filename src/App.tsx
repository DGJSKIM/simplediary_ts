import React, {useCallback, useEffect, useMemo, useReducer, useRef} from 'react';
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Diary from "./Diary";

type jsonData = {
    email : string,
    body : string,
    emotion : number,
}
const reducer =(state : any , action:any)=> {
    switch (action.type){
        case 'INIT':{
            return action.data;
        }
        case 'CREATE': {
            const created_date:number = new Date().getTime();
            const newItem = {
                ...action.data,
                created_date
            }
            return [newItem, ...state];
        }
        case 'REMOVE':{
            return state.filter((it:Diary)=> it.id !== action.targetId);
        }
        case 'EDIT':{
            return state.map((it:Diary)=> it.id === action.targetId?{...it,content:action.newContent}:it);
        }
        default :
        return
    }
}
function App() {
    // const [data ,setData] = useState<Diary[]>([]);

    const [data, dispatch] = useReducer(reducer, []);
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
        dispatch({type:"INIT", data:initData})
    };

    useEffect(() => {
        getData();
    }, []);
    const onCreate = useCallback((author:string, content:string, emotion:number) =>{

        dispatch({
            type:"CREATE",
            data:{author,
                content,
                emotion,
                // created_date, 얘는 어차피 안받아와도 만들 수 있는 값이니 안넘김
                id : dataId.current
            }
        });
        dataId.current += 1;
    },[]); // 마운트 되는 시점에 한번만 만들어지고 그다음부터는 생성했던 거 그대로씀
    // => onCreate 가 변하지 않으므로 삭제할때마다 editor 가 리렌더 되는 현상 사라짐
    // 맨처음 생성될 때는 data 가 빈배열이므로 항상 data 가 빈배열인 줄 안다
    // 그래서 함수형 업데이트를 통해 현재값을 가져와서 newItem 을 추가하는 콜백함수를 setData 에 전달
    // 즉 추가할때의 data 를 참조하기 위해 함수형 업데이트를 사용하는것

    const onRemove = useCallback((targetId:number) =>{
        dispatch({type:"REMOVE",targetId})
    },[]);

    const onEdit = useCallback((targetId:number, newContent:string) =>{
        dispatch({type:"EDIT",targetId, newContent})
    },[]);


    const getDiaryAnalysis = useMemo(
        () => {
            const goodCount: number = data.filter((it:Diary) => it.emotion >= 3).length;
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
