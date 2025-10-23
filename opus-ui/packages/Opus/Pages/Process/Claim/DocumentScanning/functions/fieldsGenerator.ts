import lodash from 'lodash';
import { CFields } from '../_dto/const';
import { ESelectFields, EDatePickerFields } from '../_dto/enums';
import type { FieldConfigureModel } from '../_dto/model';
import { tenant, Region } from '@/components/Tenant';

const fieldsGenerator = (fields: FieldConfigureModel[], inputVal: any = {}) => {
  const { InputProps, SelectProps, DatePickerProps, LabelIdPrefix } = CFields;
  const { dropdownConfigure, disabled } = inputVal;

  const getDocTypeCodeList = ({ fieldName }: any) => {
    return tenant.region({
      [Region.JP]: () => {
        return lodash
          .chain(dropdownConfigure)
          .filter((item: any) => {
            return item[fieldName];
          })
          .uniqBy(fieldName)
          .map((item: any) => ({
            ...item,
            docName:
              item?.docTypeCode && item?.docName
                ? `${item?.docTypeCode}-${item?.docName}`
                : item?.docTypeCode || item?.docName,
          }))
          .orderBy('docName')
          .value();
      },
      notMatch: () => {
        return lodash
          .chain(dropdownConfigure)
          .filter((item: any) => {
            return item[fieldName];
          })
          .uniqBy(fieldName)
          .map((item: any) => ({
            ...item,
            docName:
              item?.externalDocTypeCode && item?.docName
                ? `${item?.externalDocTypeCode}-${item?.docName}`
                : item?.externalDocTypeCode || item?.docName,
          }))
          .orderBy('docName')
          .value();
      },
    });
  };
  return lodash
    .chain(fields)
    .filter((field: FieldConfigureModel) => !!field.viewFlag)
    .map((field: FieldConfigureModel) => {
      const { fieldName, editFlag, mandatoryFlag, orderNo, defaultValue, groupByFlag, titleFlag } =
        field;

      let defProps: any = {
        ...InputProps,
        formName: fieldName,
        labelId: `${LabelIdPrefix}.${fieldName}`,
        disabled: !editFlag || disabled,
        required: !!mandatoryFlag,
        groupBy: groupByFlag,
        title: titleFlag,
        initialValue: defaultValue,
        orderNo,
      };

      const { component, ...resProps } = defProps;

      if (fieldName === ESelectFields.docTypeCode) {
        defProps = {
          ...SelectProps,
          ...resProps,
          dictCode: 'id',
          dictName: 'docName',
          dicts: getDocTypeCodeList({ fieldName }),
        };
      }

      if (fieldName === EDatePickerFields.receivedDate) {
        defProps = {
          ...DatePickerProps,
          ...resProps,
        };
      }
      return defProps;
    })
    .value();
};

export default fieldsGenerator;
