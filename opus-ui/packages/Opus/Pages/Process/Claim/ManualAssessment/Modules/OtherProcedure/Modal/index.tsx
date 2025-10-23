import React from 'react';
import { useSelector, useDispatch, connect } from 'dva';
import { Icon, Table, Form } from 'antd';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { NAMESPACE } from 'packages/Opus/Pages/Process/Claim/ManualAssessment/activity.config.ts';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as SearchIcon } from 'packages/Opus/Assets/searchSurgery.svg';
import styles from './index.less';
import { FormItemSelectPlus } from 'basic/components/Form';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import lodash from 'lodash';

const PAGE_SIZE = 10;

export default connect(({}: any) => ({}))(
  Form.create({})(({ form }: any) => {
    const dispatch = useDispatch();
    const seachDropDown = new SearchDropDown();
    const { handleProcedureName } = seachDropDown;
    const { show, searchList, searchContent, treatmentId, otherProcedureId, current, total } =
      useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.otherProcedureModal) ||
      {};

    const columns = [
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.procedure-name',
        }),
        dataIndex: 'approvalProcedureName',
        key: 'approvalProcedureName',
        width: 150,
      },
      {
        title: formatMessageApi({ Label_BIZ_Claim: 'kjCode' }),
        dataIndex: 'kjCode',
        key: 'kjCode',
        render: (value: any, item: any) => {
          return `${item.kjCode}${item.branchNo}${item.itemNo}`;
        },
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemName1' }),
        dataIndex: 'item1',
        key: 'item1',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemValue1' }),
        dataIndex: 'item1Value',
        key: 'item1Value',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemName2' }),
        dataIndex: 'item2',
        key: 'item2',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemValue2' }),
        dataIndex: 'item2Value',
        key: 'item2Value',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemName3' }),
        dataIndex: 'item3',
        key: 'item3',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemValue3' }),
        dataIndex: 'item3Value',
        key: 'item3Value',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemName4' }),
        dataIndex: 'item4',
        key: 'item4',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemValue4' }),
        dataIndex: 'item4Value',
        key: 'item4Value',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemName5' }),
        dataIndex: 'item5',
        key: 'item5',
      },
      {
        title: formatMessageApi({ Label_CLM_Opus: 'itemValue5' }),
        dataIndex: 'item5Value',
        key: 'item5Value',
      },
      {
        title: formatMessageApi({ Label_BIZ_Claim: 'ProcedureCode' }),
        dataIndex: 'procedureCode',
        key: 'procedureCode',
      },
    ];

    const onClose = async () => {
      await dispatch({
        type: `${NAMESPACE}/otherProcedureModalHidden`,
      });
    };

    const onSelect = async (value: any, typeCode: any, exProps: any) => {
      await dispatch({
        type: `${NAMESPACE}/otherProcedureModalUpdate`,
        payload: {
          searchContent: exProps,
          current: 1,
        },
      });
      await dispatch({
        type: `${NAMESPACE}/getotherProcedureList`,
        payload: {
          searchContent: exProps,
          pageSize: PAGE_SIZE,
          currentPage: 1,
        },
      });
    };

    const selectData = (item: any) => {
      const changedFields = lodash.pick(item, [
        'procedureCode',
        'womenSurgeryFlg',
        'nnmWomenSurgeryFlg',
        'highReimbPct',
        'transplantationSurgeryFlg',
        'bornMarrowFlg',
        'cancerRadiationAppFlg',
      ]);
      dispatch({
        type: `${NAMESPACE}/saveOtherProcedureItem`,
        payload: {
          changedFields: {
            ...changedFields,
            radiationCategory: item.approvalProcedureName,
            kjCode: `${item.kjCode}${item.branchNo}${item.itemNo}`,
          },
          treatmentId,
          otherProcedureId,
        },
      });
    };
    const popUpPablePoint = useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.popUpPablePoint || {}
    );
    const top = Number(popUpPablePoint?.top) + 32;
    const left = Number(popUpPablePoint?.left) - 820;
    const handleChange = async (extraParams: any) => {
      await dispatch({
        type: `${NAMESPACE}/otherProcedureModalUpdate`,
        payload: {
          current: extraParams.currentPage,
        },
      });
      await dispatch({
        type: `${NAMESPACE}/getotherProcedureList`,
        payload: {
          searchContent: searchContent,
          pageSize: PAGE_SIZE,
          ...extraParams,
        },
      });
    };

    return (
      <CommonResizeModal
        title={
          <div className={styles.modalTitle}>
            <Icon component={SearchIcon} />
            {formatMessageApi({ Label_CLM_Opus: 'searchSurgery' })}
          </div>
        }
        width={1200}
        authHeight
        iconVisible={false}
        visible={show}
        returnAuth
        onReturn={onClose}
        moveTop={top}
        moveLeft={left}
      >
        <div className={styles.content}>
          <FormItemSelectPlus
            className={styles.surgerySelect}
            initialValue={searchContent}
            form={form}
            formName={'radiationCategory'}
            labelId={'RadiationCategory'}
            labelTypeCode={'Label_BIZ_Claim'}
            searchCustom={(postData: any) =>
              handleProcedureName(lodash.set(postData, 'params.searchKJCode', 'M%'))
            }
            optionShowType="code"
            onSelectCallback={onSelect}
            selectCallbackExProp={'approvalProcedureName'}
          />
          <div className={styles.resultText}>{`${total} result(s)`}</div>
          <Table
            className={styles.searchTable}
            scroll={{ x: true }}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={searchList}
            pagination={{ current: current, pageSize: PAGE_SIZE, total: total }}
            onRow={(item: any) => {
              return {
                onDoubleClick: () => {
                  selectData(item);
                  dispatch({
                    type: `${NAMESPACE}/otherProcedureModalHidden`,
                  });
                },
              };
            }}
            onChange={(pagination: any, filters, sorter) => {
              let extraParams: any = {};

              if (!lodash.isEmpty(pagination)) {
                const { current: currentPage } = pagination || {};
                extraParams = {
                  ...extraParams,
                  currentPage,
                };
              }
              if (!lodash.isEmpty(extraParams)) {
                handleChange(extraParams);
              }
            }}
          />
        </div>
      </CommonResizeModal>
    );
  })
);
