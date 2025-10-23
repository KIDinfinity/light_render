import React, { useEffect, useRef, useState } from 'react';
import lodash from 'lodash';

import { Input, DatePicker, Checkbox } from 'opus/Components/Antd';
import classNames from 'classnames';

import { FieldType } from 'packages/Opus/Enums';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { tenant, Region } from '@/components/Tenant';
import { ReactComponent as IconErroTip } from 'packages/Opus/Assets/icon-erroTip.svg';

const { RangePicker } = DatePicker;

import styles from './index.less';
import SelectItem from 'basic/components/Form/FormItem/FormItemSelect/SelectItem';
import InputNumberRange from './InputNumberRange';

const saveMoceFilterChoice = ({
  filterChoice,
  setFilterChoice,
  fieldCode,
  fieldType,
  value,
}: any) => {
  const choiceList = filterChoice?.[fieldCode]?.value || [];

  const newFilterChoice = lodash.includes(choiceList, value)
    ? lodash.filter(choiceList, (el) => el !== value)
    : [...choiceList, value];

  setFilterChoice(
    lodash.isEmpty(newFilterChoice)
      ? lodash.omit(filterChoice, fieldCode)
      : {
          ...filterChoice,
          [fieldCode]: {
            fieldType,
            value: newFilterChoice,
          },
        }
  );
};

const SelectMutiple = ({ item, filterChoice, setFilterChoice }) => {
  const { fieldCode, dicts, fieldType, dictTypeCode } = item;
  const [tagsContainer, setTagsContainer] = useState<HTMLDivElement>();
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tagsContainerRef.current) {
      setTagsContainer(tagsContainerRef.current);
    }

    // return ()=>{}
  }, []);

  return (
    <div className={styles.formItem} key={item.fieldCode}>
      <div className={styles.item}>
        <span className={styles.label}>
          {!!item.dictCode
            ? formatMessageApi({ [item.typeCode]: item.dictCode }) !== item.dictCode
              ? formatMessageApi({ [item.typeCode]: item.dictCode })
              : item.fieldName
            : item.fieldName}
        </span>
        <div id={fieldCode} className={styles.selectWrap} key={fieldCode}>
          <SelectItem
            mode="multiple"
            formName={fieldCode}
            dicts={dicts}
            getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
            value={filterChoice?.[fieldCode]?.value || []}
            optionShowType="dictName"
            dictCode="dictCode"
            dictName="dictName"
            {...(fieldCode === 'assignee' ? {} : { dictTypeCode })}
            onChange={(value: any) => {
              setFilterChoice(
                lodash.isEmpty(value)
                  ? lodash.omit(filterChoice, fieldCode)
                  : {
                      ...filterChoice,
                      [fieldCode]: {
                        fieldType,
                        value,
                      },
                    }
              );
            }}
            tagsContainer={tagsContainer}
          />
        </div>
      </div>
      <div className={fieldCode + fieldType} ref={tagsContainerRef} />
    </div>
  );
};

