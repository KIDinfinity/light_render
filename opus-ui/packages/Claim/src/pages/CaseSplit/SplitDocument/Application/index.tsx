import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import type { SplitDocumentType } from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import ApplicationItem from './ApplicationItem';

interface IProps {
  className: string;
  splitDocumentType: SplitDocumentType;
  listData: any;
}

class SplitDocumentList extends PureComponent<IProps> {
  render() {
    const { splitDocumentType, className, listData } = this.props;

    return (
      <div className={classNames('split_list', className)}>
        {lodash
          .keys(listData)
          .sort()
          .map((applicationNo) => {
            return (
              <ApplicationItem
                key={applicationNo}
                splitDocumentType={splitDocumentType}
                applicationNo={applicationNo}
              />
            );
          })}
      </div>
    );
  }
}

export default connect((state: any, { splitDocumentType }: any) => ({
  listData: lodash.get(state, `caseSplitDocumentController.${splitDocumentType}`),
}))(SplitDocumentList);
