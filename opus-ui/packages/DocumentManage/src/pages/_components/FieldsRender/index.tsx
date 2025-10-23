import type { FunctionComponent, ComponentType } from 'react';
import React from 'react';
import lodash from 'lodash';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import { EComponentType } from '../../_dto/enums';
import type { IDocField } from './DocField';
import DocField from './DocField';

interface IProps {
  fields?: any[];
  excludes?: string[];
}

interface IFieldsRender extends FunctionComponent<IProps> {
  DocField: ComponentType<IDocField>;
}

const FieldsRender: IFieldsRender = ({ fields, excludes }) => (
  <>
    {lodash
      .chain(fields)
      .orderBy('orderNo')
      .map((field: any) => {
        const { component, labelId, formName } = field;

        if (!lodash.isEmpty(excludes) || lodash.isArray(excludes)) {
          if (excludes?.includes(formName)) return null; // 过滤需要排除的fields
        }

        switch (component) {
          case EComponentType.Input:
            return <FormItemInput {...field} key={`${EComponentType.Input}-${labelId}`} />;
          case EComponentType.Select:
            return (
              <FormItemSelect
                {...field}
                key={`${EComponentType.Select}-${labelId}`}
                getPopupContainer={false}
              />
            );
          case EComponentType.DatePicker:
            return (
              <FormItemDatePicker {...field} key={`${EComponentType.DatePicker}-${labelId}`} />
            );
          default:
            return null;
        }
      })
      .value()}
  </>
);

FieldsRender.DocField = DocField;

export default FieldsRender;
