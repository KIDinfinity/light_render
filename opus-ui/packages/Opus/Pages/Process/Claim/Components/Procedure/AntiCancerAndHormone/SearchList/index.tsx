import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import Search from './Search';
import Table from './Table';
import { SearchListType } from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import getDrugChangedFields from 'opus/Pages/Process/Claim/DataCapture/utils/getDrugChangedFields.ts';

export default ({ NAMESPACE }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const DrugsDetail =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.DrugsDetail) || {};

  useEffect(() => {
    const t = async () => {
      if (DrugsDetail.show) {
        if (lodash.isEmpty(DrugsDetail.allList)) {
          await dispatch({
            type: `${NAMESPACE}/getDrugsDetailList`,
            payload: {
              currentPage: 1,
            },
          });
        }
      }
    };
    t();
  }, [DrugsDetail.show]);

  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/updateDrugsDetailList`,
      payload: {
        type: SearchListType.CLEAR,
      },
    });
  };
  const handleConfirm = async () => {
    const { drugsListStore, currentCodeBeforeOpenModal } = DrugsDetail;
    const drugChangedFields = await getDrugChangedFields(
      drugsListStore,
      currentCodeBeforeOpenModal
    );

    await dispatch({
      type: `${NAMESPACE}/saveFormData`,
      target: `${NAMESPACE}/saveDrugsDetailList`,
      payload: {
        therapeuticDrugs: formUtils.cleanValidateData(drugsListStore),
        changedFields: drugChangedFields,
      },
    });
    dispatch({
      type: `${NAMESPACE}/updateDrugsDetailList`,
      payload: {
        type: SearchListType.CLEAR,
      },
    });
  };
  return (
    <CommonResizeModal
      confirmAuth={true && editable}
      visible={DrugsDetail?.show}
      onReturn={() => {
        handleCancel();
      }}
      onCancel={() => {
        handleCancel();
      }}
      onConfirm={() => {
        handleConfirm();
      }}
      returnAuth
      width="70%"
      height={400}
      authHeight
      iconVisible={false}
    >
      <div className={styles.SerialClaim}>
        <Search editable={editable} NAMESPACE={NAMESPACE} />
        <Table total={DrugsDetail.total} NAMESPACE={NAMESPACE} />
      </div>
    </CommonResizeModal>
  );
};
