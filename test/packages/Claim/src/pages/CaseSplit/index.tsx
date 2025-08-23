import React, { PureComponent, lazy, Suspense } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { Modal, Button, notification, Spin } from 'antd';
import SectionTitle from 'claim/components/SectionTitle';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { IDictionary } from '@/dtos/dicts';
import type { IPolicy, IIncident } from '@/dtos/claim';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimDataForSplitCase } from '@/utils/claimUtils';
import { ESplitTypes } from 'claim/pages/CaseSplit/_models/dto/splitTypes';
import type { ITabConfig } from 'claim/pages/CaseSplit/_models/dto';
import { setFlags } from 'claim/pages/CaseSplit/_models/functions';
import { updateFinalData } from 'claim/pages/CaseSplit/_models/functions';
import { SplitDocumentType } from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import { getSpliByDocPostList } from 'claim/pages/CaseSplit/_models/splitDocument/utils';
import TransparentModel from '@/components/TransparentModel';
import { Provider } from '@/components/_store';
import CaseCategory from 'enum/CaseCategory';
import TabRadio from './_components/radio/TabRadio';
import { tenant } from '@/components/Tenant';
import handleMessageModal from '@/utils/commonMessage';

import styles from './caseSplit.less';

export { ESplitTypes };
interface IProps {
  dispatch: Dispatch<any>;
  loadingConfirm: boolean;
  claimTypes: IDictionary[];
  listPolicy: IPolicy[];
  modalShow: boolean;
  splitType: string;
  taskDetail: any;
  claimDatas: any;
  claimProcessData: any;
  caseSplitIncidentController: any;
  caseSplitPolicyController: any;
  caseSplitDocumentController: any;
  caseSplitCaseController: any;
  updatePaymentAmount?: (originClaimData: any) => void;
  updateClaimProcessData: (claimProcessData: any, fnShowLoading: any) => void;
  saveSnapshot?: () => void;
  updatePostData?: (postData: any, splitType: ESplitTypes) => void;
  tabConfig: ITabConfig;
  loadingSplit: boolean;
  previewSplit: boolean;
  region?: string;
  wholeEntities?: any;
}

interface IStates {
  prevSplitType?: string;
  showContent?: boolean;
}
const SplitCase = lazy(() => import('./SplitCase'));
const SplitIncident = lazy(() => import('./SplitIncident'));
const SplitPolicy = lazy(() => import('./SplitPolicy'));
const SplitDocument = lazy(() => import('./SplitDocument'));

class CaseSplit extends PureComponent<IProps, IStates> {
  state = {
    showContent: false,
    prevSplitType: '',
  };
  componentDidMount() {
    const { tabConfig, dispatch } = this.props;

    dispatch({ type: 'caseSplitController/getConfig' });

    if (lodash.isPlainObject(tabConfig) && lodash.isString(tabConfig.splitTypeDef)) {
      dispatch({
        type: 'caseSplitController/switchTabs',
        payload: { splitType: tabConfig.splitTypeDef, init: true },
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseSplitDocumentController/reset',
    });
    dispatch({
      type: 'caseSplitIncidentController/reset',
    });
    dispatch({
      type: 'caseSplitPolicyController/reset',
    });
    dispatch({
      type: 'caseSplitController/reset',
    });
    dispatch({
      type: 'caseSplitController/toggleModal',
      payload: { modalShow: false },
    });
    notification.destroy();
  }

  componentDidUpdate = (nextProps: any) => {
    const { modalShow: nextModalShow } = nextProps;
    const { modalShow } = this.props;
    const { showContent } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    if (modalShow && !nextModalShow && !showContent) {
      setTimeout(() => {
        that.setState({
          showContent: true,
        });
      }, 100);
    }

    if (!modalShow && nextModalShow && showContent) {
      setTimeout(() => {
        that.setState({
          showContent: false,
        });
      }, 100);
    }
  };

  get getFooterButton() {
    const { loadingConfirm } = this.props;

    return [
      <Button
        key="confirm"
        type="primary"
        disabled={this.confirmSplitData()}
        loading={loadingConfirm}
        onClick={() => {
          this.fnConfirm();
        }}
      >
        {formatMessageApi({
          Label_BPM_Button: 'venus-split_confirm',
        })}
      </Button>,
      <Button key="cancel" onClick={this.fnCancel} className={styles.cancelButton}>
        {formatMessageApi({
          Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.cancel',
        })}
      </Button>,
    ];
  }

  get getSplitContent() {
    const { splitType } = this.props;

    const splitContent = {
      [ESplitTypes.Case]: <SplitCase />,
      [ESplitTypes.Incident]: <SplitIncident />,
      [ESplitTypes.Document]: <SplitDocument />,
      // @ts-ignore
      [ESplitTypes.Policy]: <SplitPolicy key="policy" />,
      // @ts-ignore
      [ESplitTypes.DifferentIncidentNo]: <SplitPolicy key="differentIncidentNo" />,
    };

    return splitContent[splitType];
  }

  confirmSplitData = () => {
    const { splitType, claimDatas, caseSplitDocumentController } = this.props;
    const { incidentList, claimPayableList } = claimDatas || {};
    const confirmSplit = {
      [ESplitTypes.Incident]: lodash.isEmpty(incidentList),
      [ESplitTypes.Document]:
        lodash.size(caseSplitDocumentController[SplitDocumentType.NewDocument]) < 1 ||
        lodash.size(caseSplitDocumentController[SplitDocumentType.OriginalDocument]) < 1,
      [ESplitTypes.Policy]: lodash.isEmpty(claimPayableList),
      [ESplitTypes.DifferentIncidentNo]: lodash.isEmpty(claimPayableList),
    };
    return confirmSplit[splitType];
  };

  handleSelect = (splitType: string) => {
    const { dispatch, claimDatas, wholeEntities } = this.props;
    const { prevSplitType } = this.state;
    const initialCase = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimDatas));

