import React, {useContext} from 'react';
import Diary from "./Diary";
import DiaryItem from "./DiaryItem";
import {DiaryStateContext} from "./App";

type DiaryListProps = {
    onRemove(targetId: number) : void,
    onEdit : (targetId:number, newContent:string) => void
};
const DiaryList:React.FC<DiaryListProps> = () => {
    const diaryList:Diary[] = useContext(DiaryStateContext);
    return (
        <div className='DiaryList'>
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it)=>(
                    <DiaryItem  key={it.id} Diary={it} />
                ))}
            </div>
        </div>
    );
};


export default DiaryList;

