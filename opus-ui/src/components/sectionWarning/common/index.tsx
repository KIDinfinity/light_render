import React from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import hotkeys from 'hotkeys-js';
import styles from './index.less';
import stylesWarn from './Warn/index.less';
import WarnComponent from './Warn/index';
import { warnComponentConfig, TypeEnum } from '../constants/index';

class Warn {
  trigger = (params: any) => {
    return new Promise((resolve) => {
      const newParams = this.getNewParams(params);
      const { sectionRef, domRef, sectionID, render, before } = newParams;

      lodash.forIn(
        {
          sectionRef,
          sectionID,
        },
        (value, key) => {
          if (!value) throw new Error(`${key} cannot be empty`);
        }
      );

      const targetRef = domRef || sectionRef;
      // eslint-disable-next-line
      const targetDom: any = ReactDOM.findDOMNode(targetRef?.current);
      // eslint-disable-next-line
      const sectionDom: any = ReactDOM.findDOMNode(sectionRef?.current);
      if (!targetDom) throw new Error(`${domRef ? 'domRef' : 'sectionRef'} is not a ref`);
      if (!sectionDom) throw new Error(`sectionRef is not a ref`);

      const shouldRenderWarn = before({ ...newParams, targetDom });
      if (!shouldRenderWarn) {
        resolve();
        return;
      }

      // 边框
      const targetDomParent: any = document.createElement('div');
      targetDomParent.className = styles.warnSection;
      targetDom.parentNode.replaceChild(targetDomParent, targetDom);
      targetDomParent.appendChild(targetDom);

      // 遮罩层
      const targetDomCover = document.createElement('div');
      targetDomCover.className = styles.targetCover;
      targetDom.appendChild(targetDomCover);

      const warnEle = document.createElement('div');
      warnEle.className = styles.warn;

      sectionDom.parentNode.insertBefore(warnEle, sectionDom);

      const onClick = (e: any) => {
        hotkeys.unbind('tab');
        hotkeys.unbind('enter');
        if (!lodash.includes(e.path, document.querySelector(`.${stylesWarn.messageContainer}`))) {
          if (!domRef) targetDomParent.parentNode.insertBefore(warnEle, targetDomParent);
          targetDomParent.parentNode.insertBefore(targetDom, targetDomParent);
          targetDomParent.parentNode.removeChild(targetDomParent);

          sectionDom.parentNode.removeChild(warnEle);
          targetDom.removeChild(targetDomCover);
          document.removeEventListener('click', onClick, true);
        }
      };
      document.addEventListener('click', onClick, true);

      ReactDOM.render(render(newParams, resolve), warnEle);
    });
  };

  // eslint-disable-next-line
  before = (params: any) => false;

  getNewParams = (params: any) => {
    const { before, render } = this;
    const type = params.type || TypeEnum.Delete;
    return {
      before,
      render,
      ...warnComponentConfig[type],
      ...params,
      type,
    };
  };

  render = (params: any, success: Function) => {
    return <WarnComponent {...params} success={success} />;
  };
}

export default Warn;
