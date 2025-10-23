import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import { Row, Col, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import { ReactComponent as Rejected } from 'bpm/assets/process-rejected.svg';
import { ReactComponent as Canceled } from 'bpm/assets/process-cancelled.svg';
import { ReactComponent as WaitingApproval } from 'bpm/assets/process-waitingApproval.svg';
import IconRecycle from './assets/icon-recycle.png';
import { RequestStatus } from '../../../../../LeaveManagement/Enum';
import styles from './index.less';

interface IProps {
  type?: string;
  list?: any[];
}

export default ({ listactive }: any) => {
  const dispatch = useDispatch();
  const { rejected, cancelled, waiting_for_approval } = useSelector(
    (state: any) => state.leaveManagement.requestInfo
  );
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  const setHeight = () => {
    setInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', setHeight);
    dispatch({
      type: 'leaveManagement/getLeaveRequestInfo',
      payload: {
        params: {
          statuses: [RequestStatus.Rejected, RequestStatus.Cancelled],
        },
      },
    });
    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, []);
  const handleCancelled = () => {
    dispatch({
      type: 'leaveManagement/getDiscardUserLeaveRequest',
    });
  };
  const handleDate = async ({ caseNo }: any) => {
    if (!lodash.isEmpty(caseNo)) {
      await dispatch({
        type: 'leaveManagement/getFindLatesTaskByCaseNo',
        payload: {
          caseNo,
        },
      });
      await dispatch({
        type: 'leaveManagement/saveState',
        payload: {
          showModal: true,
        },
      });
    }
  };

  const renderItem = ({ type, list = [] }: IProps) => {
    return (
      <div className={styles.item}>
        <Row gutter={16}>
          {listactive === 'personalActive' ? (
            <Col className="gutter-row" span={innerHeight > 700 ? 7 : 24}>
              <div className={styles.listLeft}>
                <Icon
                  component={type === RequestStatus.Rejected ? Rejected : Canceled}
                  style={{ fontSize: '20px' }}
                  className="anction-Pending"
                />
                <span className={styles.text}>
                  {formatMessageApi({
                    Label_COM_UserCenter: `${type}`,
                  })}
                </span>
              </div>
            </Col>
          ) : (
            <Col className="gutter-row" span={24}>
              <div className={styles.listLeft}>
                <Icon
                  component={WaitingApproval}
                  style={{ fontSize: '20px' }}
                  className="anction-Pending"
                />
                <span className={styles.text}>Pending for Approval</span>
              </div>
            </Col>
          )}

          {listactive === 'personalActive' && (
            <Col className="gutter-row" span={innerHeight > 700 ? 17 : 24}>
              <div className={styles.listRight}>
                {lodash.map(list, (item: any) => {
                  return (
                    <>
                      <p
                        className={styles.time}
                        onClick={() => {
                          handleDate(item);
                        }}
                      >
                        {moment(item.startTime).format('L LT')}&nbsp;-&nbsp;
                        {moment(item.endTime).format('L LT')}
                      </p>
                      {type === RequestStatus.Cancelled && (
                        <img
                          onClick={() => {
                            handleCancelled();
                          }}
                          src={IconRecycle}
                          height="22"
                          width="22"
                          alt="es-lint want to get"
                        />
                      )}
                    </>
                  );
                })}
              </div>
            </Col>
          )}
        </Row>
      </div>
    );
  };
  return (
    <div className={styles.list}>
      {listactive === 'personalActive' &&
        !lodash.isEmpty(rejected) &&
        renderItem({ type: RequestStatus.Rejected, list: rejected })}
      {listactive === 'personalActive' &&
        !lodash.isEmpty(cancelled) &&
        renderItem({ type: RequestStatus.Cancelled, list: cancelled })}

      {listactive === 'teamActive' &&
        !lodash.isEmpty(waiting_for_approval) &&
        renderItem({ type: RequestStatus.WaitingApproval, list: waiting_for_approval })}
    </div>
  );
};
