import AuthPremission from '@/auth/Authorized/AuthPremission';
import { getAuth } from '@/auth/Utils';
import { Action } from '@/components/AuditLog/Enum';
import {
  eEventName,
  eEventOperation,
  tarckCaseManageLoad,
  tarckUnload,
} from '@/components/TarckPoint';
import { Region, tenant } from '@/components/Tenant';
import { handleWarnMessageModal, messageModal } from '@/utils/commonMessage';
import { linkTos, memoCatgs } from '@/utils/constant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { notification, Spin } from 'antd';
import useHandleChangeDataPiorityCallback from 'basic/components/DataPriorityContainer/hooks/useHandleChangeDataPiorityCallback';
import TaskStatus from 'basic/enum/TaskStatus';
import { ButtonCode } from 'bpm/enum';
import { connect } from 'dva';
import DataPriority from 'enum/DataPriority';
import lodash from 'lodash';
import moment from 'moment';
import DetailHeader from 'navigator/components/DetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import LeftMenu from 'navigator/components/LeftMenu';
import SectionDivider from 'navigator/components/SectionDivider';
import RuleResultsModel from 'process/NB/ManualUnderwriting/RuleResultsModel';
import React, { Component, useEffect } from 'react';
import { history, useParams } from 'umi';
import Activity from './CaseDetailActivity';
import Info from './CaseDetailInfo';
import Logs from './CaseDetailLogs';
import CaseRelevant from './CaseRelevant';
import styles from './index.less';
import ProcessOverview from './ProcessOverview';
import ProcessOverviewModal from './ProcessOverviewModal';
import useJudgeChecklistCanUse from '@/_hooks/useJudgeChecklistCanUse';
import { useDispatch } from 'dva';

@connect(
  ({
    workspaceCases,
    navigatorInformationController,
    user,
    envoyController,
    authController,
  }: any) => ({
    configData: lodash.get(navigatorInformationController, 'configData'),
    user,
    userId: user.currentUser.userId,
    urgent: workspaceCases.urgent,
    isClaimReversal: workspaceCases.isClaimReversal,
    isClaimReverse: workspaceCases.isClaimReverse,
    activityLogList: workspaceCases.activityLogList,
    infoData: workspaceCases?.infoData || {},
    taskId: workspaceCases?.infoData?.currentTaskId,
    favorStatus: workspaceCases?.favorStatus,
    processInstanceId: lodash.get(envoyController, 'caseNo'),
    activityList: workspaceCases?.activityList,
    isCaseEnd: workspaceCases?.isCaseEnd,
    defaultCategoryCode: workspaceCases?.defaultCategoryCode,
    permissionMenus: authController.permissionMenus,
    allCategoryHistory: navigatorInformationController.allCategoryHistory,
    commonAuthorityList: authController.commonAuthorityList,
    noPermissionCases: authController.noPermissionCases,
    indicator: workspaceCases.indicator,
  })
)
class CaseDetail extends Component {
  state = {
    isDocumentAllowed: false,
    currentCaseCategory: '',
    loadingPMA: false,
    loading: false,
  };

