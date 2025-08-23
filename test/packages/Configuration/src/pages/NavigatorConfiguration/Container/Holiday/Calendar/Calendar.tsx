import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Spin } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import Calendar from 'rc-calendar';
import classnames from 'classnames';
import moment from 'moment';
import renderCalendarStyles from './renderCalendarStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'rc-calendar/assets/index.css';
import styles from './Calendar.less';
import { FunctionCode } from '../../../Enum';

interface IProps {
  caseNo?: string;
  dateTime?: string;
  modalTaskId?: string;
}

export default () => {
  const dispatch = useDispatch();
  const [selectYear, setSelectYear] = useState(`${moment().year()}`);
  const listPage: any = useSelector((state: any) => state.configurationController.listPage);
  const functionData: any = useSelector((state: any) => state.configurationController.functionData);
  const functionLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationController/listPage']
  );
  const rows =
    listPage.rows?.filter((item) => `${moment(item.start_day).year()}` === selectYear) || [];

  useEffect(() => {
    if (
      functionData.functionCode ===
      FunctionCode.Fun_venus_integration_integration_service_downtime_config
    )
      dispatch({
        type: 'configurationController/listPage',
      });
  }, [functionData]);

  return (
    <>
      {!functionLoading ? (
        <>
          <div className={styles.year}>
            <div
              onClick={() => {
                setSelectYear(`${moment(selectYear).add(-1, 'y').year()}`);
              }}
              className={styles.setYear}
            >
              {'<'}
            </div>
            <div>{selectYear}</div>
            <div
              onClick={() => {
                setSelectYear(`${moment(selectYear).add(1, 'y').year()}`);
              }}
              className={styles.setYear}
            >
              {'>'}
            </div>
          </div>
          <div className={styles.wrap}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
              <Calendar
                key={item}
                format="YYYY-MM-DD"
                dateRender={(current: any, value) => {
                  const approvedStyle = renderCalendarStyles('approved', current, rows, value);

                  return (
                    <div
                      className={classnames(
                        'rc-calendar-date',
                        approvedStyle.open && styles.openItem,
                        approvedStyle.open && styles.approvedOpen,
                        approvedStyle.first && styles.firstItem,
                        approvedStyle.last && styles.lastItem,
                        approvedStyle.first && approvedStyle.last && styles.onlyItem
                      )}
                      data-datetime={moment(current).format('YYYY-MM-DD HH:mm')}
                      onClick={async (el: any) => {}}
                    >
                      {moment(current).format('DD')}
                    </div>
                  );
                }}
                value={moment(selectYear).month(item)}
                showDateInput={false}
                focusablePanel={false}
                renderFooter={null}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyBox}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </>
  );
};
