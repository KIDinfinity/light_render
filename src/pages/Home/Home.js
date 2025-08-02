
import React,{useEffect} from 'react';
import './Home.css';
import useInitPage from '../_hooks/useInitPage';

function LightHome() {
  useInitPage();
    return (
        <div className={"LightHome"}>
            home
            <canvas id='webgl' width="100%" height="100%"></canvas>
        </div>)
}

export default LightHome;
