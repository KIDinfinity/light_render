import React, { useMemo } from 'react';
import SelectPlus from './SelectPlus';
import getSearchName from './getSearchName';
import type { FormItemSelectPlusProps } from '../typing';

const SelectPlusItem = React.forwardRef<any, FormItemSelectPlusProps>((props, ref) => {
  const {
    form,
    formName = '',
    OnRecover,
    recoverValue,
    disabled,
    placeholder,
    setVisible = () => {},
    dropdownCode,
    otherParams,
    disabledDictCodes,
    onSelectCallback,
    selectCallbackItem = false,
    saveName,
    selectCallbackExProp,
    internationalizationType,
    extraData,
    searchName,
    typeCode,
    mode,
    optionShowType,
    searchCustom,
    onChange,
    value,
    onBlur,
    customUrl,
    callBackSetDataList,
    callBackCurrentItem,
    isFreeText,
    freeTextHiddenName,
    isPassCodeName,
    allowEmptySearch = true,
    required,
  } = props;

  const transSearchNames = useMemo(() => {
    return getSearchName({
      searchName,
      typeCode,
    });
  }, [searchName, typeCode]);

  return (
    <SelectPlus
      id={formName}
      // @ts-ignore
      mode={mode}
      ref={ref}
      disabled={disabled}
      dropdownCode={dropdownCode}
      otherParams={otherParams}
      // @ts-ignore
      onBlur={(e: React.MouseEvent) => {
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onFocus={() => {
        setVisible(true);
      }}
      setVisible={setVisible}
      // @ts-ignore
      optionShowType={optionShowType}
      disabledDictCodes={disabledDictCodes}
      // @ts-ignore
      searchName={transSearchNames}
      // @ts-ignore
      searchCustom={searchCustom}
      onSelectCallback={onSelectCallback}
      selectCallbackItem={selectCallbackItem}
      saveName={saveName}
      // @ts-ignore
      parent={ref}
      value={value}
      onChange={onChange}
      errors={form.getFieldError(formName)}
      // @ts-ignore
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      selectCallbackExProp={selectCallbackExProp}
      internationalizationType={internationalizationType}
      form={form}
      formName={formName}
      recoverValue={recoverValue}
      OnRecover={OnRecover}
      extraData={extraData}
      placeholder={placeholder}
      customUrl={customUrl}
      callBackSetDataList={callBackSetDataList}
      callBackCurrentItem={callBackCurrentItem}
      isFreeText={isFreeText}
      freeTextHiddenName={freeTextHiddenName}
      isPassCodeName={isPassCodeName}
      allowEmptySearch={allowEmptySearch}
      required={required}
    />
  );
});

export default SelectPlusItem;
