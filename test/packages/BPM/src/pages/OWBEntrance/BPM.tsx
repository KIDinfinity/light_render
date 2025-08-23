import React, { useEffect } from 'react';
import lodash from 'lodash';
import setTitle from './API/setTitle';
import setOverdueTime from './API/setOverdueTime';
import setHeaderInfoRender from './API/_setHeaderInfoRender';
import Info from './Header/Info';
import InfoContainer from './Header/InfoContainer';
import InfoHead from './Header/InfoHead';
import InfoItem from './Header/InfoItem';
import MCSubscribeUnknowDocument from './MCSubscribe/MCSubscribeUnknowDocument';
import MCSubscribeCaseLabel from './MCSubscribe/MCSubscribeCaseLabel';
import bpm from './API/api';
import triggerAction from './API/triggerAction';
import clearSubmitButtonErrors from './API/_clearSubmitButtonErrors';
import reload from './API/_reload';

const BPM = ({ children }: any) => {
  // eslint-disable-next-line consistent-return
  const renderChildren = React.Children.map(children, (child) => {
    if (child.type.displayName === 'BPM.Header') {
      React.Children.map(child.props.children, (childA) => {
        if (childA.type.displayName === 'BPM.HeaderTitle') {
          if (lodash.isString(childA.props.children)) {
            setTitle(childA.props.children);
          }
        } else if (childA.type.displayName === 'BPM.HeaderInfo') {
          setHeaderInfoRender(childA);
        } else if (childA.type.displayName === 'BPM.HeaderInfoContainer') {
          setHeaderInfoRender(childA);
        } else if (childA.type.displayName === 'OverdueTime') {
          setOverdueTime(childA);
        }
      });
    } else {
      return child;
    }
  });

  (bpm as any).buttonAction = triggerAction();
  (bpm as any).clearSubmitButtonErrors = clearSubmitButtonErrors();
  (bpm as any).reload = reload();

  useEffect(() => {
    return () => {
      (bpm as any).buttonAction = (buttonCode) => buttonCode;
    };
  }, []);

  return (
    <>
      {renderChildren}
      <MCSubscribeUnknowDocument />
      <MCSubscribeCaseLabel />
    </>
  );
};
BPM.displayName = 'BPM';

BPM.Header = () => <></>;
(BPM.Header as any).displayName = 'BPM.Header';

BPM.HeaderTitle = () => <></>;
(BPM.HeaderTitle as any).displayName = 'BPM.HeaderTitle';

BPM.HeaderInfo = (props: any) => <Info {...props} />;
(BPM.HeaderInfo as any).displayName = 'BPM.HeaderInfo';

BPM.HeaderInfoHead = (props: any) => <InfoHead {...props} />;
(BPM.HeaderInfoHead as any).displayName = 'BPM.HeaderInfoHead';

BPM.HeaderInfoContainer = (props: any) => <InfoContainer {...props} />;
(BPM.HeaderInfoContainer as any).displayName = 'BPM.HeaderInfoContainer';

BPM.HeaderInfoItem = (props: any) => <InfoItem {...props} />;
(BPM.HeaderInfoItem as any).displayName = 'BPM.HeaderInfoItem';

export default BPM;
