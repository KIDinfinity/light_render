import React, { PureComponent } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import PolicyItem from './PolicyItem';

interface IProps {
  className: string;
  policyList?: string[];
}

class PolicyList extends PureComponent<IProps> {
  render() {
    const { policyList, className } = this.props;

    return (
      <div className={classNames('split_list', className)}>
        {lodash.map(policyList, (item: any, index: number) => {
          return (
            <PolicyItem
              key={`${item.policyNo}-${index}`}
              policyNo={item.policyNo}
              treatmentPayables={item.payables}
              policyIndex={index + 1}
            />
          );
        })}
      </div>
    );
  }
}

export default PolicyList;
