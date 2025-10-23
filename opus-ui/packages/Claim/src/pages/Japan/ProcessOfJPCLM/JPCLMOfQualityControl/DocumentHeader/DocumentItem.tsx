import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import classnames from 'classnames';
import type { DocumentProps } from '../Typings';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DocumentCategory, TaskStatus, DocumentStatus, enumContentType } from '../Enum';
import { DocumentTitles } from '../Documents';

interface IProps {
  dispatch: Dispatch;
  item: DocumentProps;
  currentDocument: DocumentProps;
  documentId: string | string[];
  documentType_i18n: any;
  applicationNo: string;
  taskDetail: any;
}

class Item extends Component<IProps> {
  get documentType(): string {
    const { item, documentType_i18n } = this.props;
    return (lodash.chain(documentType_i18n) as any)
      .find((el: any) => el.dictCode === lodash.get(item, 'formData.documentTypeCode'))
      .get('dictName')
      .value();
  }

  get contentType(): number {
    const { item } = this.props;
    return lodash.get(item, 'formData.contentType');
  }

  get isActive(): boolean {
    const {
      item: { documentId },
      currentDocument: { documentId: currentDocumentId },
    } = this.props;
    return documentId === currentDocumentId;
  }

  get documentStatusSelectable() {
    const { item, taskDetail, documentId } = this.props;
    const documentStatus = lodash.toLower(lodash.get(item, 'formData.documentStatus', ''));
    const taskStatus = lodash.toLower(taskDetail.taskStatus);
    return (
      (taskStatus === TaskStatus.Pending || taskStatus === TaskStatus.Todo) &&
      documentStatus === DocumentStatus.P &&
      !lodash.isArray(documentId)
    );
  }

  get documentStatus() {
    const { item, documentId } = this.props;
    const documentStatus = lodash.toLower(lodash.get(item, 'formData.documentStatus'));
    const len = lodash.isArray(documentId) ? documentId.length : 1;
    const content = this.contentType === enumContentType.imageOnly ? len : '';
    return (
      <div
        className={classnames({
          [styles.Status]: true,
          [styles.received]: documentStatus !== DocumentStatus.P,
        })}
      >
        <div
          className={classnames({
            [styles.documentStatus]: true,
            [styles.documentStatusSelect]: this.documentStatusSelectable,
          })}
          onClickCapture={this.showConfirmModal}
        >
          {content}
        </div>
      </div>
    );
  }

  get DocumentForm() {
    const { item, applicationNo, documentId } = this.props;
    const { documentTypeCode } = lodash.get(item, 'formData', {});
    const documentIdList = lodash.isArray(documentId) ? documentId : [documentId];
    const documentStatus = lodash.toLower(lodash.get(item, 'formData.documentStatus', ''));
    const DocumentForm =
      DocumentTitles[DocumentCategory[documentTypeCode] || DocumentCategory.default] ||
      DocumentTitles.DefaultForm;
    const DocumentFormList =
      documentStatus === DocumentStatus.P
        ? DocumentTitles.UnarrivalImageForm
        : DocumentTitles.ArrivalImageForm;
    return this.contentType !== enumContentType.imageOnly ? (
      <DocumentForm applicationNo={applicationNo} documentId={documentId} />
    ) : (
      <DocumentFormList applicationNo={applicationNo} documentIdList={documentIdList} />
    );
  }

  get DocumentId() {
    const { item } = this.props;
    const { bpmDocumentId: documentId } = lodash.get(item, 'formData', {});
    return documentId;
  }

  get RequestedBy() {
    const { item } = this.props;
    const { requestedBy } = lodash.get(item, 'formData', {});
    return formatMessageApi({ Label_DOC_Document: requestedBy });
  }

  changeCurrentDocument = () => {
    const { item, dispatch } = this.props;
    if (this.isActive) {
      return;
    }
    dispatch({
      type: `JPCLMOfQualityController/saveCurrentDocument`,
      payload: item,
    });
  };

  showConfirmModal = () => {
    const { dispatch } = this.props;
    if (!this.documentStatusSelectable) {
      return;
    }
    dispatch({ type: `JPCLMOfQualityController/showConfirmModal` });
  };

  render() {
    return (
      <div
        className={classnames({
          [styles.Item]: true,
          [styles.active]: this.isActive,
        })}
        onClickCapture={this.changeCurrentDocument}
        data-error-scroll-enter={this.DocumentId}
      >
        <div className={styles.Title}>
          <div
            className={styles.TitleContent}
            title={this.documentType + (this.RequestedBy ? `\r\n${this.RequestedBy}` : '')}
          >
            {this.documentStatus}
            <div className={styles.WordContent}>
              <div className={styles.TitleType}>{this.documentType}</div>
              {this.contentType !== enumContentType.imageOnly && (
                <div className={styles.TitleId}>{this.DocumentId}</div>
              )}
              {this.contentType !== enumContentType.imageOnly && (
                <div className={styles.TitleType}>
                  <span className={styles.RequestedBy}>{this.RequestedBy}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.Content}>{this.DocumentForm}</div>
      </div>
    );
  }
}

export default connect(
  ({ JPCLMOfQualityController, dictionaryController }: any, { documentId }: any) => ({
    documentType_i18n: dictionaryController.documentType_i18n,
    currentDocument: JPCLMOfQualityController.currentDocument,
    item:
      lodash.isArray(documentId) && documentId[0]
        ? lodash.get(
            JPCLMOfQualityController,
            `claimProcessData.claimEntities.bpoFormDataList.${documentId[0]}`,
            {}
          )
        : lodash.get(
            JPCLMOfQualityController,
            `claimProcessData.claimEntities.bpoFormDataList.${documentId}`,
            {}
          ),
  })
)(Item);
