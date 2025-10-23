import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import styles from './item.less';
import searchStyles from './SearchInsuredModal.less';
import SearchInsuredForm from './SearchInsuredForm';
import SelectInsuredForm from './SelectInsuredForm';
import { FormAntCard } from 'basic/components/Form';
const FORMID = 'searchInsuredModal';

interface IProps {
  dispatch: any;
  form: any;
  editable: boolean;
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
      type: `opusClaimDataCapture/updateShowSearchModal`,
      payload: {
        showSearchModel: false,
      },
    });
  };

  render() {
    const { showModal, editable } = this.props;

    return (
      <div className={styles.itemWrap}>
        {showModal && editable && (
          <Modal
            visible={showModal}
            footer={null}
            onCancel={() => {
              this.hideShowModal();
            }}
            width="55%"
            bodyStyle={{
              zIndex: 1000,
            }}
          >
            <div className={searchStyles.searchInsured}>
              <FormAntCard title="Search Insured" bordered={false}>
                <SearchInsuredForm />
                <SelectInsuredForm />
              </FormAntCard>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(({ opusClaimDataCapture, processTask }: any) => ({
  claimProcessData: opusClaimDataCapture.claimProcessData,
  showModal: opusClaimDataCapture.showSearchModel,
}))(SearchInsuredModal);
