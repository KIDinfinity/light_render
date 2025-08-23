import React from 'react';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';

interface IProps {
  selectedCount: number;
  submited: boolean;
}

const Title = ({ selectedCount, submited }: IProps) => {
  const transactionTypeText = formatMessageApi({
    Label_BIZ_POS: 'TransType',
  });
  return (
    <div className={styles.title}>
      {formatMessageApi({
        Label_BIZ_POS: 'TransType',
      })}
      <span
        className={classnames(styles.count, {
          [styles.hidden]: selectedCount === 0,
        })}
      >
        {selectedCount}
      </span>
      {submited && selectedCount === 0 && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi(
            {
              Label_COM_WarningMessage: 'ERR_000011',
            },
            transactionTypeText
          )}
        />
      )}
    </div>
  );
};

export default Title;
