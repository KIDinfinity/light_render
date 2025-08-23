import React, { Component } from 'react';
import { connect } from 'dva';
import { notification, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import SectionTitle from 'claim/components/SectionTitle';
import lodash from 'lodash';
import BasicInfo from './BasicInfo';
import CaseInformation from './CaseInformation/CaseInformation';
import InsuredInfo from './Insured/InsuredInfo';
import ClaimantInfo from './Claimant/ClaimantInfo';
import IncidentList from './Incident/IncidentList';
import PayeeInfoList from './Payee/PayeeInfoList';
import LeftMenu from './LeftMenu';
import styles from './index.less';
import dictionaryConfig from './DictionaryByTypeCodes.config';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

@connect(({ hkProcessController, user }) => ({
  claimProcessData: hkProcessController.claimProcessData,
  payeeList: lodash.get(hkProcessController, 'claimProcessData.payeeList', [])[0],
  user,
}))
class Create extends Component {
  state = {
    result: {
      processInstanceId: '---',
      claimNo: '---',
      parentClaimNo: '---',
      caseNoLoading: false,
    },
  };

  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });
    this.getDropdown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: true,
      },
    });
  };

  getDropdown = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THCreate,
    });
    dispatch({
      type: 'dictionaryController/nationalityDropdown',
    });
    dispatch({
      type: 'dictionaryController/bankDropdown',
    });
    dispatch({
      type: 'dictionaryController/occupationDropdown',
    });
  };

  handleSubmit = async () => {
    const { dispatch, claimProcessData } = this.props;
    const errors = await dispatch({
      type: 'hkProcessController/validateFields',
    });
    if (lodash.size(errors) > 0) return;
    const submitData = {
      ...claimProcessData,
      variables: {
        applicant: '',
        remainingTime: 8,
        isUrgent: 0,
      },
    };
    const response = await dispatch({
      type: 'hkProcessController/create',
      payload: formUtils.formatFlattenValue(formUtils.cleanValidateData(submitData)),
    });

    if (response?.success) {
      const { businessNo, parentClaimNo } = response?.resultData;
      this.setState((state: any) => {
        return {
          ...state,
          result: {
            ...state.result,
            claimNo: businessNo,
            parentClaimNo,
            caseNoLoading: true,
          },
        };
      });
      notification.success({
        message: 'Create successfully!',
      });
      const result = await dispatch({
        type: 'hkProcessController/getClaimCaseNo',
        payload: {
          claimNo: businessNo,
        },
      });
      if (result?.success && result?.resultData) {
        this.setState((state: any) => {
          return {
            ...state,
            result: {
              ...state.result,
              processInstanceId: result.resultData,
              caseNoLoading: false,
            },
          };
        });
      } else {
        this.setState((state: any) => {
          return {
            ...state,
            result: {
              ...state.result,
              caseNoLoading: false,
            },
          };
        });
      }
    } else if (response?.success === false) {
      this.setState({
        result: {},
      });
      handleMessageModal(response?.promptMessages);
    }
  };

  render() {
    const { result } = this.state;
    const { payeeList } = this.props;

    return (
      <>
        <TaskDetailHeader title="Create Case">
          <BasicInfo
            caseNo={result?.processInstanceId}
            claimNo={result?.claimNo}
            parentClaimNo={result?.parentClaimNo}
            caseNoLoading={result?.caseNoLoading}
          />
        </TaskDetailHeader>
        <div className={styles.container}>
          <DetailSider>
            <LeftMenu handleSubmit={this.handleSubmit} />
          </DetailSider>
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap}>
              <CaseInformation />
              <Row gutter={24}>
                <Col {...layout}>
                  <InsuredInfo />
                </Col>
                <Col {...layout}>
                  <ClaimantInfo />
                </Col>
              </Row>
              <SectionTitle
                title={formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
                })}
              />
              <IncidentList />
              <SectionTitle
                title={formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
                })}
              />
              <PayeeInfoList payeeList={payeeList} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;
