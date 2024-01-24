import React from 'react';
import Diary from "./Diary";
import DiaryItem from "./DiaryItem";

type DiaryListProps = {
    diaryList: Diary[];
};
const DiaryList:React.FC<DiaryListProps> = ({diaryList}) => {
    console.log(diaryList);
    return (
        <div className='DiaryList'>
            <h2>일기 리스트2</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it, idx)=>(
                    <DiaryItem key={it.id} {...it}/>
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps={
    diaryList:[]
}

export default DiaryList;

