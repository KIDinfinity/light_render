import React, { useState } from 'react';
import { useSelector } from 'dva';
import { Table, Icon } from 'antd';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import BooleanEnum from 'basic/enum/BooleanEnum';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import lodash from 'lodash';
import RelatePolicy from './RelatePolicy';

import styles from './index.less';

interface IProps {
  falg?: string;
  expand: boolean;
  mode?: string;
  NAMESPACE?: string;
  trigger?: string;
  tooltip?: boolean;
  loanList?: any;
  handleChange?: Function;
  handleDelete?: Function;
  handleAdd?: Function;
}

const Loan = ({ falg, expand, loanList, NAMESPACE, trigger, tooltip }: IProps) => {
  const [expendStatus, setExpendStatus] = useState(falg === BooleanEnum.Yes);

  const Dropdown_POL_Period = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_POL_Period
  );
  const Dropdown_POL_NewLoanFlag = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_POL_NewLoanFlag
  );
  const Dropdown_CFG_Currency = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_CFG_Currency
  );

  const getFormate = (val: any) => {
    return fnPrecisionFormat(fnPrecisionParser(parseFloat(val)));
  };
  const getDictName = (lsit = [], val: string) => {
    return (
      lodash
        .chain(lsit)
        .find((el: any) => el.dictCode === val)
        .get('dictName')
        .value() || val
    );
  };

  const columns = [
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'LoanContractNo' }),
      dataIndex: 'loanContractNumber',
      render: (item: string, record: any) => (
        <RelatePolicy
          tooltip={tooltip}
          record={record}
          trigger={trigger}
          NAMESPACE={NAMESPACE}
          loanContractNo={item}
        />
      ),
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'LoanProtectionAmount' }),
      dataIndex: 'newLoanAmount',
      render: (val: any) => getFormate(val) || '-',
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'Currency' }),
      dataIndex: 'currency',
      render: (val: any) => getDictName(Dropdown_CFG_Currency, val) || '-',
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'Period' }),
      dataIndex: 'period',
      render: (val: any) => getDictName(Dropdown_POL_Period, val) || '-',
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'NumberOfPreiod' }),
      dataIndex: 'numberOfPeriod',
      render: (val: any) => getFormate(val) || '-',
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'IsNew' }),
      dataIndex: 'isNew',
      render: (val: any) => getDictName(Dropdown_POL_NewLoanFlag, val) || '-',
    },
  ];

  return (
    <div
      className={classnames({
        [styles.loan]: true,
        [styles.expandLoan]: expand,
      })}
    >
      <div
        className={classnames({
          [styles.headerWrap]: true,
          [styles.head]: !expand,
          [styles.expandHead]: expand,
          [styles.hidden]: expendStatus,
        })}
      >
        <div className={styles.left}>
          <span className={styles.title}>{formatMessageApi({ Label_BIZ_Policy: 'Loan' })}</span>
          {expand && (
            <Icon
              type={!expendStatus ? 'down' : 'up'}
              onClick={() => setExpendStatus(!expendStatus)}
            />
          )}
        </div>
      </div>
      {(!expand || expendStatus) && (
        <div className={classnames({ [styles.body]: !expand, [styles.expandBody]: expand })}>
          <Table columns={columns} dataSource={loanList} pagination={false} />
        </div>
      )}
    </div>
  );
};

Loan.displayName = 'loan';

export default Loan;
