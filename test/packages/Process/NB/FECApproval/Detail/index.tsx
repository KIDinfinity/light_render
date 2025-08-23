import React from 'react';
import { Table } from 'antd';

import Section, { SectionTitle, Fields, localConfig } from './Section/index';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormAntCard, formUtils } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useLoading from 'basic/hooks/useLoading';
import { Form, Button } from 'antd';
import { connect, useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { NAMESPACE } from '../activity.config';
import styles from './index.less';

const AcceptRisk = connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, index } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveFECDetail',
              payload: {
                changedFields,
                index,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveFECDetail',
            payload: {
              changedFields,
              index,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { record } = props;
      return formUtils.mapObjectToFields(record);
    },
  })(({ form }) => {
    const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

    return (
      <Section form={form} editable={editable} section="FECDetail">
        <Fields.AcceptRisk />
      </Section>
    );
  })
);

const Reason = connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, index } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveFECDetail',
              payload: {
                changedFields,
                index,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveFECDetail',
            payload: {
              changedFields,
              index,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { record } = props;
      return formUtils.mapObjectToFields(record);
    },
  })(({ form }) => {
    const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

    return (
      <Section form={form} editable={editable} section="FECDetail">
        <Fields.Reason />
      </Section>
    );
  })
);

const columnsConfig = [
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'role' }),
    dataIndex: 'roleCode',
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'fecType' }),
    dataIndex: 'fecItemDesc',
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'riskLevel' }),
    dataIndex: 'riskLevel',
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'riskMessage' }),
    dataIndex: 'riskMessage',
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'acceptRisk' }),
    dataIndex: 'acceptRisk',
    render: (val: string, record: any, index: number) => {
      return <AcceptRisk val={{ acceptRisk: val }} record={record} index={index} />;
    },
    width: '10%',
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'reason' }),
    dataIndex: 'reason',
    render: (val: string, record: any, index: number) => {
      return <Reason val={{ acceptRisk: val }} record={record} index={index} />;
    },
    width: '25%',
  },
];

const FECDetail = () => {
  const { loading, setLoading } = useLoading();
  const dispatch = useDispatch();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const detailList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.fecInfo?.detailList,
    shallowEqual
  );

  const handleUpdate = () => {
    setLoading(true);
    dispatch({
      type: 'formCommonController/handleValidating',
    });
    setTimeout(async () => {
      await dispatch({
        type: `${NAMESPACE}/handleUpdate`,
      });
      setLoading(false);
    });
  };

  const config = useGetSectionAtomConfig({
    section: 'FECDetail',
    localConfig,
  });

  const columns = lodash.filter(columnsConfig, (item) => {
    const target = lodash.find(config, { field: item.dataIndex });
    if (target) {
      return target?.['field-props']?.visible === 'Y';
    }
    return false;
  });

  return (
    <FormAntCard
      title={<SectionTitle />}
      extra={
        taskDetail.taskDefKey === 'BP_FEC_ACT002' && (
          <Button className={styles.buttonUpdate} onClick={handleUpdate} loading={loading}>
            {formatMessageApi({
              Label_BPM_Button: 'Update',
            })}
          </Button>
        )
      }
    >
      <Table columns={columns} dataSource={detailList} pagination={false} />
    </FormAntCard>
  );
};

FECDetail.displayName = 'FECDetail';

export default FECDetail;
