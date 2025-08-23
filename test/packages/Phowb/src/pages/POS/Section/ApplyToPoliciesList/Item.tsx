import React, { Component } from 'react';
import { Checkbox } from 'antd';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { namespace } from '../../_models';
import styles from './Item.less';

interface IProps {
  dispatch?: Dispatch<any>;
  form?: any;
}
class ApplyToPoliciesItem extends Component<IProps> {
  onChangeItem = (e) => {
    const { dispatch, item }: any = this.props;
    const { checked } = e.target;
    dispatch({
      type: `${namespace}/updateApplyToPoliciesByPolicyNo`,
      payload: {
        policyNo: item.policyNo,
        applyTo: checked,
      },
    });
  };

  render() {
    const { item, isNotEditable, taskNotEditable } = this.props;
    return (
      <div className={styles.container}>
        <Checkbox
          disabled={isNotEditable || taskNotEditable}
          checked={item.applyTo}
          onChange={(e) => this.onChangeItem(e)}
        />
        <ul>
          <li>
            <div className={styles.title}>
              {formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' })}:{' '}
            </div>
            <div className={styles.value}>{item.policyNo}</div>
          </li>
          <li>
            <div className={styles.title}>
              {formatMessageApi({ Label_BIZ_Policy: 'PolicyName' })}:{' '}
            </div>
            <div className={styles.value}>{item.policyName}</div>
          </li>
          <li>
            <div className={styles.title}>
              {formatMessageApi({ Label_BIZ_Policy: 'ContactNo' })}:{' '}
            </div>
            <div className={styles.value}>{item.contactNo}</div>
          </li>
          <li>
            <div className={styles.title}>
              {formatMessageApi({ Label_BIZ_Policy: 'ContactAddr' })}:{' '}
            </div>
            <div className={styles.value}>{item.contractAddress}</div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ApplyToPoliciesItem;
