/* eslint-disable consistent-return */
import { useState } from 'react';
import api_mock_followUp from '../../__mock__/api_mock_followUp.json';
import { toLower, camelCase } from 'lodash';
import { TimerConf } from '../useQueryData';
import { centerProductionMonitor } from '@/services/monitorCenterControllerService';
import { notification } from 'antd';
import { BusinessConfig, BusinessType } from '../config';
import { delay } from '../utils';

const useFollowUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('');
  const getFollowUpDetail = async (
    category: string,
    region: string,
    detailMonitorCategoryList = []
  ) => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadingType(category);
    const mockKey = `monitor_followUp_${toLower(camelCase(category))}`;
    const isMock =
      TimerConf?.isMock && !BusinessConfig?.[BusinessType.HEALTHCHECK]?.skipMock?.[category];
    if (isMock) {
      await delay(5000);
    }
    try {
      const response: any = isMock
        ? (api_mock_followUp as any)?.[mockKey] || []
        : await centerProductionMonitor(
            {
              monitorCategory:
                BusinessConfig?.[BusinessType.HEALTHCHECK]?.MonitorDetailCode?.[category],
              region,
              detailMonitorCategoryList,
            },
            {
              useRegionHeader: true,
            }
          );

      if (response && response.success) {
        return response?.responseData?.dataList || [];
      } else {
        notification.error({
          message: response?.messageList?.[0]?.content,
        });
      }
      return null;
    } catch (error) {
      if (typeof error === 'string') {
        notification.error({
          message: error || 'Failed to fetch follow-up details',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // auto region
  return {
    isLoading,
    loadingType,
    getFollowUpDetail,
  };
};

export default useFollowUp;
