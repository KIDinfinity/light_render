import React, { useMemo } from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { SectionTable, Fields, localConfig } from './Section/ExclusionSection';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import lodash from 'lodash';

const SectionItem = ({
  form,
  transactionId,
  tableCollect,
  editable,
  deleteItemHandle,
  addItemHandle,
  id: index,
  listLength,
}: any) => {
  return (
    <div>
      <Section
        form={form}
        editable={editable}
        section="Reinstatement-Exclusion"
        tableCollect={tableCollect}
      >
        <Fields.Code transactionId={transactionId} />
        <Fields.ExclusionShortName transactionId={transactionId} />
        <Fields.LongDescription transactionId={transactionId} />
      </Section>

      {editable && (
        <div className={styles.extraButton}>
          <div className={classNames(styles.btn)}>
            <div
              className={styles.icon}
              onClick={() => {
                deleteItemHandle(index);
              }}
            >
              <Icon type="close" />
            </div>
          </div>
          {index === listLength - 1 && (
            <div className={classNames(styles.btn)}>
              <div className={styles.icon} onClick={addItemHandle}>
                <Icon type="plus" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FormItem = connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { transactionId, coverageIndex, id: index }: any) => ({
    coverageExclusionItem:
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList?.[
        coverageIndex
      ]?.uwCoverageExclusionList?.[index],
    productCode:
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList?.[
        coverageIndex
      ]?.productCode,

    exclusionCodes: modelnamepsace?.dictObject?.exclusionCodes,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, coverageIndex, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'reinstatementUpdate',
          payload: {
            type: OperationTypeEnum.LISTINFOUPDATE,
            modalType: 'exclusion',
            changedFields,
            transactionId,
            coverageIndex,
            index,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { coverageExclusionItem, productCode, exclusionCodes } = props;
      const exclusionShortName =
        lodash
          .chain(exclusionCodes)
          .find(
            (item) => item?.localExclusionCode === formUtils.queryValue(coverageExclusionItem?.code)
          )
          .get('longDesc')
          .value() || formUtils.queryValue(coverageExclusionItem?.code);
      return formUtils.mapObjectToFields({
        ...coverageExclusionItem,
        exclusionShortName,
        productCode,
      });
    },
  })(SectionItem)
);

const ExclusionItem = ({ list, coverageIndex, transactionId }) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Reinstatement, true);
  const onlyKey = list?.map((item) => item.id)?.join('');
  const deleteItemHandle = (index) => {
    dispatch({
      type: `${NAMESPACE}/reinstatementUpdate`,
      payload: {
        type: OperationTypeEnum.DELETE,
        modalType: 'exclusion',
        transactionId,
        coverageIndex,
        index,
      },
    });
  };

  const addItemHandle = () => {
    dispatch({
      type: `${NAMESPACE}/reinstatementUpdate`,
      payload: {
        type: OperationTypeEnum.ADD,
        modalType: 'exclusion',
        transactionId,
        coverageIndex,
        changedFields: {
          list: [{ id: uuidv4() }],
        },
      },
    });
  };
  return useMemo(() => {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>Exclusion</div>
        <div className={styles.content}>
          <SectionTable
            section="Reinstatement-Exclusion"
            config={localConfig}
            dataSource={(list || []).map((item, index) => index)}
            classNameLayout={styles.exclusionTable}
            className={styles.exclusionRow}
          >
            <FormItem
              coverageIndex={coverageIndex}
              deleteItemHandle={deleteItemHandle}
              addItemHandle={addItemHandle}
              transactionId={transactionId}
              editable={editable}
              listLength={lodash.size(list)}
            />
          </SectionTable>
        </div>
      </div>
    );
  }, [onlyKey]);
};

export default ExclusionItem;
