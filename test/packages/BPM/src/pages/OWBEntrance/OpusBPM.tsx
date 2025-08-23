import React from 'react';
import MCSubscribeUnknowDocument from './MCSubscribe/MCSubscribeUnknowDocument';
import bpm from './API/api';
import triggerAction from './API/triggerAction';
import clearSubmitButtonErrors from './API/_clearSubmitButtonErrors';
import reload from './API/_reload';
import Info from './Header/Info';
import InfoContainer from './Header/InfoContainer';
import InfoHead from './Header/InfoHead';
import InfoItem from './Header/InfoItem';

const OpusBPM = ({ children }: any) => {
  (bpm as any).buttonAction = triggerAction();
  (bpm as any).clearSubmitButtonErrors = clearSubmitButtonErrors();
  (bpm as any).reload = reload();

  return (
    <>
      {children}
      <MCSubscribeUnknowDocument />
    </>
  );
};
OpusBPM.displayName = 'BPM';

OpusBPM.Header = () => <></>;
(OpusBPM.Header as any).displayName = 'BPM.Header';

OpusBPM.HeaderTitle = () => <></>;
(OpusBPM.HeaderTitle as any).displayName = 'BPM.HeaderTitle';

OpusBPM.HeaderInfo = (props: any) => <Info {...props} />;
(OpusBPM.HeaderInfo as any).displayName = 'BPM.HeaderInfo';

OpusBPM.HeaderInfoHead = (props: any) => <InfoHead {...props} />;
(OpusBPM.HeaderInfoHead as any).displayName = 'BPM.HeaderInfoHead';

OpusBPM.HeaderInfoContainer = (props: any) => <InfoContainer {...props} />;
(OpusBPM.HeaderInfoContainer as any).displayName = 'BPM.HeaderInfoContainer';

OpusBPM.HeaderInfoItem = (props: any) => <InfoItem {...props} />;
(OpusBPM.HeaderInfoItem as any).displayName = 'BPM.HeaderInfoItem';
export default OpusBPM;
