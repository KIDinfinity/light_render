import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { FormAntCard } from 'basic/components/Form';
import SearchForm from './SearchForm';
import SelectForm from './SelectForm';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Styles from './index.less';
import ItemStyles from './item.less';

const SearchInsuredModal = ({ taskDetail }: any) => {
  const dispatch = useDispatch();

  const showInsuredList = useSelector(
    ({ batchDocumentScanningController }: any) => batchDocumentScanningController.showInsuredList
  );
  const hideShowModal = () => {
    dispatch({
      type: `batchDocumentScanningController/saveShowInsuredList`,
      payload: {
        showInsuredList: false,
      },
    });
  };

  return (
    <div className={ItemStyles.itemWrap}>
      <Modal
        visible={showInsuredList || false}
        footer={null}
        onCancel={() => {
          hideShowModal();
        }}
        width="55%"
        bodyStyle={{
          zIndex: 1000,
        }}
      >
        <div className={Styles.searchInsured}>
          <FormAntCard title="Search Insured" bordered={false}>
            <SearchForm taskDetail={taskDetail} />
            <SelectForm taskDetail={taskDetail} />
          </FormAntCard>
        </div>
      </Modal>
    </div>
  );
};

export default (props: any) => (
  <CaseTaskDetail.Consumer {...props}>
    <SearchInsuredModal />
  </CaseTaskDetail.Consumer>
);
