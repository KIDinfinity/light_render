import React from 'react';
// import lodash from 'lodash';
import { connect } from 'dva';
import { Button } from 'antd';
import classNames from 'classnames';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
// import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './index.less';

const Btn = ({ handleClick, showIcon, buttonText, open, errors, errorsMSG = '' }: any) => {
  const getErrorMsg = () => {
    // const dicTypeArray = ['Label_COM_WarningMessage:', 'Label_COM_ErrorMessage:'];

    // return lodash
    //   .chain(errors)
    //   .filter(
    //     (error: any) =>
    //       lodash.isString(error) &&
    //       lodash.some(dicTypeArray, (dicType: string) => error.includes(dicType))
    //   )
    //   .map((error: any) => {
    //     const errorArray = lodash.split(error, ':');
    //     const dictType = lodash.get(errorArray, '[0]');
    //     const dictCode = lodash.get(errorArray, '[1]');
    //     if (dictType && dictCode) {
    //       return formatMessageApi({ [dictType]: dictCode });
    //     }
    //     return '';
    //   })
    //   .compact()
    //   .concat([formatMessageApi({ Label_COM_WarningMessage: 'ERR_000243' }, buttonText)])
    //   .reverse()
    //   .join('\n')
    //   .value();
    return errorsMSG;
  };

  return (
    <div className={classNames('errorIconPoint', styles.buttonWrap)} onClick={handleClick}>
      <Button>{buttonText}</Button>
      {showIcon && (
        <div className={styles.iconWrap}>
          <ErrorTooltipManual open={open} manualErrorMessage={getErrorMsg()} />
          {/* <Icon type="exclamation" style={{ fontSize: '20px' }} /> */}
        </div>
      )}
    </div>
  );
};

export default connect(({ paymentAllocation }: any) => ({
  errors: paymentAllocation.errors,
}))(Btn);
