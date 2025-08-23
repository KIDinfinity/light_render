import React from 'react';
import { useSelector } from 'dva';
import SiderBarButton from '@/components/SiderBarButton';
import { ReactComponent as errorSvg } from 'bpm/assets/error.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
interface IProps {
  errors?: any,
  compressed?: any,
}

export default (props: IProps) => {
  const errorCount = useSelector(state => state.daProcessController.errorCount);
  const { errors = 0 } = props || {};
  return(
    <SiderBarButton
      className={'error'}
      key={'errorButton'}
      onClick={() => {}}
      component={errorSvg}
      title={
        `${errorCount || errors}${formatMessageApi({
          Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.error',
        })}`
      }
      {...props}
    />
  )
}