import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon, Collapse } from 'antd';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { ReactComponent as SelectAllIcon } from '@/assets/select-all.svg';
import classNames from 'classnames';
import SubmissionData from './submissionData';
import UdItem from './item';
import styles from './index.less';
import { namespace } from '../../_models';

const { Panel } = Collapse;

export default () => {
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const caseRelevantSubmissionBatchInfo = useSelector(
    ({ [namespace]: modelnamepsace }: any) =>
      modelnamepsace?.readOnly?.caseRelevantSubmissionBatchInfo
  );

  const unknownDocList = useSelector(
    ({ [namespace]: modelnamepsace }: any) => modelnamepsace.processData?.unknownDocList
  );

  const attachList = useSelector(
    ({ [namespace]: modelnamepsace }: any) => modelnamepsace?.attachList
  );

  // const [jsonViewVisible, setJsonViewVisible] = React.useState(false);
  const dispatch = useDispatch();
  const selectAll = () => {
    if (unknownDocList?.length === 0 || taskNotEditable) return;
    if (lodash.uniqBy(attachList, 'docId')?.length === unknownDocList?.length) {
      dispatch({
        type: `UnknownDocumentBaseController/removeAllAttachList`,
        payload: {
          unknownDocList,
        },
      });
    } else {
      dispatch({
        type: `UnknownDocumentBaseController/selectAllAttachList`,
        payload: {
          unknownDocList: unknownDocList?.filter(
            (item: any) => !attachList?.some((sp: any) => sp.docId === item.docId)
          ),
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {formatMessageApi({
          Label_COM_Registration: 'SubmissionNo',
        })}{' '}
        {caseRelevantSubmissionBatchInfo?.submissionNo || '-'}
      </p>
      <div className={styles.listWrap}>
        <Collapse bordered={false} defaultActiveKey={['SubmissionData', 'Document']}>
          <Panel
            header={
              <p>
                <span>
                  {formatMessageApi({
                    Label_COM_Registration: 'SubmissionData',
                  })}
                </span>{' '}
                {/* <Tooltip title="View more json data."> */}
                {/* <Icon
                  type="info-circle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setJsonViewVisible(true);
                  }}
                /> */}
                {/* </Tooltip> */}
              </p>
            }
            key="SubmissionData"
          >
            <SubmissionData caseRelevantSubmissionBatchInfo={caseRelevantSubmissionBatchInfo} />
          </Panel>
          <Panel
            header={
              <p>
                <span>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'Document',
                  })}
                </span>{' '}
                <Icon
                  component={SelectAllIcon}
                  className={classNames({
                    'select-all': true,
                    active:
                      lodash.uniqBy(attachList, 'docId')?.length === unknownDocList?.length &&
                      unknownDocList?.length !== 0,
                    [styles.disabled]: taskNotEditable,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectAll();
                  }}
                />
              </p>
            }
            key="Document"
          >
            {unknownDocList?.length > 0
              ? lodash.map(unknownDocList, (item: any) => <UdItem item={item} key={item.docId} />)
              : '-'}
          </Panel>
        </Collapse>
      </div>
      {/* <Modal visible={jsonViewVisible} onCancel={() => setJsonViewVisible(false)} footer={false}>
        <ReactJson src={caseRelevantSubmissionBatchInfo?.businessData} theme="google" />
      </Modal> */}
    </div>
  );
};
