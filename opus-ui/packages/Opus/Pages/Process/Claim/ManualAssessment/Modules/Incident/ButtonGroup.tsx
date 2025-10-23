import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import TaskStatus from 'enum/TaskStatus';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

import styles from './ButtonGroup.less';

const ButtonGroup = ({ incidentId }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const showAddPayable = async (e: any) => {
    const button = e.target;
    button.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setTimeout(async () => {
      const { top, left, width } = button.getBoundingClientRect();

      await dispatch({
        type: `${NAMESPACE}/popUpPablePoint`,
        payload: {
          top: Number(top),
          left: Number(left) + Number(width),
        },
      });

      await dispatch({
        type: `${NAMESPACE}/popUpPableInit`,
        payload: {
          incidentId,
        },
      });
    }, 500);
  };

  const onOpenModal = async (e) => {
    // 这个接口获取
    // dispatch({
    //   type: `${NAMESPACE}/getPopUpInfo`,
    //   payload: {
    //     clientId: formUtils.queryValue(insured?.insuredId),
    //   },
    // });
    const { [NAMESPACE]: state }: any = await dispatch({ type: 'global/accessStore' });

    let klipCaseInfoList = lodash.cloneDeep(
      state.claimEntities.incidentListMap[incidentId]?.klipCaseInfoList
    );
    const treatmentListMap = lodash.cloneDeep(state.claimEntities.treatmentListMap);
    const procedureListMap = lodash.cloneDeep(state.claimEntities.procedureListMap);
    const claimTypeArray = formUtils.queryValue(
      state.claimEntities.incidentListMap[incidentId]?.claimTypeArray
    );
    const finalStatus = state.claimProcessData?.finalStatus;
    const setDefaultInterestFlag =
      !lodash.includes(claimTypeArray, 'WOP') && finalStatus !== TaskStatus.completed;

    klipCaseInfoList = lodash.map(klipCaseInfoList, (item) => ({
      ...item,
      incidentId: item.incidentId || incidentId,
      interestFlag:
        setDefaultInterestFlag && lodash.isEmpty(formUtils.queryValue(item.interestFlag))
          ? 'Y'
          : item.interestFlag,
    }));
    dispatch({
      type: `${NAMESPACE}/updatePopupData`,
      payload: {
        isShow: true,
        incidentId,
        treatmentListMap,
        klipCaseInfoList,
        procedureListMap,
        claimTypeArray,
      },
    });
  };

  return (
    <div className={styles.btnGroup}>
      <Button size="small" className={styles.btn} onClick={onOpenModal}>
        {formatMessageApi({
          Label_BIZ_Claim: 'KLIPCaseInfo',
        })}
        {/* {hasErrors && <ErrorTooltipManual />} */}
      </Button>
      {!!editable && (
        <Button
          onClick={showAddPayable}
          className={styles.btn}
          ref={(div) => {
            if (div) {
              // eslint-disable-next-line react/no-find-dom-node
              const dom = ReactDOM.findDOMNode(div);
              const { width, left } = dom.getBoundingClientRect();
            }
          }}
        >
          {formatMessageApi({ Label_BPM_Button: 'addPayable' })}
        </Button>
      )}
    </div>
  );
};

export default ButtonGroup;
