import React,{useEffect, useState} from "react";

const UnmountTest = () => {
    useEffect(() => {
        return ()=>{
            // unmount 시점에 실행
        }
    }, []);

    return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {
    const [isVisible,setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);


    return (
        <div style={{padding : 20}}>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest/>}
        </div>

    );
};

Lifecycle.propTypes = {

};

export default Lifecycle;