import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './LabelSection.less';
import styles2 from '../TotalSummary/index.less';

export default function LabelSection({ children, incidentId, trackClass }: any) {
  const [style, setStyle] = useState({ width: 0, left: 0 });
  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wait = useRef(0);
  const onResize = (entries: any) => {
    if (wait.current > 0) return;
    wait.current += 1;
    setTimeout(() => {
      wait.current = 0;
      const documentCss = entries[0].target?.getBoundingClientRect();
      if (documentCss) {
        setStyle({ width: Math.ceil(documentCss.width), left: Math.floor(documentCss.left) });
      }
    }, 150);
  };
  const onScroll = () => {
    if (isOpen) return;

    const incidentDom = document.getElementById(`${incidentId}`);
    const boxDom = incidentDom
      ?.querySelector(`.${trackClass}`)
      ?.querySelector(`.${styles2.totalSummary}`);
    if (incidentDom && boxDom) {
      const incidentBottom = incidentDom.getBoundingClientRect().bottom;
      const boxBottom = boxDom.getBoundingClientRect().bottom;

      const dom = document.getElementById(`${incidentId}`)?.querySelector(`.${trackClass}`);
      let resizeObserver: any;
      if (dom) {
        resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(dom);
      }

      if (isShow && (boxBottom > 160 || incidentBottom < 200)) {
        setIsShow(false);
      }
      if (!isShow && boxBottom < 160 && incidentBottom > 200) {
        setIsShow(true);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [isShow]);

  useEffect(() => {
    const dom = document.getElementById(`${incidentId}`)?.querySelector(`.${trackClass}`);
    let resizeObserver: any;
    if (dom) {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(dom);
    }
    return () => {
      if (dom) {
        resizeObserver.unobserve(dom);
      }
    };
  }, []);
  return (
    <div>
      {isShow && (
        <div
          className={classnames(styles.float, {
            [styles.zIndex]: isShow,
          })}
          style={style}
        >
          <div
            className={classnames(styles.mask, {
              [styles.zIndex]: isShow,
            })}
            onMouseEnter={() => {
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              setIsOpen(false);
            }}
          />
          <div
            className={classnames(styles.floatContent, {
              [styles.hiddenContent]: !isOpen,
              [styles.hiddenBox]: !isShow,
            })}
          >
            {React.cloneElement(children, {
              isLabel: true,
              showPolicy: isOpen,
            })}
          </div>
        </div>
      )}
    </div>
  );
}
