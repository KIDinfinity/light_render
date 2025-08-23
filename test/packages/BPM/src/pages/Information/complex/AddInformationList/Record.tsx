import React, { useEffect } from 'react';
import { connect, useSelector } from 'dva';
import classNames from 'classnames';
import { formUtils } from 'basic/components/Form';
import { Button } from 'antd';
import lodash from 'lodash';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import AddInformation from '../AddInformation';
import CategoryDropdown from './CategoryDropdown';
import { ApplicationType } from '@/utils/constant/information';
import useGetCurrrentActivityCategory from 'bpm/pages/Information/_hooks/useGetCurrrentActivityCategory';
import styles from './record.less';

const AddInformationList = (props: any) => {
  const { isCapsule, item, processData, expenderModel, activeEditTabs }: any = props;
  const { caseCategory, businessNo } = lodash.pick(processData, ['caseCategory', 'businessNo']);
  const { dispatch }: any = props;
  const informationData = useSelector(
    ({ navigatorInformationController }: any) => navigatorInformationController.informationData
  );
  const triggerActiveTab = useSelector((state) => state.workspaceSwitchOn.triggerActiveTab);

  const activityCode = formUtils.queryValue(informationData?.activityCode);
  const isActive = lodash.includes(activeEditTabs, item?.id);
  const currrentActivityCategory = useGetCurrrentActivityCategory({ item });
  const applicationType: ApplicationType = lodash.get(
    currrentActivityCategory,
    'applicationType',
    ApplicationType.ReadOnly
  );
  const reasonRequired = lodash.get(currrentActivityCategory, 'reasonRequired');
  const showReasonDropdown = lodash.get(currrentActivityCategory, 'showReasonDropdown', 0);
  // eslint-disable-next-line
  const editable: Boolean = ApplicationType.Both === applicationType;
  const setActivedGroup = () => {
    const category = formUtils.queryValue(item.categoryCode);
    if (!category) {
      return false;
    }
    dispatch({
      type: 'navigatorInformationController/toggleActiveEditTab',
      payload: {
        id: item.id,
      },
    });
    dispatch({
      type: 'navigatorInformationController/setExpenderContentModel',
      payload: {
        expenderModel: 'edit',
      },
    });
  };
  const deleteInformation = (id: any) => {
    dispatch({
      type: 'navigatorInformationController/deleteInformation',
      payload: {
        id,
      },
    });
    dispatch({
      type: 'navigatorInformationController/saveCategoryReasonTemplate',
      payload: {
        categoryReasonTemplate: '',
        id: item.id,
      },
    });
  };

  useEffect(() => {
    (async () => {
      const res = await dispatch({
        type: 'navigatorInformationController/getCategoryReason',
        payload: {
          caseCategory,
          businessNo,
          categoryCode: item.categoryCode,
        },
      });
      if (res?.success && !showReasonDropdown) {
        dispatch({
          type: 'navigatorInformationController/findDictionaryByTypeCode',
          payload: {
            typeCode: res.resultData?.descriptionTypeCode,
            dictCode: item.categoryCode,
            id: item.id,
          },
        });
      }
      if (res?.success && reasonRequired === '1') {
        const defaultReason = lodash
          .chain(res)
          .get('resultData.value')
          .find((reasonItem: any) => reasonItem.isDefault === 1)
          .get('reasonCode')
          .value();
        dispatch({
          type: 'navigatorInformationController/addInformationChange',
          payload: {
            changedFields: {
              reason: defaultReason,
            },
            id: item?.id,
          },
        });
      }
    })();
  }, [
    activityCode,
    item.categoryCode,
    caseCategory,
    reasonRequired,
    item.id,
    businessNo,
    dispatch,
    showReasonDropdown,
  ]);

  useEffect(() => {
    if (triggerActiveTab && item?.id === triggerActiveTab && lodash.size(activeEditTabs) === 0) {
      setActivedGroup();
      dispatch({
        type: 'workspaceSwitchOn/saveTriggerActiveTab',
        payload: {
          triggerActiveTab: '',
        },
      });
    }
  }, [triggerActiveTab, item?.id, activeEditTabs]);

  return (
    <div className={styles.informationList}>
      <div className={styles.information}>
        <Button
          className={styles.del}
          icon="close"
          size="small"
          type="link"
          onClick={() => {
            deleteInformation(item.id);
          }}
        />
        <div
          className={classNames({
            groupHeader: true,
            active: isActive && expenderModel === 'edit',
            isExpander: !isCapsule,
          })}
          onClick={setActivedGroup}
        >
          <CategoryDropdown item={item} processData={processData} />
        </div>
        {isActive && <AddInformation isCapsule={isCapsule} item={item} processData={processData} />}
      </div>
    </div>
  );
};

export default connect(({ navigatorInformationController }: any) => ({
  informationData: navigatorInformationController?.informationData,
  newRecordCollapseActiveKey: navigatorInformationController.newRecordCollapseActiveKey,
  isShowInformationList: navigatorInformationController.isShowInformationList,
  isShowAddInformation: navigatorInformationController.isShowAddInformation,
  expenderModel: navigatorInformationController.expenderModel,
  activeEditTabs: navigatorInformationController.activeEditTabs,
}))(SwitchDrawerModeHoc(AddInformationList));
