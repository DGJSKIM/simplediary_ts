import React, {useRef, useState} from "react";
interface DiaryEditorProps {
    onCreate: (author: string, content: string, emotion: number) => void;

}

const DiaryEditor: React.FC<DiaryEditorProps>  = ({onCreate}) => {

    const authorInput = useRef<HTMLInputElement>(null);
    const contentInput = useRef<HTMLTextAreaElement>(null);


    const [state,setState] = useState({
        author : "",
        content : "",
        emotion : 1,
    })

    const handleChangeState = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        });
    }

    const handleSubmit = () =>{
        if(!validateState()){
            return;
        }
        console.log(state);
        onCreate(state.author, state.content, state.emotion);
        // 저장 후 초기화
        setState({
            author: "",
            content: "",
            emotion: 1
        })
        alert('저장 성공');
    }

    function validateState() {
        if (state.author.length < 1 && authorInput.current) {
            authorInput.current.focus();
            return false;
        }

        if (state.content.length < 5 && contentInput.current) {
            contentInput.current.focus();
            return false;
        }
        return true;
    }



    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    ref ={authorInput}
                    name = "author"
                    value = {state.author}
                    onChange={handleChangeState}/>
            </div>
            <div>
                <textarea
                    ref ={contentInput}
                    name = "content"
                    value = {state.content}
                    onChange={handleChangeState}/>
            </div>
            <div>오늘의 감정점수 :
                <select name={"emotion"} value={state.emotion} onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>저장</button>
            </div>
        </div>
    )
}

export default DiaryEditor;