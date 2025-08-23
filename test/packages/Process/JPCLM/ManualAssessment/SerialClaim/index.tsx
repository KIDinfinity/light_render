import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Icon } from 'antd';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import Search from './Search';
import Table from './Table';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(true);
  const [selectPayableIds, setSelectPayableIds] = useState([]);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const serialClaim =
    useSelector(({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.serialClaim) || {};
  const treatmentPayableListMap =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment.claimEntities?.treatmentPayableListMap
    ) || {};
  const opTreatmentPayableListMap =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment.claimEntities?.opTreatmentPayableListMap
    ) || {};
  const filterPayableList = lodash
    .chain({ ...treatmentPayableListMap, ...opTreatmentPayableListMap })
    .keys()
    .value();

  const isSwitchOn = useSelector(({ workspaceSwitchOn }: any) => workspaceSwitchOn.isSwitchOn);

  useEffect(() => {
    const t = async () => {
      if (!!serialClaim?.show) {
        if (lodash.isEmpty(serialClaim?.allList)) {
          await dispatch({
            type: 'JPCLMOfClaimAssessment/getAllSerialClaimList',
          });
        }
        await dispatch({
          type: 'JPCLMOfClaimAssessment/saveSerialClaimFilterList',
        });
      }
    };
    t();
  }, [serialClaim?.show]);

  const handleCancel = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/saveSerialClaimHidden',
    });
  };
  const handleConfirm = async () => {
    await dispatch({
      type: 'JPCLMOfClaimAssessment/getSerialClaimTreatmenDetail',
      payload: {
        claimTreatmentPayableIds: selectPayableIds,
      },
    });
    await dispatch({
      type: 'JPCLMOfClaimAssessment/saveSerialClaimHidden',
    });
    await setSelectPayableIds([]);
  };

  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={serialClaim?.show}
      confirmDiabled={lodash.isEmpty(selectPayableIds)}
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
    >
      <div className={styles.SerialClaim}>
        <Search showSearch={showSearch} editable={editable} />
        <div className={styles.arrow}>
          <Icon
            type={showSearch ? 'double-left' : 'double-right'}
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          />
        </div>
        <Table
          list={serialClaim.filterList}
          selectPayableIds={selectPayableIds}
          setSelectPayableIds={setSelectPayableIds}
          isSwitchOn={isSwitchOn}
          filterPayableList={filterPayableList}
        />
      </div>
    </CommonResizeModal>
  );
};
