import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Icon, Form, Button, notification } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { formUtils } from 'basic/components/Form';
import Section, { FormFields as Fields } from './Section/index';
import searchStyles from './SearchModal.less';

const searchInsuredValidateKeyArr: string[] = ['policyId', 'clientId', 'firstName', 'surname'];

// ts-ignore
const SearchInsuredForm = ({ form }: any) => {
  const dispatch = useDispatch();
  const searchInsuredObj = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchInsuredObj
  );
  // const dictsOfGender = useSelector(({ dictionaryController }: any) => dictionaryController.Gender);
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const searchInsured = () => {
    const insuredObj = formUtils.formatFlattenValue(formUtils.cleanValidateData(searchInsuredObj));
    const hasAtLeastOne = lodash.some(searchInsuredValidateKeyArr, (key) => {
      return !lodash.isEmpty(insuredObj[key]);
    });
    if (!hasAtLeastOne) {
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
      payload: { searchByPolicyId: false },
    });
  };

  return (
    <div className={searchStyles.searchInsured}>
      <Section form={form} editable={editable} section="Insured.Form">
        <Fields.ClientId />
        <Fields.DateOfBirth />
        <Fields.FirstName />
        <Fields.Gender />
        <Fields.MiddleName />
        <Fields.PolicyId />
        <Fields.PolicySource />
        <Fields.Surname />
      </Section>

      {!!editable && (
        <div className={searchStyles.searchButton}>
          <Button key="submit" type="primary" onClick={searchInsured}>
            {/* {formatMessageApi({
                Label_BPM_Button: 'venus_claim.button.confirm',
              })} */}
            Search
            <Icon type="search" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  searchInsuredObj: modelnamepsace.searchInsuredObj,
}))(
  Form.create({
    async onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;

      if (!formUtils.shouldUpdateState(changedFields)) return;

      if (lodash.size(changedFields) === 1) {
        dispatch({
          type: `${NAMESPACE}/saveSearchInsuredInfo`,
          payload: {
            changedFields,
          },
        });
      }
    },
    // @ts-ignore
    mapPropsToFields(props: IProps) {
      const { searchInsuredObj } = props;
      return formUtils.mapObjectToFields(searchInsuredObj);
    },
  })(SearchInsuredForm)
);
