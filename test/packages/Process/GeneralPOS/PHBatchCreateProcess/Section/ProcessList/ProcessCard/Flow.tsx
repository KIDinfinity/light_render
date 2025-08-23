import React, { useState, useRef, useEffect } from 'react';
import lodash from 'lodash';
import styles from './flow.less';
import FlowUtils from 'phowb/utils/flow';
import { useResponsivePx } from '@/utils/responsiveUtils';

const flowUtil = new FlowUtils();

const Flow = ({ process }) => {
  const [containerConfig, setContainerConfig] = useState({
    width: 800,
    height: 140,
  });
  const container = useRef(null);
  const id = process.id + process.caseCategory;
  useEffect(() => {
    if (container !== null && process) {
      const formatResult = flowUtil.formatProcess({
        process,
        startLocation: {
          x: 20,
          y: 50,
        },
        spacing: {
          x: 100,
          y: 0,
        },
      });
      const { drawData } = lodash.pick(formatResult, ['drawData']);
      flowUtil.init({
        container: id,
        width: containerConfig.width,
        height: containerConfig.height,
      });
      flowUtil.data(drawData);
      flowUtil.render();
    }
  }, [process, container]);
  const [actualHeight, setHeight] = useState(0);
  const scale = useResponsivePx(1);

  useEffect(() => {
    const svgContainer = document.getElementById(id);
    console.log('svgContainer', svgContainer)
    if(svgContainer) {
      const observer = new ResizeObserver(entries => {
        const height = entries?.[0]?.contentRect?.height;
        console.log('on observe', height, scale)

        if(height) {
          setHeight(height);
        }
      })
      observer.observe(svgContainer);
      return () => {
        observer.disconnect();
      }
    }
    return () => {}
  }, [])

  return (
    <div className={styles.wrap} style={{ height: actualHeight? actualHeight * scale : void 0}}>
      <div style={{transform: `scale(${scale})`, transformOrigin: 'left 0'}} id={id} />
    </div>
  );
};

export default Flow;
