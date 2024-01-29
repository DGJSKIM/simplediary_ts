import React, {useState} from 'react';

const CounterA = React.memo(({count}:{count:number})=>{
    console.log(`CounterA Update - count: ${count}`);
    return <div>{count}</div>
});

type objType = {
    count : number;
}
const CounterB = ({obj}:{obj:objType})=>{
    console.log(`CounterB Update - count: ${obj.count}`);
    // 자바스크립트에서는 객체를 비교시 얕은 비교(주소에 의한 비교)를 하기 때문에 렌더링이 된다
    return <div>{obj.count}</div>
};

const areEqual = (prevProps: { obj: objType }, nextProps: { obj: objType }) => {
    return prevProps.obj.count === nextProps.obj.count;
};


const MemoizedCounterB = React.memo(CounterB,areEqual);

const OptimizeTest2 = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState<objType>({
        count : 1
    });

    return(
        <div style={{padding:50}}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count}/>
                <button onClick={() => setCount(count)}>A button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj}/>
                <button onClick={() => setObj({
                    count: obj.count
                })}>B button</button>
            </div>
        </div>
    )
};

export default OptimizeTest2;