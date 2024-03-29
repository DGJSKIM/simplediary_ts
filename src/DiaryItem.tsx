import React, {useContext, useEffect, useRef, useState} from 'react';
import Diary from "./Diary";
import {DiaryDispatchContext} from "./App";

type DiaryItemProps = {
    Diary: Diary,

}

const DiaryItem:React.FC<DiaryItemProps> = ({Diary}) => {
    const {onRemove, onEdit} = useContext(DiaryDispatchContext)

    const { id,author, content, created_date, emotion } = Diary;
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent,setLocalContent] = useState(content);
    const localContentInput = useRef<HTMLTextAreaElement>(null);



    const handleRemove = () =>{
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    }

    const handleQuitEdit = ()=>{
        setIsEdit(false);
        setLocalContent(content);
    }

    const handleEdit =() =>{

        if (localContent.length < 5 && localContentInput.current) {
            localContentInput.current.focus();
            return false;
        }
        if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
            onEdit(id,localContent);
            setIsEdit(false);
        }

    }

    return (
        <div className='DiaryItem'>
            <div className='info'>
                <span>
                    작성자 : {author} | 감정점수 : {emotion}
                </span>
                <br/>
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className='content'>
                {isEdit ?
                    (
                        <>
                            <textarea ref={localContentInput}
                                value={localContent}
                                onChange={(e)=>setLocalContent(e.target.value)}
                            />
                        </>
                    ):(
                        <>{content}</>
                    )}
            </div>
            {isEdit ? (
                <>
                    <button onClick={handleQuitEdit}>수정 취소하기</button>
                    <button onClick={handleEdit}>수정완료</button>
                </>
            ) : (
                <>
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )}
        </div>
    )
        ;
};

export default React.memo(DiaryItem);