  componentDidMount = async () => {
    const { dispatch, commonAuthorityList }: any = this.props;

    // document按钮权限校验
    const isDocumentAllowed: boolean = getAuth(commonAuthorityList, {
      authorityCode: 'RS_Menu_CaseManagement_Document',
    });
    this.setState({
      isDocumentAllowed,
    });

    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });

    const infoData = await this.fetchInitData(false);
    tarckCaseManageLoad({
      dispatch,
      taskDetail: infoData,
      eventName: eEventName.caseManagement,
      eventOperation: eEventOperation.viewDetail,
    });
  };

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: true,
      },
    });
    this.handleResetState();
    tarckUnload(this.props);
  };

  // 智能环点击时更新页面信息
  componentDidUpdate = async (prevProps: any) => {
    const { defaultCategoryCode, activityList, match, dispatch }: any = this.props;

    if (
      !lodash.isEqual(prevProps?.match?.params.processInstanceId, match?.params?.processInstanceId)
    ) {
      if (prevProps) {
        tarckUnload(prevProps);
      }
      await this.fetchInitData(false);
    }
    // if (defaultCategoryCode !== prevProps.defaultCategoryCode) {
    //   const currentActivity = lodash.findLast(activityList, (v) => v?.processActivityStatus);
    //   if (
    //     currentActivity?.processActivityStatus === 'inprogress' &&
    //     (defaultCategoryCode === 'assessmentNotice' ||
    //       defaultCategoryCode === 'approvalNotice' ||
    //       defaultCategoryCode === 'reject')
    //   ) {
    //     dispatch({
    //       type: 'workspaceSwitchOn/changeSwitch',
    //       payload: {
    //         name: 'remark',
    //       },
    //     });
    //   }
    // }
  };

  handleResetState = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'workspaceCases/resetState',
    });
  };

  fetchInitData = async (clear = true) => {
    this.setState({ loading: true });
    const {
      match,
      dispatch,
      processInstanceId,
      getTaskDetail,
      setProcessInstanceId,
      noPermissionCases,
    }: any = this.props;
    const originClaimNo = match?.params?.processInstanceId || '';
    const paname = window.location.pathname;
    const caseNo = originClaimNo || paname.slice(paname.lastIndexOf('/') + 1, paname.length) || '';
    if (!lodash.isEmpty(caseNo)) {
      // 保存case envoyController
      dispatch({
        type: 'envoyController/setCaseNo',
        payload: {
          ...processInstanceId,
          caseNo,
        },
      });

      if (clear) {
        // information 信息
        await dispatch({
          type: 'navigatorInformationController/saveProcessInstanceIdReducer',
          payload: {
            dataKey: 'caseNo',
            processInstanceId: caseNo,
          },
        });
      }

      if (noPermissionCases[caseNo]) {
        await getTaskDetail({ processInstanceId: caseNo });
        return { processInstanceId: caseNo };
      }

      this.fetchActivityAndLogData(async (res: any) => {
        const { processActivityVOList }: any = this.props;
        // 找出这个case对应的节点
        const resFilter = lodash.filter(
          processActivityVOList,
          (item) => item.processActivityStatus === 'inprogress'
        );
        let activityName;
        if (!lodash.isEmpty(resFilter)) {
          // 进行中
          activityName = lodash.get(resFilter && resFilter[0], 'processActivityName');
        }

        // 需要备忘时初始状态
        this.dispatchRemark({
          processInstanceId: res?.processInstanceId || caseNo,
          procActName: activityName,
          res,
        });
      });

      const infoData = await dispatch({
        type: 'workspaceCases/infoData',
        payload: {
          processInstanceId: caseNo,
        },
      });

      if (infoData !== false) {
        await dispatch({
          type: 'workspaceCases/judgeIsShowRemark',
        });
        this.fetchProcessStatus();
        this.getClaimReversalStatus();
        this.getClaimReverseStatus();
        dispatch({
          type: 'workspaceCases/loadProcessOverview',
          payload: {
            processInstanceId: caseNo,
          },
        });
        setProcessInstanceId(caseNo);
      }
      await getTaskDetail({ processInstanceId: caseNo });

      await dispatch({
        type: 'workspaceCases/getIndicator',
      });

      this.setState({ loading: false });

      return infoData;
    }

    this.setState({ loading: false });
  };

  fetchProcessStatus = async () => {
    const { dispatch, match }: any = this.props;
    const form = new FormData();
    form.append('processInstanceId', match?.params?.processInstanceId);

    const response = await dispatch({
      type: 'processInstance/findProcessStatus',
      payload: form,
    });

    if (response?.success) {
      dispatch({
        type: 'workspaceCases/setIsCaseEnd',
        payload: { isCaseEnd: response?.resultData?.toLowerCase() === 'completed' || false },
      });
    }
  };

  getClaimReversalStatus = async () => {
    const { dispatch, taskId }: any = this.props;

    dispatch({
      type: 'workspaceCases/getClaimReversalStatus',
      payload: { taskId },
    });
  };

  getClaimReverseStatus = async () => {
    const { dispatch }: any = this.props;
    if (tenant.region() === Region.HK) {
      dispatch({
        type: 'workspaceCases/getClaimReverseStatus',
      });
    }
  };

  dispatchRemark = async (params: any) => {
    const { configData, dispatch }: any = this.props;
    // 获取历史数据
    dispatch({
      type: 'navigatorInformationController/findInformationHist',
      payload: {
        linkToKey: linkTos.CASE,
        linkToValue: params?.processInstanceId,
        processInstanceId: params?.processInstanceId,
        status: 'P',
        category: configData?.content || memoCatgs.REMARK,
      },
    });
  };

  fetchActivityAndLogData = async (callback: any) => {
    const { dispatch, match }: any = this.props;

    const response = await dispatch({
      type: 'workspaceCases/activityList',
      payload: {
        processInstanceId: match?.params?.processInstanceId,
      },
    });

    if (callback) {
      callback(response);
    }
  };

  endProcess = async () => {
    const { dispatch, isCaseEnd, infoData, allCategoryHistory }: any = this.props;
    const {
      businessNo,
      inquiryBusinessNo,
      caseCategory,
      processInstanceId,
      currentActivityKey: activityCode,
    }: any = lodash.pick(infoData, [
      'businessNo',
      'inquiryBusinessNo',
      'caseCategory',
      'processInstanceId',
      'currentActivityKey',
    ]);

    const cancelReason = lodash
      .chain(allCategoryHistory)
      .compact()
      .find((item) => item?.categoryCode === 'endCaseRemark')
      .get('informationList')
      .first()
      .get('informationDOList')
      .first()
      .get('reason')
      .value();

    const checkResult = await dispatch({
      type: 'workspaceCases/checkInformation',
      payload: {
        extraParams: {
          activityCode,
          buttonCode: 'endCase',
          businessNo: '',
          inquiryBusinessNo: '',
          operationType: '',
        },
      },
    });
    if (!checkResult) {
      return false;
    }

    messageModal(
      {
        typeCode: 'Label_COM_WarningMessage',
        dictCode: 'WRN_000014',
      },
      {
        okFn: async () => {
          const response = await dispatch({
            type: 'workspaceCases/deleteCase',
            payload: {
              caseNo: processInstanceId,
              businessNo,
              inquiryBusinessNo,
              caseCategory,
              operationType: 'cancel',
              cancelReason,
            },
          });
          if (response?.success) {
            dispatch({
              type: 'workspaceCases/setIsCaseEnd',
              payload: { isCaseEnd: !isCaseEnd },
            });
            if (!!businessNo && !lodash.isEmpty(businessNo) && tenant.region() === Region.TH) {
              dispatch({
                type: 'workspaceCases/removeBusinessObject',
                payload: {
                  buttonCode: ButtonCode.EndCase,
                  businessNo,
                },
              });
            }

            this.fetchInitData();
          }
        },
      }
    );
  };

  rapidAndcancelrRapid = () => {
    const { isCaseEnd }: any = this.props;
    if (isCaseEnd) return;
    const { dispatch, match }: any = this.props;

    dispatch({
      type: 'workspaceCases/urgent',
      payload: {
        processInstanceId: match?.params?.processInstanceId,
      },
    });
  };

  claimReversal = () => {
    const { dispatch, isClaimReversal, taskId }: any = this.props;

    if (!isClaimReversal || !taskId) return;
    dispatch({
      type: 'workspaceCases/claimReversal',
      payload: {
        currentTaskId: taskId,
      },
    });
  };

  handleClaimRevere = () => {
    const { dispatch }: any = this.props;

    handleWarnMessageModal(
      [{ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000628' }) }],
      {
        okFn: () => {
          dispatch({
            type: 'workspaceCases/claimReverse',
          });
        },
      }
    );
  };

  documentManageOpen = () => {
    const { processInstanceId }: any = this.props;
    window.open(`/documentManage/${processInstanceId}`);
  };

  handleOpenProcessOverviewModal = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'workspaceCases/setVisiable',
      payload: {
        processOverviewModalVisible: true,
      },
    });
  };

  handleOpenEws = async () => {
    const { infoData, dispatch }: any = this.props;
    const { processInstanceId, inquiryBusinessNo, caseCategory, businessNo }: any = lodash.pick(
      infoData,
      ['processInstanceId', 'inquiryBusinessNo', 'caseCategory', 'businessNo']
    );
    if ((inquiryBusinessNo && processInstanceId) || (businessNo && processInstanceId)) {
      if ('BP_POS_CTG001' === caseCategory || 'BP_POS_CTG006' === caseCategory) {
        window.open(`/servicing/ews/${businessNo}/${processInstanceId}`, '_blank');
        return;
      }

      if ('BP_POS_CTG002' === caseCategory) {
        const { success, businessNo: newBusinessNo } = await dispatch({
          type: `GeneralPOSController/ewsGetBusinessNo`,
          payload: {
            businessNo,
          },
        });

        if (success && newBusinessNo) {
          window.open(`/servicing/ews/${newBusinessNo}/${processInstanceId}`, '_blank');
        }
        return;
      }
      window.open(`/nb/uw/ews/${inquiryBusinessNo}/${processInstanceId}`, '_blank');
    }
  };
  handleOpenruleResults = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'workspaceCases/getRuleResultsModal',
    });
    dispatch({
      type: 'workspaceCases/getRuleResultByCaseNo',
    });
  };

  handleAppeal = async () => {
    const { dispatch, infoData, userId }: any = this.props;

    const response = await dispatch({
      type: 'workspaceCases/createCase',
      payload: {
        activityVariables: {
          applicant: userId,
        },
        caseCategory: 'BP_AP_CTG01',
        operationType: 'create',
        businessData: {
          claimNo: lodash.get(infoData, 'businessNo'),
        },
      },
    });
    if (response?.success) {
      notification.success({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'MSG_000846',
        }),
      });
      history.push(`/process/task/detail/${lodash.get(response, 'resultData.taskId')}`);

      return true;
    }
  };

  handleAFI = async () => {
    const { dispatch, infoData, activityList, userId, taskId }: any = this.props;
    const activityCode = lodash.chain(activityList).first().get('processActivityKey').value();
    this.setState({ loading: true });

    const checkResult = await dispatch({
      type: 'workspaceCases/checkInformation',
      payload: {
        extraParams: {
          activityCode,
          buttonCode: ButtonCode.Appeal,
          operationType: 'validateCreateAppeal',
        },
      },
    });

    if (!checkResult) {
      this.setState({ loading: false });
      return false;
    }

    const caseCategory = infoData?.caseCategory;
    const createCaseCategory = (() => {
      switch (caseCategory) {
        case 'BP_NB_CTG001':
        default:
          return 'BP_AP_CTG02';
        case 'BP_NB_CTG005':
          return 'BP_AP_CTG03';
      }
    })();

    const params = {
      activityVariables:
        tenant.region() !== Region.TH
          ? {
              applicant: userId,
            }
          : null,
      businessNo: lodash.get(infoData, 'businessNo'),
      caseCategory: createCaseCategory,
      operationType: 'asyncAppealCreate',
      caseNo: lodash.get(infoData, 'processInstanceId'),
    };

    const response = await dispatch({
      type: 'workspaceCases/asyncTouch',
      payload: { params },
    });

    if (response?.success) {
      notification.success({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'venus_bpm.message.revert.success',
        }),
      });
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Reversal,
        },
      });
      history.push(`/process/task/detail/${lodash.get(response, 'resultData.taskId')}`);
      this.setState({ loading: false });
      return true;
    } else {
      this.setState({ loading: false });
      return false;
    }
  };

  hanleSendPMA = async (ev) => {
    if (ev) ev.preventDefault();
    const { dispatch, userId, infoData } = this.props;
    const {
      processInstanceId: caseNo,
      businessNo,
      insuredFirstName,
      insuredLastName,
      inquiryBusinessNo,
      companyCode,
    } = lodash.pick(infoData, [
      'businessNo',
      'inquiryBusinessNo',
      'caseCategory',
      'processInstanceId',
      'currentActivityKey',
      'insuredFirstName',
      'insuredLastName',
      'companyCode',
    ]);
    this.setState({
      loadingPMA: true,
    });
    await dispatch({
      type: 'workspaceCases/smartCreate',
      payload: {
        createParams: {
          operationType: 'create',
          createLocation: '01',
          caseCategory: 'HK_CR_CTG001',
          activityVariables: {
            applicant: userId,
          },
          submissionDate: moment().format(),
          submissionChannel: 'RCS',
          relatedCase: {
            relationship: 'Subsequent Case',
            copyData: '00',
            caseNo,
          },
          companyCode,
          businessData: {
            chequeCase: {
              chequeCategory: 'PMA',
              currency: 'HKD',
              inquiryBusinessNo,
              insuredName: `${insuredFirstName} ${insuredLastName}`,
              businessNo,
              budgetCode: '549030',
              costCentre: '020112',
            },
          },
        },
      },
    });
    this.setState({
      loadingPMA: false,
    });
  };

  render() {
    const {
      match,
      isCaseEnd,
      isClaimReversal,
      isClaimReverse,
      urgent,
      permissionMenus,
      infoData,
      indicator,
      commonAuthorityList,
    }: any = this.props;

    const { loading } = this.state;

    const isShowEwsButton =
      !getAuth(commonAuthorityList, {
        authorityCode: 'UnviewableViewEWorkSheet',
      }) &&
      [
        'BP_NB_CTG001',
        'BP_NB_CTG002',
        'BP_POS_CTG001',
        'BP_POS_CTG006',
        'BP_POS_CTG002',
        'BP_AP_CTG03',
        'BP_NB_CTG005',
      ].includes(lodash.get(infoData, 'caseCategory', ''));
    const isShowRuleResultsButton = tenant.region() === Region.VN;
    return (
      <>
        <AuthPremission type="caseDetail" caseDetailCaseNo={match?.params?.processInstanceId}>
          <Spin spinning={loading}>
            <DetailHeader
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.caseDetail.title',
              })}
              indicator={indicator}
              description={infoData?.status === TaskStatus.reversed ? 'Reversed' : ''}
            />
            <div className={styles.container}>
              <DetailSider>
                <LeftMenu
                  rapidAndcancelrRapid={this.rapidAndcancelrRapid}
                  endProcess={this.endProcess}
                  isCaseEnd={isCaseEnd}
                  isClaimReversal={isClaimReversal}
                  isClaimReverse={isClaimReverse}
                  isDocumentAllowed={this.state.isDocumentAllowed}
                  isSendPMA={infoData?.isSendPMA || false}
                  loadingPMA={this.state.loadingPMA}
                  urgent={urgent}
                  claimReversal={this.claimReversal}
                  handleClaimRevere={this.handleClaimRevere}
                  permissionMenus={permissionMenus}
                  documentManageOpen={this.documentManageOpen}
                  handleOpenEws={this.handleOpenEws}
                  handleAFI={this.handleAFI}
                  hanleSendPMA={this.hanleSendPMA}
                  isShowEwsButton={isShowEwsButton}
                  handleOpenruleResults={this.handleOpenruleResults}
                  isShowRuleResultsButton={isShowRuleResultsButton}
                  caseCategory={lodash.get(infoData, 'caseCategory')}
                  status={lodash.get(infoData, 'status')}
                  handleAppeal={this.handleAppeal}
                  showPMA={getAuth(commonAuthorityList, {
                    authorityCode: 'RS_HK_Button_CaseManagement_CreateCheque',
                  })}
                />
              </DetailSider>
              <div className={`${styles.content} ${styles['black-scroll']}`}>
                <SectionDivider
                  title={formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.caseDetail.basic-information',
                  })}
                />
                <Info />
                <SectionDivider
                  title={formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.caseDetail.case-progress',
                  })}
                  buttonConfig={{
                    label: 'Progress Overview',
                    action: this.handleOpenProcessOverviewModal,
                  }}
                />
                <Activity />
                <Logs />
                <SectionDivider
                  title={formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.caseDetail.relevant-cases',
                  })}
                />
                <CaseRelevant {...this.props} />
                <ProcessOverviewModal>
                  <ProcessOverview />
                </ProcessOverviewModal>
              </div>
            </div>
          </Spin>
          <RuleResultsModel NAMESPACE={'workspaceCases'} />
        </AuthPremission>
      </>
    );
  }
}

export default (props: any) => {
  const handleChangePriority = useHandleChangeDataPiorityCallback();
  const params = useParams();
  const checklistOpen = useJudgeChecklistCanUse();
  useEffect(() => {
    window.requestIdleCallback(() => {
      handleChangePriority(DataPriority.MEDIUM);
    });
  }, [handleChangePriority]);

  const caseNo = params?.processInstanceId;
  const dispatch = useDispatch();
  useEffect(() => {
    if (caseNo && checklistOpen) {
      dispatch({
        type: 'integration/getDataParams',
        payload: {
          caseNo,
        },
      });
    }
  }, [caseNo, checklistOpen]);

  return <CaseDetail {...props} match={{ params }} />;
};
