import React, { Component } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import lodash from 'lodash';
import BasicInfo from './BasicInfo';
import LeftMenu from './LeftMenu';
import styles from './index.less';
import dictionaryConfig from './DictionaryByTypeCodes.config';
@connect(({ idProcessController, user }) => ({
  claimProcessData: idProcessController.claimProcessData,
  payeeList: lodash.get(idProcessController, 'claimProcessData.payeeList', [])[0],
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
      payload: dictionaryConfig?.create,
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
      type: 'idProcessController/validateFields',
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
      type: 'idProcessController/create',
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
        type: 'idProcessController/getClaimCaseNo',
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
              create
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;
