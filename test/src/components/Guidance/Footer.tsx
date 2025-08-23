import React, { useMemo } from 'react';
import { Button } from 'antd';
import styles from './Guidance.less';

const Footer = ({
  guidanceIndex,
  List,
  handleCloseClick,
  handleNextClick,
  prevNumber,
  nextNumber,
}) => {
  const footerBtn = useMemo(() => {
    const { freeButton, hiddenNext, hiddenClose, hiddenDone } = List?.[guidanceIndex] || {};
    if (!freeButton) {
      return guidanceIndex < List.length - 1 ? (
        <div>
          <Button key="close" onClick={handleCloseClick}>
            Close
          </Button>
          {List?.[guidanceIndex]?.hiddenNext ? (
            <></>
          ) : (
            <Button key="next" onClick={handleNextClick}>
              Next
            </Button>
          )}
        </div>
      ) : (
        <div>
          <Button key="close" className="Done" onClick={handleCloseClick}>
            Done
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          {!hiddenClose && (
            <Button key="close" onClick={handleCloseClick}>
              Close
            </Button>
          )}
          {!hiddenNext && (
            <Button key="next" onClick={handleNextClick}>
              Next
            </Button>
          )}
          {!hiddenDone && (
            <Button key="close" className="Done" onClick={handleCloseClick}>
              Done
            </Button>
          )}
        </div>
      );
    }
  }, [List, guidanceIndex]);

  return (
    <div className={styles.footer}>
      <span className="tipNumbers">{`${prevNumber + guidanceIndex + 1} of ${
        List.length + prevNumber + nextNumber
      }`}</span>
      {footerBtn}
    </div>
  );
};
export default Footer;
