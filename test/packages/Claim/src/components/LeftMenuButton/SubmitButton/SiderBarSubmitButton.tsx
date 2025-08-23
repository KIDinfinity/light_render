import React from 'react';
import { Icon, Spin } from 'antd';
import { ReactComponent as submitIcon } from 'bpm/assets/submit.svg';
import SiderBarButton from '@/components/SiderBarButton';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const SubmitButton = ({ errors, submited, submitting, validating, handleSubmit, ...otherProps }: any) => (
  <div className={styles.buttonWrap}>
    {submited && errors.length > 0 ? (
      <SiderBarButton
        className={'error'}
        key={'errorButton'}
        onClick={() => {}}
        ReactComponent={<Icon type="stop" rotate={90} style={{ fontSize: 24 }} />}
        title={
          <>
            <span style={{ marginRight: 4 }}>{submited ? errors.length : 0}</span>
            {formatMessageApi({
              Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.error',
            })}
          </>
        }
        {...otherProps}
      />
    ) : (
      <SiderBarButton
        className={'submit'}
        key={'submitButton'}
        onClick={() => {          
          if (!submitting) {
            handleSubmit();
        }}}
        component={submitIcon}
        title={
          <>
            {!submitting && !validating ? (
              formatMessageApi({
                Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.submit',
              })
            ) : (
              <Spin indicator={<Icon type="loading" spin />} />
            )}
          </>
        }
        {...otherProps}
      />
    )}
  </div>
);
export default SubmitButton;
