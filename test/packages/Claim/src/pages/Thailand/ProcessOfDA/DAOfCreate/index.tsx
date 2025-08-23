import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import SectionTitle from 'claim/components/SectionTitle';
import lodash from 'lodash';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import BasicInfo from './BasicInfo';
import CaseInformation from './CaseInformation/CaseInformation';
import BasicInformation from './BasicInformation/BasicInformation';
import InsuredInfo from './Insured/InsuredInfo';
import IncidentList from './Incident/IncidentList';
import PayeeInfoList from './Payee/PayeeInfoList';
import LeftMenu from './LeftMenu';
import styles from './index.less';
import { enumCaseCategory } from './_models/dto';

@connect(({ daProcessController, user }) => ({
  claimProcessData: daProcessController.claimProcessData,
  payeeList: lodash.get(daProcessController, 'claimProcessData.payeeList', [])[0],
  user,
  caseCategory: lodash.get(daProcessController, 'claimProcessData.caseCategory'),
}))
class Create extends Component {
  state = {
    processInstanceId: '---',
    inquiryBusinessNo: '---',
    caseNoLoading: false,
    result: {
      processInstanceId: '---',
      inquiryBusinessNo: '---',
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
    const { dispatch } = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THDACreate,
    });
    // dispatch({
    //   type: 'dictionaryController/bankDropdown',
    // });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
    dispatch({
      type: 'dictionaryController/surgeryProcedureDropdown',
    });
    dispatch({
      type: 'dictionaryController/serviceItemDropdown',
    });
  };

  handleSubmit = async () => {
    const { dispatch, claimProcessData } = this.props;
    const errors: any = await dispatch({
      type: 'daProcessController/validateFields',
    });
    const submitData = {
      ...claimProcessData,
      variables: {
        applicant: '',
        remainingTime: 8,
        isUrgent: 0,
      },
    };

    if (errors.length <= 0) {
      this.setState({
        caseNoLoading: true,
      });
      const response = await dispatch({
        type: 'daProcessController/create',
        payload: formUtils.formatFlattenValue(formUtils.cleanValidateData(submitData)),
      });
      this.setState({
        caseNoLoading: false,
      });
      if (response?.success && response?.resultData) {
        const { caseNo, inquiryBusinessNo } = lodash.pick(response?.resultData, [
          'caseNo',
          'inquiryBusinessNo',
        ]);
        this.setState({
          processInstanceId: caseNo || '---',
          inquiryBusinessNo: inquiryBusinessNo || '---',
        });
      }
    }
  };

  render() {
    const { processInstanceId, inquiryBusinessNo, caseNoLoading } = this.state;
    const { payeeList, caseCategory } = this.props;
    const isIHB = formUtils.queryValue(caseCategory) === enumCaseCategory.TH_IHB_CTG01;
    return (
      <>
        <TaskDetailHeader title="Create Case">
          <BasicInfo
            caseNo={processInstanceId}
            inquiryBusinessNo={inquiryBusinessNo}
            caseNoLoading={caseNoLoading}
          />
        </TaskDetailHeader>
        <div className={styles.container}>
          <DetailSider>
            <LeftMenu handleSubmit={this.handleSubmit} />
          </DetailSider>
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap}>
              <CaseInformation />
              {isIHB && <BasicInformation />}
              {!isIHB && <InsuredInfo />}
              {!isIHB && (
                <SectionTitle
                  title={formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
                  })}
                />
              )}
              {!isIHB && <IncidentList />}
              {!isIHB && (
                <SectionTitle
                  title={formatMessageApi({
                    Label_BIZ_Claim:
                      'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
                  })}
                />
              )}
              {!isIHB && <PayeeInfoList payeeList={payeeList} />}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;
