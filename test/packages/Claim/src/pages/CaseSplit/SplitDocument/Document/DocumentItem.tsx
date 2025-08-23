import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { get } from 'lodash';
import { Checkbox } from 'antd';
import type { SplitDocumentType } from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import DocumentInfo from './DocumentInfo';
import styles from './DocumentItem.less';

interface IProps {
  dispatch: Dispatch<any>;
  splitDocumentType: SplitDocumentType;
  applicationNo: string;
  documentId: string;
  docItemData: any;
}

class SplitDocumentDocItem extends PureComponent<IProps> {
  onSelect = () => {
    const { dispatch, splitDocumentType, applicationNo, documentId } = this.props;

    dispatch({
      type: 'caseSplitDocumentController/selectDocument',
      payload: { splitDocumentType, applicationNo, documentId },
    });
  };

  render() {
    const { splitDocumentType, applicationNo, documentId, docItemData } = this.props;

    return (
      <div className={styles.split_treatment}>
        {/* 因 split by document 按照请求书番号进行拆分，故这里去掉选择 UI */}
        <div className="treatment_select">
          <Checkbox checked={docItemData.isSelected} onChange={this.onSelect} />
        </div>
        <div className="treatment_content">
          <DocumentInfo
            splitDocumentType={splitDocumentType}
            applicationNo={applicationNo}
            documentId={documentId}
          />
        </div>
      </div>
    );
  }
}

export default connect((state: any, { splitDocumentType, applicationNo, documentId }: any) => ({
  docItemData: get(
    state,
    `caseSplitDocumentController.${splitDocumentType}.${applicationNo}.documentData.${documentId}`
  ),
}))(SplitDocumentDocItem);