    dispatch({
      type: 'caseSplitController/switchTabs',
      payload: { splitType },
    });

    this.setState({
      prevSplitType: splitType,
    });

    if (splitType === ESplitTypes.DifferentIncidentNo) {
      this.splitDifferentIncidentNo();
    }

    if (prevSplitType === ESplitTypes.DifferentIncidentNo) {
      const newCase = lodash.chain(initialCase).cloneDeep().set('claimPayableList', []).value();

      dispatch({
        type: 'caseSplitPolicyController/updateClaimData',
        payload: {
          newCase,
          originalCase: initialCase,
          wholeEntities,
        },
      });
    }
  };

  confirmValidate = async () => {
    const { splitType, dispatch } = this.props;
    let output: any = [];

    const dispatchPaths = {
      [ESplitTypes.Case]: 'caseSplitCaseController/validateSplitCase',
      [ESplitTypes.Incident]: 'caseSplitIncidentController/validateSpliteCase',
      [ESplitTypes.Document]: 'caseSplitDocumentController/validateSpliteCase',
      [ESplitTypes.Policy]: 'caseSplitPolicyController/validateSpliteCase',
      [ESplitTypes.DifferentIncidentNo]: 'caseSplitPolicyController/validateSpliteCase',
    };

    output = await dispatch({
      type: dispatchPaths[splitType] || dispatchPaths[ESplitTypes.Policy],
    });

    return output;
  };

  confirmNotification = async (postData: any) => {
    const { splitType } = this.props;
    const notify = () => {
      notification.warning({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'ERR_000129',
        }),
      });
    };
    const notifications = {
      overall: lodash.chain(postData).get('newCase').isEmpty().value(),
      [ESplitTypes.Incident]: lodash.chain(postData).get('newCase.incidentList').isEmpty().value(),
      [ESplitTypes.Document]: false,
      [ESplitTypes.Policy]: lodash
        .chain(postData)
        .get('newCase.claimPayableList')
        .isEmpty()
        .value(),
      [ESplitTypes.DifferentIncidentNo]: lodash
        .chain(postData)
        .get('newCase.claimPayableList')
        .isEmpty()
        .value(),
    };

    if (notifications.overall) {
      notify();
      return notifications.overall;
    }
    const currentNotify = notifications[splitType];
    if (currentNotify) {
      notify();
    }
    return !!currentNotify;
  };

  buildPostData = async () => {
    const { splitType } = this.props;

    const postData = {
      [ESplitTypes.Incident]: this.fnSplitByIncident(),
      [ESplitTypes.Document]: this.fnSplitByDocument(),
      [ESplitTypes.Policy]: this.fnSplitByPolicy(),
      [ESplitTypes.DifferentIncidentNo]: this.fnSplitDifferentIncidentNo(),
    };

    const currentData = await postData[splitType];

    return lodash.isPlainObject(currentData) && !lodash.isEmpty(currentData)
      ? { ...currentData, splitType }
      : null;
  };
  getSplitCaseParams = () => {
    const { caseSplitCaseController, taskDetail } = this.props;
    const {
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
    } = caseSplitCaseController;
    const { originalCase } = this.clearDenormalizedData({
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
    });
    const {
      processInstanceId,
      taskId,
      caseCategory,
      businessNo,
      assignee,
    } = lodash.pick(taskDetail, [
      'taskId',
      'processInstanceId',
      'taskDefKey',
      'caseCategory',
      'businessNo',
      'assignee',
    ]);

    return {
      caseNo: processInstanceId,
      businessNo,
      taskId,
      assignee,
      caseCategory,
      activityKey: taskDetail?.taskDefKey,
      operationType: 'splitCase',
      regionCode: tenant.region(),
      businessData: {
        ...formUtils.formatFlattenValue(formUtils.cleanValidateData(originalCase)),
      },
    };
  };
  fnSplitByCase = () => {
    const { caseSplitCaseController, taskDetail } = this.props;
    const originalCase = this.getSplitCaseParams();
    const { caseCategory, companyCode } = lodash.pick(taskDetail, [
      'taskId',
      'processInstanceId',
      'taskDefKey',
      'caseCategory',
      'businessNo',
      'assignee',
      'companyCode',
    ]);
    const postData = {
      originalCase,
      newCase: {
        ...originalCase,
        inquiryBusinessNo: caseSplitCaseController.remark.businessNo,
        businessData: {
          ...originalCase.businessData,
          inquiryBusinessNo: caseSplitCaseController.remark.businessNo,
          inquiryClaimNo: caseSplitCaseController.remark.businessNo,
        },
      },
      newClaimNo: false,
      originalRemark: caseSplitCaseController.remark.originalRemark,
      newRemark: caseSplitCaseController.remark.newRemark,
      splitType: 'C',
      companyCode,
      caseCategory,
      activityKey: taskDetail?.taskDefKey,
      operationType: 'splitCase',
      regionCode: tenant.region(),
    };
    return formUtils.formatFlattenValue(formUtils.cleanValidateData(postData));
  };
  fnShowLoading = (show: boolean) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'caseSplitController/showLoading',
      payload: { loadingSplit: !!show },
    });
  };

  fnCancel = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'caseSplitController/toggleModal',
      payload: {
        modalShow: false,
      },
    });
  };
  onConfirmCaseSplitCase = async () => {
    const { dispatch, claimDatas } = this.props;
    this.fnShowLoading(true);
    const policyId = claimDatas.insured.policyId;
    if (!policyId) {
      notification.error({
        message: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000926' }),
      });
    } else {
      const postData = this.fnSplitByCase();
      const response: any = await dispatch({
        type: 'caseSplitCaseController/splitCaseConfirm',
        payload: {
          postData,
        },
      });
      const { success, promptMessages } = lodash.pick(response, ['success', 'promptMessages']);
      if (success) {
        notification.success({
          message: 'Case split successfully!',
        });

        // 关闭模态框
        this.fnCancel();
      } else {
        handleMessageModal(promptMessages);
      }
    }
    this.fnShowLoading(false);
  };
  fnConfirm = async () => {
    const {
      dispatch,
      splitType,
      updateClaimProcessData,
      saveSnapshot,
      updatePostData,
      taskDetail,
    } = this.props;
    const errors: any[] = await this.confirmValidate();

    if (!lodash.isEmpty(errors) && errors.length > 0) {
      return;
    }

    if (splitType === ESplitTypes.Case) {
      this.onConfirmCaseSplitCase();
      return;
    }
    // @ts-ignore

    let postData = await this.buildPostData();

    // 拦截分支的错误
    if (lodash.isEmpty(postData)) return;
    // 提供更新提交数据的回调
    if (lodash.isPlainObject(postData) && lodash.isFunction(updatePostData)) {
      postData = updatePostData(postData, splitType as ESplitTypes);
    }

    const hasNotification: boolean = await this.confirmNotification(postData);
    if (hasNotification) {
      return;
    }

    let originalCase = lodash.get(postData, 'originalCase');

    // 做最终的数据处理
    updateFinalData(postData);

    // 开启split loading狀態
    this.fnShowLoading(true);
    // 调用split case接口
    const result: any = await dispatch({
      type: 'caseSplitController/splitConfirm',
      payload: {
        postData,
        caseCategory: lodash.get(originalCase, 'caseCategory') || taskDetail.caseCategory,
        splitType,
      },
    });
    const { success, resultData } = lodash.pick(result, ['success', 'resultData']);

    if (success) {
      notification.success({
        message: 'Case split successfully!',
      });

      // 更新主页claim数据
      if (lodash.isFunction(updateClaimProcessData)) {
        originalCase = lodash.isPlainObject(resultData) ? resultData?.originalCase : originalCase;
        updateClaimProcessData(originalCase, this.fnShowLoading, splitType);
      }
      // 更新snapshot数据
      if (lodash.isFunction(saveSnapshot)) {
        saveSnapshot();
      }
      // 关闭模态框
      this.fnCancel();
    } else {
      const messageTips: string[] = lodash.compact(lodash.get(result, 'promptMessages'));
      messageTips.push('Case split failed,please try a later!');
      const messageTipsContent = lodash.map(messageTips, (item: any) => item.content).join('\n');
      notification.error({
        message: messageTips.length > 1 ? messageTipsContent : messageTips[0],
      });
      // 关闭split loading狀態
      this.fnShowLoading(false);
    }
  };

  clearDenormalizedData = (params: any) => {
    const {
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
    } = params;

    const originClaimData = denormalizeClaimDataForSplitCase(
      originClaimProcessData,
      originClaimEntities
    );
    const targetClaimData = denormalizeClaimDataForSplitCase(
      targetClaimProcessData,
      targetClaimEntities
    );

    const newCase: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(targetClaimData));
    const originalCase: any = formUtils.formatFlattenValue(
      formUtils.cleanValidateData(originClaimData)
    );

    return { newCase, originalCase };
  };

  fnSplitByIncident = () => {
    const { caseSplitIncidentController, claimDatas: initialCase } = this.props;

    const {
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
      isNewClaimNo,
      seriesNoOrigin,
      seriesNoTarget,
      caseRemark,
    } = caseSplitIncidentController;

    const { originalRemark, newRemark } = formUtils.cleanValidateData(caseRemark);

    const { originalCase: originClaimData, newCase: targetClaimData } = this.clearDenormalizedData({
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
    });

    const newCase: any = lodash.merge(targetClaimData, seriesNoTarget);
    newCase.operationType = 'split.case';

    const originalCase: any = lodash.merge(originClaimData, seriesNoOrigin);
    originalCase.regionCode = tenant.region();
    originalCase.operationType = 'split.case';

    return {
      newCase,
      originalCase,
      newClaimNo: isNewClaimNo,
      initialCase: formUtils.formatFlattenValue(formUtils.cleanValidateData(initialCase)),
      originalRemark,
      newRemark,
    };
  };

  fnSplitByPolicy = async () => {
    const { claimDatas: initialCase, caseSplitPolicyController, updatePaymentAmount } = this.props;
    const {
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
      isNewClaimNo,
      caseRemark,
    } = caseSplitPolicyController;

    const { originalRemark, newRemark } = formUtils.cleanValidateData(caseRemark);

    const { originalCase: originClaimData, newCase: targetClaimData } = this.clearDenormalizedData({
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
    });

    let originUpdate: any = null;
    let targetUpdate: any = null;
    if (lodash.isFunction(updatePaymentAmount)) {
      originUpdate = await updatePaymentAmount(originClaimData);
      targetUpdate = await updatePaymentAmount(targetClaimData);
    }

    const newCase: any = setFlags(targetUpdate || targetClaimData);
    newCase.operationType = 'split.case';

    const originalCase: any = setFlags(originUpdate || originClaimData);
    originalCase.regionCode = tenant.region();
    originalCase.operationType = 'split.case';

    return {
      newCase: formUtils.formatFlattenValue(formUtils.cleanValidateData(newCase)),
      originalCase: formUtils.formatFlattenValue(formUtils.cleanValidateData(originalCase)),
      newClaimNo: isNewClaimNo,
      initialCase: formUtils.formatFlattenValue(formUtils.cleanValidateData(initialCase)),
      originalRemark,
      newRemark,
    };
  };

  fnSplitDifferentIncidentNo = async () => {
    const { claimDatas: initialCase, caseSplitPolicyController } = this.props;
    const {
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
      isNewClaimNo,
      caseRemark,
    } = caseSplitPolicyController;

    const { originalRemark, newRemark } = formUtils.cleanValidateData(caseRemark);

    const { newCase, originalCase } = this.clearDenormalizedData({
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
    });

    return {
      newCase,
      originalCase,
      newClaimNo: isNewClaimNo,
      initialCase: formUtils.formatFlattenValue(formUtils.cleanValidateData(initialCase)),
      originalRemark,
      newRemark,
    };
  };

  fnSplitByDocument = () => {
    const { caseSplitDocumentController, taskDetail, claimProcessData } = this.props;
    const {
      isNewClaimNo,
      [SplitDocumentType.NewDocument]: newData,
      [SplitDocumentType.OriginalDocument]: originalData,
      caseRemark,
    } = caseSplitDocumentController;
    const { originalRemark, newRemark } = formUtils.cleanValidateData(caseRemark);
    const {
      businessNo: claimNo,
      inquiryBusinessNo: parentClaimNo,
      caseCategory,
      processInstanceId,
    } = taskDetail;

    return {
      newClaimNo: isNewClaimNo,
      claimNo,
      parentClaimNo,
      caseCategory,
      processInstanceId,
      originalRemark,
      newRemark,
      ...getSpliByDocPostList(claimProcessData, newData, originalData),
    };
  };

  // 校验 Claim Type 有没有丢失
  getBaseClaimType = (
    origIncidentList: IIncident[],
    newIncidentList: IIncident[],
    baseIncidentList: IIncident[]
  ) => {
    const errorMessage: string[] = [];
    if (
      lodash.size(origIncidentList) < 1 ||
      lodash.size(newIncidentList) < 1 ||
      lodash.size(baseIncidentList) < 1
    )
      return errorMessage;

    lodash.forEach(baseIncidentList, (baseItem) => {
      const origData: any =
        lodash.find(origIncidentList, (origItem) => origItem.id === baseItem.id) || {};

      const newData: any =
        lodash.find(newIncidentList, (newItem) => newItem.id === baseItem.id) || {};

      const mergeClaimType = lodash
        .chain(origData.claimTypeArray)
        .concat(newData.claimTypeArray)
        .compact()
        .uniq()
        .value();

      const claimType: string[] = lodash.compact(formUtils.queryValue(baseItem.claimTypeArray));

      const differ: string[] = lodash.difference(claimType, mergeClaimType);
      if (differ.length > 0) {
        const currentErrorMessage = formatMessageApi(
          { message: 'ERR_000127' },
          baseItem.incidentNo,
          this.getDictNameByDictCode(claimType),
          this.getDictNameByDictCode(differ)
        );

        errorMessage.push(currentErrorMessage);
      }
    });
    return errorMessage;
  };

  getDictNameByDictCode = (dictCode: string[]) => {
    const { claimTypes } = this.props;
    const dictNameArray: string[] = [];
    lodash.forEach(dictCode, (codeItem) => {
      lodash.forEach(claimTypes, (dictsItem) => {
        if (dictsItem.dictCode === codeItem) {
          dictNameArray.push(dictsItem.dictName);
        }
      });
    });
    return dictNameArray.length > 0 ? lodash.join(dictNameArray, ',') : [];
  };

  splitDifferentIncidentNo = () => {
    const { caseSplitPolicyController = {}, claimDatas, dispatch } = this.props;
    const {
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
      isNewClaimNo,
      caseRemark,
    }: any = caseSplitPolicyController;
    const initialCase = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimDatas));

    const { treatmentPayableListMap } = originClaimEntities || {};

    if (lodash.size(treatmentPayableListMap) === 1) {
      notification.warning({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'ERR_000133',
        }),
      });

      return;
    }

    const { originalRemark, newRemark } = formUtils.cleanValidateData(caseRemark);

    const { newCase, originalCase } = this.clearDenormalizedData({
      originClaimEntities,
      originClaimProcessData,
      targetClaimEntities,
      targetClaimProcessData,
    });

    dispatch({
      type: 'caseSplitPolicyController/splitReview',
      payload: {
        newCase,
        originalCase,
        newClaimNo: isNewClaimNo,
        initialCase,
        originalRemark,
        newRemark,
      },
    });
  };

  getShowDINEnable = () => {
    const { caseSplitPolicyController, taskDetail } = this.props;

    const { originClaimProcessData }: any = caseSplitPolicyController || {};
    const flags = originClaimProcessData?.flags;
    // const payToCustomer = claimDatas?.claimDecision?.payToCustomer > 0;
    const enableCaseCategory = [
      CaseCategory.TH_GC_CTG06,
      CaseCategory.TH_GC_CTG07,
      CaseCategory.IDAC,
    ].includes(taskDetail.caseCategory);

    return (
      enableCaseCategory && !lodash.chain(flags).split(',').includes('hospitalCaseSplit').value()
      // payToCustomer
    );
  };

  render() {
    const {
      modalShow,
      splitType,
      claimTypes,
      listPolicy,
      taskDetail,
      region,
      tabConfig,
      loadingSplit,
      previewSplit,
      loadingConfirm,
    } = this.props;

    const { showContent } = this.state;
    const showDifferenceIncidentNo = this.getShowDINEnable();
    console.log('splitType', splitType)
    return (
      <>
        {loadingSplit && (
          <TransparentModel visible>
            <div className={styles.contentWrap}>
              <div className={styles.spinWrap}>
                <Spin />
              </div>
            </div>
          </TransparentModel>
        )}
        {modalShow && (
          <Modal
            wrapClassName={styles.modal_split_case}
            visible={modalShow}
            confirmLoading
            centered
            closable={false}
            destroyOnClose
            onOk={this.fnConfirm}
            onCancel={this.fnCancel}
            footer={this.getFooterButton}
            width={'80%'}
          >
            {showContent && (
              <div className={styles.contentWrap}>
                <SectionTitle
                  title={formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.taskDetail.splitCase.split-case',
                  })}
                />
                <TabRadio
                  splitType={splitType}
                  handleSelect={this.handleSelect}
                  tabConfig={tabConfig}
                  showDifferenceIncidentNo={showDifferenceIncidentNo}
                />
                <Suspense
                  fallback={
                    <div className={styles.spinWrap}>
                      <Spin />
                    </div>
                  }
                >
                  <Provider
                    data={{
                      splitType,
                      claimTypes,
                      listPolicy,
                      taskDetail,
                      region,
                      removable: splitType !== ESplitTypes.DifferentIncidentNo,
                    }}
                  >
                    {(loadingConfirm || previewSplit) && (
                      <div className={styles.spinWrap}>
                        <Spin />
                      </div>
                    )}
                    {this.getSplitContent}
                  </Provider>
                </Suspense>
              </div>
            )}
          </Modal>
        )}
      </>
    );
  }
}

export default connect(
  ({
    caseSplitController,
    caseSplitIncidentController,
    caseSplitPolicyController,
    caseSplitDocumentController,
    caseSplitCaseController,
    loading,
    claimDataStatus,
  }: any) => ({
    loading,
    modalShow: caseSplitController.modalShow,
    loadingConfirm: loading.effects['caseSplitController/splitConfirm'],
    previewSplit: loading.effects['caseSplitPolicyController/splitReview'],
    splitType: caseSplitController.splitType,
    loadingSplit: caseSplitController.loadingSplit,
    caseSplitIncidentController,
    caseSplitPolicyController,
    caseSplitDocumentController,
    caseSplitCaseController,
    claimDataStatusIsLoadEnd: claimDataStatus.isLoadEnd,
    claimDatas: caseSplitController.claimDatas,
    claimProcessData: caseSplitDocumentController.claimProcessData,
    wholeEntities: caseSplitController.wholeEntities,
  })
)(CaseSplit);
