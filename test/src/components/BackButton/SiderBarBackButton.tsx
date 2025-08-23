import React from 'react';
import SiderBarButton from '@/components/SiderBarButton';
import { ReactComponent as backSvg } from 'bpm/assets/back.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
interface IProps {
  compressed?: boolean,
}

export default (props: IProps) => 
  <SiderBarButton
    className={'backBox'}
    key={'backButton'}
    onClick={() => history.go(-1)}
    component={backSvg}
    title={formatMessageApi({
      Label_BPM_Button: 'component.button.return',
    })}
    {...props}
  />;
