import { useEffect } from 'react';
import lodash from 'lodash';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

interface useGetCascadeAdressInter {
  level: number;
  form: any;
  type: string;
}

const LevelMap = {
  current: [
    [{ country: 'countryCode' }],
    [{ country: 'countryCode' }, { currentAddress6: 'provinceCode' }],
    [
      { country: 'countryCode' },
      { currentAddress6: 'provinceCode' },
      { currentAddress5: 'districtCode' },
    ],
  ],
  business: [
    [{ businessAddress7: 'countryCode' }],
    [{ businessAddress7: 'countryCode' }, { businessAddress6: 'provinceCode' }],
    [
      { businessAddress7: 'countryCode' },
      { businessAddress6: 'provinceCode' },
      { businessAddress5: 'districtCode' },
    ],
  ],
  residentiala: [
    [{ residentialAddress7: 'countryCode' }],
    [{ residentialAddress7: 'countryCode' }, { residentialAddress6: 'provinceCode' }],
    [
      { residentialAddress7: 'countryCode' },
      { residentialAddress6: 'provinceCode' },
      { residentialAddress5: 'districtCode' },
    ],
  ],
  address: [
    [{ country: 'countryCode' }],
    [{ country: 'countryCode' }, { address6: 'provinceCode' }],
    [{ country: 'countryCode' }, { address6: 'provinceCode' }, { address5: 'districtCode' }],
  ],
};

const getPayload = ({ level, form, type }: useGetCascadeAdressInter) => {
  const target = LevelMap?.[type]?.[level];
  return lodash.reduce(
    target,
    (result, item) => {
      const [fieldId, paramKey]: any = Object.entries(item)?.[0];
      result[paramKey] = form.getFieldValue(fieldId);
      return result;
    },
    {}
  );
};

export default ({ level, form, type }: useGetCascadeAdressInter) => {
  const dispatch = useDispatch();
  const cascadeAdress = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.cascadeAdress,
    shallowEqual
  );

  const param = getPayload({ level, form, type });
  const cascadeAdressKey = Object.values(param).join('_');
  const isExist = lodash.has(cascadeAdress, cascadeAdressKey);

  useEffect(() => {
    if (isExist || cascadeAdressKey.split('_').length !== level + 1) {
      return;
    }
    dispatch({
      type: `${NAMESPACE}/getCascadeAddress`,
      payload: {
        param,
        cascadeAdressKey,
        level,
      },
    });
  }, [isExist, cascadeAdressKey, level]);

  return isExist ? cascadeAdress?.[cascadeAdressKey] : [];
};
