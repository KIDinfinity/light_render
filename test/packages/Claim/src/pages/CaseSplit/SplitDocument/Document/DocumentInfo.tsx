import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { get } from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { SplitDocumentType } from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import styles from './DocumentItem.less';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  splitDocumentType: SplitDocumentType;
  applicationNo: string;
  documentId: string;
  docItemData: any;
}

class DocumentInfo extends PureComponent<IProps> {
  render() {
    const {
      docItemData: { bpmDocumentId, documentTypeCode },
    } = this.props;

    return (
      <div className={styles.split_form}>
        <span className={styles.split_formitem}>{bpmDocumentId}</span>
        <span className={styles.split_formitem}>
          {formatMessageApi({ documentType_i18n: documentTypeCode })}
        </span>
      </div>
    );
  }
}

export default connect((state: any, { splitDocumentType, applicationNo, documentId }: any) => ({
  docItemData: get(
    state,
    `caseSplitDocumentController.${splitDocumentType}.${applicationNo}.documentData.${documentId}`
  ),
}))(DocumentInfo);
