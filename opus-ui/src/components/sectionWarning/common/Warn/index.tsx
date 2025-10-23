import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Button } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import hotkeys from 'hotkeys-js';
import styles from './index.less';

// eslint-disable-next-line
enum ActiveBtn {
  NO = 'NO',
  YES = 'YES',
}

export default ({ success, icon, message }: any) => {
  const warningMessageRef: any = useRef();
  const yesRef: any = useRef();
  const [isLinebreak, setIsLinebreak]: any = useState(null);
  const [activeBtn, setActiveBtn]: any = useState(ActiveBtn.NO);
  const messageHeight = 28;

  useEffect(() => {
    setIsLinebreak(warningMessageRef.current.offsetHeight > messageHeight);
  }, []);

  useEffect(() => {
    hotkeys('tab', (event: any) => {
      event.preventDefault();
      setActiveBtn(activeBtn === ActiveBtn.NO ? ActiveBtn.YES : ActiveBtn.NO);
    });

    hotkeys('enter', (e: any) => {
      e.preventDefault();
      const event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      if (activeBtn === ActiveBtn.NO) {
        document.dispatchEvent(event);
      } else {
        // eslint-disable-next-line
        ReactDOM.findDOMNode(yesRef.current)?.dispatchEvent(event);
      }
    });

    return () => {
      hotkeys.unbind('tab');
      hotkeys.unbind('enter');
    };
  }, [activeBtn]);

  return (
    <>
      <div
        className={classnames({
          [styles.warning]: true,
          [styles.line]: !isLinebreak,
          [styles.show]: lodash.isBoolean(isLinebreak),
        })}
      >
        <div className={styles.messageContainer}>
          <div>
            <Icon className={styles.warningIcon} type={icon} />
          </div>
          <div className={styles.warningMessage} ref={warningMessageRef}>
            {message}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            ref={yesRef}
            onClick={success}
            size="small"
            className={activeBtn === 'YES' ? styles.activeBtn : ''}
          >
            {formatMessageApi({ Label_BPM_Button: 'app.navigator.drawer.messager.button.yes' })}
          </Button>
          &nbsp;&nbsp;
          <Button size="small" className={activeBtn === 'NO' ? styles.activeBtn : ''}>
            {formatMessageApi({ Label_BPM_Button: 'app.navigator.drawer.messager.button.no' })}
          </Button>
        </div>
      </div>
    </>
  );
};
