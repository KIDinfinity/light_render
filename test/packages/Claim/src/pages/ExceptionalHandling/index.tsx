import React, { Component } from 'react';
import { connect } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import FormLayout from 'basic/components/Form/FormLayout';
import { map, isObject } from 'lodash';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import TaskDefKey from 'enum/TaskDefKey';
import BusinessInfo from './SectionGroup/BusinessInfo';
import ErrorInfo from './SectionGroup/ErrorInfo';
import IntegrationProcess from './SectionGroup/IntegrationProcess';
import MappingModal from './MappingModal';
import RetrySettlement from './SectionGroup/RetrySettlement';
import styles from './index.less';
import { Tabs } from 'antd';
import ErrorTip from './components/ErrorTip';
const { TabPane } = Tabs;
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class ManualIdentification extends Component<any> {
  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail = {} } = this.props;

    await dispatch({
      type: 'exceptionalHandlingController/saveExceptionCategoryList',
    });

    await dispatch({
      type: `exceptionalHandlingController/saveClaimProcessData`,
      payload: {
        businessData,
        taskDetail,
      },
    });
    await dispatch({
      type: `exceptionalHandlingController/saveTaskDetail`,
      payload: {
        ...taskDetail,
      },
    });

    if (taskDetail?.activityKey === TaskDefKey.BP_IE_ACT002) {
      await dispatch({
        type: 'exceptionalHandlingController/getRetryList',
      });
    }
  };

  componentDidMount = async () => {
    await this.getDropDown();
    await this.getClaimData();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'exceptionalHandlingController/clearClaimProcessData',
    });
  };

  getDropDown = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Dropdown_CFG_ExceptionCategory', 'Dropdown_ING_ErrorCode'],
    });
  };

  handleSubmit = (isSave: boolean) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'exceptionalHandlingController/updateIsSave',
      payload: { isSave },
    });
    bpm.buttonAction('submit');
  };

  handleChangeTab = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'exceptionalHandlingController/updateActiveKey',
      payload: { activeKey: e },
    });
  };

  checkError = (list) => {
    return list?.some((item) =>
      Object.values(item?.errorInfo)
        ?.filter((value) => isObject(value))
        ?.some((errorObj) => errorObj?.errors)
    );
  };
  render() {
    const {
      showMappingModal,
      oldErrorInfo,
      errorInfoList,
      taskDetail,
      integrationExceptionHandlingDataList,
      activeKey,
    } = this.props;
    return (
      <div className={styles.container}>
        <FormLayout layConf={24}>
          <RetrySettlement />
          <BusinessInfo />
          {integrationExceptionHandlingDataList?.length > 0 && (
            <Tabs activeKey={activeKey} onChange={this.handleChangeTab.bind(this)}>
              {integrationExceptionHandlingDataList.map((item, index) => (
                <TabPane
                  tab={
                    <div className={styles.errorTap}>
                      {item?.integrationCode}
                      {this.checkError(item?.errorInfoList) && <ErrorTip />}
                    </div>
                  }
                  key={index}
                  forceRender
                >
                  {map(
                    item?.errorInfoList || [{ errorInfo: item?.errorInfo }],
                    (errorInfoItem, errorInfoIndex) => {
                      return (
                        <ErrorInfo
                          integrationIndex={index}
                          index={errorInfoIndex}
                          taskDetail={taskDetail}
                          errorInfo={errorInfoItem?.errorInfo}
                        />
                      );
                    }
                  )}
                  <IntegrationProcess index={index} />
                </TabPane>
              ))}
            </Tabs>
          )}
        </FormLayout>
        <MappingModal
          visible={showMappingModal}
          errorInfoList={errorInfoList || [{ oldErrorInfo }]}
          onOk={() => {
            this.handleSubmit(true);
          }}
          onCancel={() => {
            this.handleSubmit(false);
          }}
        />
      </div>
    );
  }
}

export default connect(({ exceptionalHandlingController }: any) => ({
  activeKey: exceptionalHandlingController?.activeKey,
  showMappingModal: exceptionalHandlingController?.showMappingModal,
  oldErrorInfo: exceptionalHandlingController?.claimProcessData?.errorInfo,
  errorInfoList: exceptionalHandlingController?.claimProcessData?.errorInfoList,
  integrationExceptionHandlingDataList:
    exceptionalHandlingController?.claimProcessData?.integrationExceptionHandlingDataList,
}))(ManualIdentification);
