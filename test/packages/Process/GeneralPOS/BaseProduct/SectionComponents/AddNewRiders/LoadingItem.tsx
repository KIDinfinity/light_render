import React, { useMemo } from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { SectionTable, Fields, localConfig } from './Section/LoadingSection';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
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
  uwCoverageId,
}: any) => {
  return (
    <div>
      <Section
        form={form}
        editable={editable}
        section="Reinstatement-Loading"
        tableCollect={tableCollect}
      >
        <Fields.Code transactionId={transactionId} />
        <Fields.Fmperiod transactionId={transactionId} />
        <Fields.Flatmortality transactionId={transactionId} />
        <Fields.Pmloading transactionId={transactionId} />
        <Fields.Pmperiod transactionId={transactionId} />
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
      ]?.uwCoverageLoadingList?.[index],
    productCode:
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList?.[
        coverageIndex
      ]?.productCode,
    payPeriod:
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList?.[
        coverageIndex
      ]?.payPeriod,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, coverageIndex, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'addNewRidersUpdate',
          payload: {
            type: OperationTypeEnum.LISTINFOUPDATE,
            modalType: 'loading',
            changedFields,
            transactionId,
            coverageIndex,
            index,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { coverageExclusionItem, productCode, payPeriod } = props;
      return formUtils.mapObjectToFields({ ...coverageExclusionItem, productCode, payPeriod });
    },
  })(SectionItem)
);

const ExclusionItem = ({ list, coverageIndex, transactionId, readyOnly }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.AddNewRiders) && !readyOnly;
  const onlyKey = list?.map((item: any) => item.id)?.join('');
  const deleteItemHandle = (index: any) => {
    dispatch({
      type: `${NAMESPACE}/addNewRidersUpdate`,
      payload: {
        type: OperationTypeEnum.DELETE,
        modalType: 'loading',
        transactionId,
        coverageIndex,
        index,
      },
    });
  };

  const addItemHandle = () => {
    dispatch({
      type: `${NAMESPACE}/addNewRidersUpdate`,
      payload: {
        type: OperationTypeEnum.ADD,
        modalType: 'loading',
        transactionId,
        coverageIndex,
        changedFields: {
          list: [{ id: uuidv4() }],
        },
      },
    });
  };
  const sclale = 0.88;
  const style = {
    marginLeft: `calc((1443px * ${sclale || 0.96} - 32px) / 24 * 2)`,
  };
  return useMemo(() => {
    return (
      <div className={styles.wrap} style={style}>
        <span className={styles.span}>Loading</span>
        <SectionTable
          section="Reinstatement-Loading"
          config={localConfig}
          dataSource={(list || []).map((item: any, index: any) => index)}
          classNameLayout={styles.loadingTable}
          className={styles.tableRow}
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
    );
  }, [onlyKey]);
};

export default ExclusionItem;
