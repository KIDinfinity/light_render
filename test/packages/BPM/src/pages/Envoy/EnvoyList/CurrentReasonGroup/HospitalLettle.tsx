import React, { useMemo } from 'react';
import lodash from 'lodash';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Form, Select } from 'antd';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import styles from './groupSelect.less';

const { Option } = Select;

enum EHOSPITALTYPE {
  GOHOS = 'Request for Information from Government Hospital',
  PRIVATEHOS = 'Request for Information from Private Hospital',
}

export default ({ reason }: any) => {
  const dispatch = useDispatch();
  const { id, groupId, reasonName, hospRecipientCode } = reason || {};

  const {
    Dropdown_CLM_LetterPrivateHospital,
    Dropdown_CLM_LetterGovHospital,
  }: any = getDrowDownList([
    'Dropdown_CLM_LetterPrivateHospital',
    'Dropdown_CLM_LetterGovHospital',
  ]);

  const errorInfo = useSelector((state: any) => state?.envoyController?.errorInfo, shallowEqual);

  const hospRecipientCodeErrors = useMemo(() => {
    return lodash.get(findObj(errorInfo, id), 'hospRecipientCode');
  }, [errorInfo]);

  const list = useMemo(() => {
    return reasonName === EHOSPITALTYPE.GOHOS
      ? Dropdown_CLM_LetterGovHospital
      : Dropdown_CLM_LetterPrivateHospital;
  }, [reasonName, Dropdown_CLM_LetterPrivateHospital, Dropdown_CLM_LetterGovHospital]);
  return (
    <>
      {reasonName === EHOSPITALTYPE.GOHOS || reasonName === EHOSPITALTYPE.PRIVATEHOS ? (
        <Form className={styles.hospitalLettle}>
          <Form.Item
            label={
              <>
                {hospRecipientCodeErrors?.length ? (
                  <LabelTip title={hospRecipientCodeErrors} />
                ) : null}
                {formatMessageApi({
                  Label_Sider_Envoy: 'LetterHospRecipientEnvoy',
                })}
              </>
            }
            required
          >
            <Select
              value={hospRecipientCode}
              onChange={(value: any) => {
                dispatch({
                  type: 'envoyController/saveReasonDetails',
                  payload: {
                    groupId,
                    id,
                    value,
                    changeData: {
                      hospRecipientCode: value,
                    },
                  },
                });
              }}
            >
              {lodash.map(list, ({ dictCode, dictName }: any) => (
                <Option value={dictCode}>{dictName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      ) : null}
    </>
  );
};
