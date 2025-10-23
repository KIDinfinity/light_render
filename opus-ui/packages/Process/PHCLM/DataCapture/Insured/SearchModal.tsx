import { NAMESPACE } from '../activity.config';

import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { FormAntCard } from 'basic/components/Form';
import SearchForm from './SearchForm';
import SelectForm from './SelectForm';
import searchStyles from './SearchModal.less';
import styles from './item.less';

const SearchInsuredModal = () => {
  const dispatch = useDispatch();
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const showModal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.showSearchModel
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const hideShowModal = () => {
    dispatch({
      type: `${NAMESPACE}/updateShowSearchModal`,
      payload: {
        showSearchModel: false,
      },
    });
  };

  return (
    <div className={styles.itemWrap}>
      {showModal && !!editable && (
        <Modal
          visible={showModal}
          footer={null}
          onCancel={() => {
            hideShowModal();
          }}
          width="55%"
          bodyStyle={{
            zIndex: 1000,
          }}
        >
          <div className={searchStyles.searchInsured}>
            <FormAntCard title="Search Insured" bordered={false}>
              <SearchForm />
              <SelectForm />
            </FormAntCard>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SearchInsuredModal;
