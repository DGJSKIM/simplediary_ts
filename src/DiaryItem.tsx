import React from 'react';
import Diary from "./Diary";

const DiaryItem:React.FC<Diary> = ({author,content,create_date,emotion,id}) => {
    return (
        <div className='DiaryItem'>
            <div className='info'>
                <span>
                    작성자 : {author} | 감정점수 : {emotion}
                </span>
                <br/>
                <span className="date">{new Date(create_date).toLocaleString()}</span>
            </div>
            <div className='content'>{content}</div>
        </div>
    );
};

export default DiaryItem;