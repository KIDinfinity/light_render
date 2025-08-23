import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { CFields } from '../_dto/const';
import { ESelectFields, EDatePickerFields, ETypeCodes } from '../_dto/enums';
import type { FieldConfigureModel } from '../_dto/model';
import { getIndexClass } from '.';
import { tenant, Region } from '@/components/Tenant';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const fieldsGenerator = (fields: FieldConfigureModel[], inputVal: any = {}) => {
  const { InputProps, SelectProps, DatePickerProps, LabelIdPrefix } = CFields;
  const {
    indexClass,
    formCategory,
    dropdownConfigure,
    form,
    disabled,
    clietList,
    personalDocInd,
    DScompanyCode,
    DMcompanyCode,
  } = inputVal;

  const indexClassDef =
    lodash
      .chain(fields)
      .find({ fieldName: ESelectFields.indexClass })
      .get('defaultValue')
      .value() || '';
  const formCategoryDef =
    lodash
      .chain(fields)
      .find({ fieldName: ESelectFields.formCategory })
      .get('defaultValue')
      .value() || '';

  const { Dropdown_CFG_BMDDocumentType = [], Dropdown_CFG_ASRDocumentType = [] } = getDrowDownList([
    'Dropdown_CFG_BMDDocumentType',
    'Dropdown_CFG_ASRDocumentType',
  ]);

  const getDocTypeCodeList = ({ fieldName }: any) => {
    return tenant.region({
      [Region.HK]:
        lodash
          .chain(
            (DScompanyCode || DMcompanyCode) === 'Assurance'
              ? Dropdown_CFG_ASRDocumentType
              : Dropdown_CFG_BMDDocumentType
          )
          .map(({ dictCode: docTypeCode, dictName: docName }: any) => ({
            docTypeCode,
            docName,
          }))
          .orderBy(({ docName }) => docName.charAt(0).toLowerCase(), 'asc')
          .value() || [],
      notMatch: () => {
        const newIndexClass = indexClass || indexClassDef;
        const newFormCategory = formCategory || formCategoryDef;
        return lodash
          .chain(dropdownConfigure)
          .filter((item: any) => {
            return (
              item.indexClass === newIndexClass &&
              item.formCategory === newFormCategory &&
              item[fieldName]
            );
          })
          .uniqBy(fieldName)
          .map((item: any) => ({
            ...item,
            docName: formatMessageApi({
              [ETypeCodes.DocTypeCode]: item?.[fieldName],
            }),
          }))
          .orderBy('docName')
          .value();
      },
    });
  };
  return lodash
    .chain(fields)
    .filter((field: FieldConfigureModel) =>
      field.fieldName === ESelectFields.clientId
        ? !!field.viewFlag && personalDocInd === 'Y'
        : !!field.viewFlag
    )
    .map((field: FieldConfigureModel) => {
      const {
        fieldName,
        editFlag,
        mandatoryFlag,
        orderNo,
        defaultValue,
        groupByFlag,
        titleFlag,
      } = field;

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
        form,
      };

      const { component, ...resProps } = defProps;

      if (fieldName === ESelectFields.indexClass) {
        defProps = {
          ...SelectProps,
          ...resProps,
          dictCode: fieldName,
          dictName: 'indexClassName',
          defaultSelectFirst: true,
          dicts: lodash.map(getIndexClass(dropdownConfigure, fieldName), (item: any) => ({
            ...item,
            indexClassName: formatMessageApi({
              [ETypeCodes.IndexClass]: item?.[fieldName],
            }),
          })),
        };
      }

      if (fieldName === ESelectFields.formCategory) {
        const newIndexClass = indexClass || indexClassDef;

        defProps = {
          ...SelectProps,
          ...resProps,
          dictCode: fieldName,
          dictName: 'formCategoryName',
          defaultSelectFirst: true,
          dicts: lodash.isArray(dropdownConfigure)
            ? lodash
                .chain(dropdownConfigure)
                .filter((item: any) => item.indexClass === newIndexClass && item[fieldName])
                .uniqBy(fieldName)
                .orderBy(fieldName)
                .map((item: any) => ({
                  ...item,
                  formCategoryName: formatMessageApi({
                    [ETypeCodes.FormCategory]: item?.[fieldName],
                  }),
                }))
                .value()
            : [],
        };
      }

      if (fieldName === ESelectFields.docTypeCode) {
        defProps = {
          ...SelectProps,
          ...resProps,
          dictCode: fieldName,
          dictName: 'docName',
          dicts: getDocTypeCodeList({ fieldName }),
        };
      }

      if (fieldName === ESelectFields.clientId) {
        defProps = {
          ...SelectProps,
          ...resProps,
          dictCode: fieldName,
          dictName: 'clientIdName',
          dicts: lodash.map(clietList, (item) => ({
            ...item,
            clientIdName: `${item?.customerType ?? ''} - ${item?.customerName ?? ''}`,
          })),
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
