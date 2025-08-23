import { useSelector } from 'dva';
import lodash from 'lodash';

export default () => {
  const currentPanelId = useSelector((state) => state?.integration?.currentPanelId);
  const currentIntegrationId = useSelector((state) => state?.integration?.currentIntegrationId);
  const integrationChecklist = useSelector((state) => state?.integration?.integrationChecklist);
  const currentPanel = lodash.find(integrationChecklist, (item) => {
    return item?.taskId === currentPanelId;
  });
  return (
    lodash.find(currentPanel?.integrationCallRecordList, (item) => {
      return item?.integrationSessionId === currentIntegrationId;
    }) || {}
  );
};