const Main = ({
  list,
  filterChoice,
  setFilterChoice,
  errorList,
  setErrorList,
  showErrorMessage,
}: any) => {
  const configs = {
    [FieldType.Input]: ({ fieldCode, fieldType }: any) => (
      <Input
        id={fieldCode}
        placeholder={formatMessageApi({ Label_COM_Opus: 'InputText' })}
        value={filterChoice?.[fieldCode]?.value}
        className={styles.text}
        onChange={(e: any) => {
          const value = e?.target?.value || '';
          setFilterChoice(
            lodash.isEmpty(value)
              ? lodash.omit(filterChoice, fieldCode)
              : {
                  ...filterChoice,
                  [fieldCode]: {
                    fieldType,
                    value,
                  },
                }
          );
        }}
      />
    ),

    [FieldType.CheckBox]: ({
      dicts,
      typeCode,
      dictCode: titleDictCode,
      dictTypeCode,
      fieldType,
      fieldName,
      fieldCode,
    }: any) => {
      return (
        <div className={styles.checkBoxWrap} key={titleDictCode}>
          <div className={classNames([styles.title, styles[fieldCode]])}>
            {!!titleDictCode ? formatMessageApi({ [typeCode]: titleDictCode }) : fieldName}
          </div>
          {lodash.map(dicts, ({ dictCode, dictName }: any) => {
            return (
              <div
                id={fieldCode}
                className={styles.checkBoxItem}
                key={dictCode}
                onClick={() => {
                  saveMoceFilterChoice({
                    filterChoice,
                    setFilterChoice,
                    fieldType,

                    fieldCode: fieldCode,
                    value: dictCode,
                  });
                }}
              >
                <Checkbox
                  className={styles.checkBox}
                  checked={lodash.includes(filterChoice?.[fieldCode]?.value, dictCode)}
                />
                <span className={styles.name}>
                  {!!dictTypeCode
                    ? formatMessageApi({ [dictTypeCode]: dictCode })
                    : dictName || dictCode}
                </span>
              </div>
            );
          })}
        </div>
      );
    },
    [FieldType.Select]: (item: any) => {
      return (
        <SelectMutiple item={item} filterChoice={filterChoice} setFilterChoice={setFilterChoice} />
      );
    },
    [FieldType.Date]: ({ fieldCode, fieldType }: any) => {
      const foramt = tenant.region({
        [Region.HK]: () => ['DD/MM/YYYY', 'DD/MM/YYYY'],
        [Region.TH]: () => ['DD/MM/YYYY', 'DD/MM/YYYY'],
        [Region.JP]: () => ['YYYY/MM/DD', 'YYYY/MM/DD'],
      });
      const showError = lodash.find(errorList, (item) => item.fieldCode === fieldCode)?.error;
      return (
        <div id={fieldCode}>
          <RangePicker
            placeholder={foramt}
            key={fieldCode}
            format={foramt[0]}
            value={filterChoice?.[fieldCode]?.value}
            className={styles.text}
            onChange={(value: any) => {
              const newErrorList =
                !lodash.isEmpty(value) && (!value?.[0] || !value?.[1])
                  ? [...errorList, { fieldCode, error: true }]
                  : lodash.filter(errorList, (item) => item.fieldCode !== fieldCode);

              const newData =
                !value || lodash.isEmpty(value)
                  ? lodash.omit(filterChoice, fieldCode)
                  : {
                      ...filterChoice,
                      [fieldCode]: {
                        fieldType,
                        value,
                      },
                    };

              setErrorList(newErrorList);
              setFilterChoice(newData);
            }}
          />
          {!!showError && (
            <div className={styles.erroIcon}>
              <div className={styles.erroSvg}>
                <IconErroTip className />
              </div>
              <div className={styles.erroText}>{'Invalid date range'}</div>
            </div>
          )}
        </div>
      );
    },
    [FieldType.InputNumberRange]: ({ fieldCode, fieldType }: any) => {
      return (
        <div id={fieldCode}>
          <InputNumberRange
            value={filterChoice?.[fieldCode]?.value}
            className={classNames([styles.rangeNumTextMin, styles.text])}
            placeholder={[
              formatMessageApi({ Label_COM_OPUS: 'minDay' }),
              formatMessageApi({ Label_COM_OPUS: 'maxDay' }),
            ]}
            onChange={(value: any) => {
              const minValue = lodash.first(value);
              const maxValue = lodash.last(value);
              const newErrorList =
                minValue && maxValue && minValue > maxValue
                  ? [...errorList, { fieldCode, error: true }]
                  : lodash.filter(errorList, (item) => item.fieldCode !== fieldCode);

              const newData =
                !minValue && !maxValue
                  ? lodash.omit(filterChoice, fieldCode)
                  : {
                      ...filterChoice,
                      [fieldCode]: {
                        fieldType,
                        value: [lodash.toString(minValue), lodash.toString(maxValue)],
                      },
                    };
              setErrorList(newErrorList);
              setFilterChoice(newData);
            }}
          />
        </div>
      );
    },
  };

  return (
    <div
      className={classNames(styles.filterListWrap, {
        [styles.showErrorMessage]: showErrorMessage,
      })}
    >
      {lodash.map(list, (item: any) => (
        <>
          {String(item?.fieldType) === 'checkBox' ? (
            configs?.[FieldType.CheckBox](item)
          ) : String(item?.fieldType) === FieldType.Select ? (
            configs?.[FieldType.Select](item)
          ) : (
            <>
              <div className={styles.formItem} key={item.fieldCode}>
                <div className={styles.item}>
                  <span className={styles.label}>
                    {!!item.dictCode
                      ? formatMessageApi({ [item.typeCode]: item.dictCode }) !== item.dictCode
                        ? formatMessageApi({ [item.typeCode]: item.dictCode })
                        : item.fieldName
                      : item.fieldName}
                  </span>
                  {configs?.[String(item?.fieldType)](item)}
                </div>
                {lodash.some(
                  errorList,
                  (errorListItem) =>
                    item.fieldType == FieldType.InputNumberRange &&
                    errorListItem.fieldCode === item.fieldCode &&
                    errorListItem.error
                ) && (
                  <div className={styles.errSection}>
                    <div className={styles.erroSvg}>
                      <IconErroTip className />
                    </div>
                    <div className={styles.erroText}>
                      {formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001265' })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default Main;
