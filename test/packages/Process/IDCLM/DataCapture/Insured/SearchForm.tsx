import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Icon, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { formUtils } from 'basic/components/Form';
import Insured from 'process/Components/BussinessControls/Insured';
import searchStyles from './SearchModal.less';

const searchInsuredValidateKeyArr: string[] = ['policyId', 'clientId', 'firstName', 'surname'];

// ts-ignore
const SearchInsuredForm = ({ form, taskDetail }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const searchInsuredObj = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchInsuredObj
  );

  const searchInsured = () => {
    const insuredObj: any = formUtils.formatFlattenValue(
      formUtils.cleanValidateData(searchInsuredObj)
    );
    const hasAtLeastOne = lodash.some(searchInsuredValidateKeyArr, (key) => {
      return !lodash.isEmpty(insuredObj[key]);
    });
    if (
      !hasAtLeastOne &&
      (lodash.isEmpty(insuredObj?.identityType) || lodash.isEmpty(insuredObj?.identityNo))
    ) {
      notification.error({
        message: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_000389',
        }),
      });
      dispatch({
        type: `${NAMESPACE}/savePartyListInfo`,
        payload: { insuredList: [] },
      });
      return;
    }
    dispatch({
      type: `${NAMESPACE}/getInsuredInfo`,
      payload: {
        searchByPolicyId: false,
        caseCategory: taskDetail?.caseCategory,
      },
    });
  };

  return (
    <div className={searchStyles.searchInsured}>
      <Insured.SectionSearchForm NAMESPACE={NAMESPACE} editable={editable} />

      {!!editable && (
        <div className={searchStyles.searchButton}>
          <Button key="submit" type="primary" onClick={searchInsured}>
            Search
            <Icon type="search" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchInsuredForm;
