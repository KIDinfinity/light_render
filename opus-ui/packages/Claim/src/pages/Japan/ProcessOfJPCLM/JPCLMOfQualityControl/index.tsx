import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import CaseSplit from 'claim/pages/CaseSplit';
import classnames from 'classnames';
import type { Dispatch } from 'redux';
import MedicalSearchModal from 'claim/components/MedicalSearchModal';
import { CLM } from 'claim/pages/taskDefKey';
import bpm from 'bpm/pages/OWBEntrance';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import DocumentHeader from './DocumentHeader';
import ReceivedModal from './ReceivedModal';
import { namespace } from './_models';
import Documents from './Documents';
import styles from './index.less';
import type { DocumentProps } from './Typings';
import { DocumentCategory } from './Enum';
import getDropDownList from './Utils/getDropDownList';

interface IProps {
  taskDetail: any;
  currentDocument: DocumentProps;
  claimDatas: any;
  claimEntities: any;
  modalShow: boolean;
  claimProcessData: any;
  applicationList: any;
  dispatch: Dispatch<any>;
}

// @ts-ignore
@changeWorkSpaceHoc
// @ts-ignore
@setEnvoyHoc
// @ts-ignore
@setInformationHoc
// @ts-ignore
@setInsured360Hoc
// @ts-ignore
@setClaimEditableHoc
class JPCLMOfQualityControl extends Component<IProps> {
  shouldComponentUpdate(nextProps: IProps) {
    return !lodash.isEqualWith(this.props, nextProps, (props: IProps) => {
      const propsArrs = ['currentDocument', 'claimProcessData', 'modalShow'];
      return lodash.isEqual(lodash.pick(props, propsArrs), lodash.pick(nextProps, propsArrs));
    });
  }

  get DocumentForm() {
    const {
      currentDocument: {
        formData: { documentTypeCode: code, documentId },
      },
    } = this.props;
    const DocumentForm = Documents[DocumentCategory[code]];
    return DocumentForm ? <DocumentForm documentId={documentId} /> : '';
  }

  get DocumentFormList() {
    const {
      currentDocument: { documentId: activeId },
      claimProcessData,
    } = this.props;
    const bpoFormDataList = lodash.get(claimProcessData, 'claimEntities.bpoFormDataList', {});
    return lodash.map(lodash.values(bpoFormDataList), (item: any) => {
      const { documentTypeCode, documentId, bpmDocumentId } = item.formData;
      const DocumentForm = Documents[DocumentCategory[documentTypeCode]];
      return (
        <div
          className={classnames({
            [styles.documentItem]: true,
            [styles.active]: activeId === documentId,
          })}
          key={documentId}
          data-error-scroll-content={bpmDocumentId}
        >
          {DocumentForm ? <DocumentForm documentId={documentId} /> : ''}
        </div>
      );
    });
  }

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
    dispatch({
      type: 'JPCLMOfQualityController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  componentDidMount = async () => {
    const { dispatch, taskDetail = {}, businessData = {} }: any = this.props;
    const {
      businessNo,
      taskStatus,
      taskDefKey,
      inquiryClaimNo: parentClaimNo,
      processInstanceId,
      assignee,
      submissionChannel,
    } = taskDetail;
    await dispatch({
      type: `${namespace}/initBusinessData`,
      payload: {
        businessNo,
        taskStatus,
        parentClaimNo,
        processInstanceId,
        submissionChannel,
        assignee,
        onOkFn: this.updateAssignDocument,
        businessData,
      },
    });
    if (taskDefKey === CLM.JP_CLM_ACT008) {
      dispatch({
        type: 'workspaceSwitchOn/changeSwitch',
        payload: {
          name: 'remark',
        },
      });
    }

    this.getDropdown();
    this.getExpectPolicy();
  };

  updateAssignDocument = () => {
    const { dispatch, taskDetail = {} } = this.props;
    const { taskStatus, inquiryClaimNo: parentClaimNo } = taskDetail;
    dispatch({
      type: `${namespace}/getAndUpdateAssignDocument`,
      payload: {
        taskStatus,
        parentClaimNo,
      },
    });
  };

  getExpectPolicy = () => {
    const { dispatch, taskDetail = {} }: any = this.props;
    const { businessNo } = taskDetail;
    dispatch({
      type: `${namespace}/getExpectPolicy`,
      payload: { claimNo: businessNo },
    });
  };

  getDropdown = () => {
    const { claimProcessData, dispatch } = this.props;
    const bpoFormDataList = lodash.get(claimProcessData, 'claimEntities.bpoFormDataList', {});
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: getDropDownList(bpoFormDataList),
    });
  };

  updateClaimProcessData = (originalCase: any, fnShowLoading: Function, splitType: any) => {
    const { taskDetail = {} }: any = this.props;
    const { taskStatus, inquiryClaimNo: parentClaimNo } = taskDetail;
    this.props.dispatch({
      type: 'JPCLMOfQualityController/saveSplitClaimProcessData',
      payload: { originalCase, splitType, fnShowLoading, taskStatus, parentClaimNo },
    });

    bpm.reload();
  };

  saveSnapshot = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'JPCLMOfQualityController/saveSnapshot',
    });
  };

  render() {
    const { taskDetail, applicationType } = this.props;

    return (
      <div className={styles.container}>
        <DocumentHeader taskDetail={this.props.taskDetail} />
        {this.DocumentFormList}
        {/*
        // @ts-ignore */}
        <CaseSplit
          taskDetail={taskDetail}
          claimTypes={applicationType}
          updateClaimProcessData={this.updateClaimProcessData}
          saveSnapshot={this.saveSnapshot}
          tabConfig={{
            document: { disabled: true },
            splitTypeDef: 'Document',
            policy: { disabled: true },
            incident: { disabled: true },
          }}
        />
        <ReceivedModal taskDetail={this.props.taskDetail} />
        <MedicalSearchModal />
      </div>
    );
  }
}

export default connect(
  ({ JPCLMOfQualityController, caseSplitController, dictionaryController }: any) => ({
    currentDocument: JPCLMOfQualityController.currentDocument,
    applicationList: JPCLMOfQualityController.applicationList,
    claimProcessData: JPCLMOfQualityController.claimProcessData,
    modalShow: lodash.get(caseSplitController, 'modalShow', false),
    applicationType: dictionaryController.applicationType,
  })
)(JPCLMOfQualityControl);
