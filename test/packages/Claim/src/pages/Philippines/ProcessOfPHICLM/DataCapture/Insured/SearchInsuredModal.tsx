import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Card } from 'antd';
import styles from './item.less';
import searchStyles from './SearchInsuredModal.less';
import SearchInsuredForm from './SearchInsuredForm';
import SelectInsuredForm from './SelectInsuredForm';

const FORMID = 'searchInsuredModal';

interface IProps {
  dispatch: any;
  form: any;
  taskNotEditable: boolean;
}

class SearchInsuredModal extends Component<IProps> {

  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  hideShowModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `PHCLMOfDataCaptureController/updateShowSearchModal`,
      payload: {
        showSearchModel: false,
      }
    });

  }


  render() {
    const { showModal, taskNotEditable } = this.props;
    return (
      <div className={styles.itemWrap}>
        {showModal && !taskNotEditable &&
          (<Modal
            visible={showModal}
            footer={null}
            onCancel={() => {
              this.hideShowModal()
            }}
            width="55%"
            bodyStyle={{
              zIndex: 1000,
            }}
          >
            <div className={searchStyles.searchInsured}>
              <Card
                title="Search Insured"
                bordered={false}
              >
                <SearchInsuredForm />
                <SelectInsuredForm />
              </Card>
            </div>
          </Modal>)
        }
      </div>
    );
  }
}

export default connect(
  ({
    PHCLMOfDataCaptureController,
    claimEditable,
  }: any) => ({
    claimProcessData: PHCLMOfDataCaptureController.claimProcessData,
    showModal: PHCLMOfDataCaptureController.showSearchModel,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)(SearchInsuredModal);
