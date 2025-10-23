import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash, { get } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { SplitDocumentType } from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import DocumentItem from './DocumentItem';

import styles from './styles.less';

interface IProps {
  splitDocumentType: SplitDocumentType;
  docListData: any;
  applicationNo: string;
}

class SplitDocumentDocList extends PureComponent<IProps> {
  render() {
    const { docListData, splitDocumentType, applicationNo } = this.props;

    return (
      <div className={styles.split_doc_wrap}>
        <div className={styles.split_doc}>
          {`${formatMessageApi({
            Label_BIZ_Claim: '必要書類リスト',
          })}`}
        </div>
        {lodash.map(Object.keys(docListData.documentData), (documentId) => {
          return (
            <DocumentItem
              key={documentId}
              splitDocumentType={splitDocumentType}
              applicationNo={applicationNo}
              documentId={documentId}
            />
          );
        })}
      </div>
    );
  }
}

export default connect((state: any, { splitDocumentType, applicationNo }: any) => ({
  docListData: get(state, `caseSplitDocumentController.${splitDocumentType}.${applicationNo}`),
}))(SplitDocumentDocList);
