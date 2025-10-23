import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import FreeFieldsOfInput, { FreeFieldsOfInputShow } from './FreeFieldsOfInput';
import FreeFieldsOfTextarea from './FreeFieldsOfTextarea';
import FreeFieldsOfDate from './FreeFieldsOfDate';
import FreeFieldsOfCheckbox from './FreeFieldsOfCheckbox';
import FreeFieldsOfSelect from './FreeFieldsOfSelect';

export default function FreeFields(props: any) {
  const { errorInfo } = useSelector((state: any) => ({
    ...lodash.pick(state.envoyController, ['errorInfo']),
  }));

  const MapComponent = {
    input: <FreeFieldsOfInput {...props} errorInfo={errorInfo} />,
    textarea: <FreeFieldsOfTextarea {...props} errorInfo={errorInfo} />,
    date: <FreeFieldsOfDate {...props} errorInfo={errorInfo} />,
    checkbox: <FreeFieldsOfCheckbox {...props} errorInfo={errorInfo} />,
    dropdown: <FreeFieldsOfSelect {...props} errorInfo={errorInfo} />,
  };

  const MapShowComponent = {
    input: <FreeFieldsOfInputShow {...props} errorInfo={errorInfo} />,
  };

  const componentType = lodash.get(props, 'custom.type');

  if (MapComponent[componentType]) {
    return props.readOnly ? MapShowComponent[componentType] : MapComponent[componentType];
  }
  return null;
}
