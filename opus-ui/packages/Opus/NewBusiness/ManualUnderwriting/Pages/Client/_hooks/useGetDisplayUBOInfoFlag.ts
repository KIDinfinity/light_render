import { useDispatch } from 'dva';
import { GlobalConfigCodeType } from 'opus/Enums';
import useGetGlobalConfig from 'opus/Hooks/useGetGlobalConfig';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';
import useGetCompanyCode from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCompanyCode';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useEffect } from 'react';
import lodash from 'lodash';
import BooleanEnum from 'basic/enum/BooleanEnum';

export default () => {
  const companyCode = useGetCompanyCode();
  if (!companyCode) {
    return;
  }
  const displayUBOInfoFlag = useGetGlobalConfig({
    codeType: GlobalConfigCodeType.displayUBOInfo,
    companyCode,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/setDisplayUBOInfoFlag`,
      payload: {
        displayUBOInfoFlag:
          lodash.isNil(displayUBOInfoFlag) && companyCode === CompanyCode.LA
            ? BooleanEnum.Yes
            : displayUBOInfoFlag,
      },
    });
  }, [displayUBOInfoFlag]);
};
