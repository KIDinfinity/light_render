import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCampaignList from 'process/NB/ManualUnderwriting/_hooks/useGetCampaignList';

export default (campaignCode?: string) => {
  const campaignList = useGetCampaignList();

  return useMemo(() => {
    return (
      formUtils.queryValue(
        lodash
          .find(campaignList, (campaignItem: any) => {
            return formUtils.queryValue(campaignItem?.campaignCode) === campaignCode;
          })
          ?.get('campaignName')
      ) || campaignCode
    );
  }, [campaignCode, campaignList]);
};
