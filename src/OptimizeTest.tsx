import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const TextView = React.memo(({ text }: { text: string })=>{
    useEffect(() => {
        console.log(`Update :: text : ${text}`)
    });
    return <div>{text}</div>
});

const CountView =  React.memo(({ count }: { count: number })=>{
    useEffect(() => {
        console.log(`Update :: count : ${count}`)
    });
    return <div>{count}</div>
});
//React.memo 같은 prop 일 시에 렌더링 안하겠다



const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [text, setText] = useState("");
    return (
        <div style={{padding: 50}}>
            <div>
                <h2>count</h2>
                <CountView count={count}/>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div>
                <h2>text</h2>
                <TextView text={text}/>
                <input value={text} onChange={(e) => setText(e.target.value)}/>
            </div>

        </div>
    );
};

OptimizeTest.propTypes = {};

export default OptimizeTest;