import { useEffect, useCallback } from 'react';
import {
  queryPageAtomConfigV2,
  queryPageAtomConfigUI,
} from '@/services/miscPageAtomConfigControllerService';
import isOpus from '@/utils/isOpus';

import { useRequest } from 'ahooks';
import { tenant } from '@/components/Tenant';
import { Validator } from 'jsonschema';
import lodash from 'lodash';

import { getNewNBUI } from 'process/Utils';

const validator = new Validator();
const schema = {
  id: 'queryPageAtomConfigParam',
  properties: {
    caseCategory: {
      type: 'string',
    },
    activityCode: {
      type: 'string',
    },
    regionCode: {
      type: 'string',
    },
  },
  required: ['caseCategory', 'activityCode', 'regionCode'],
};

export default ({ caseCategory, activityCode, dispatch, pageConfig }: any) => {
  const regionCode = tenant.region();
  const opusSite = isOpus();
  const handler = useCallback(() => {
    return new Promise((resolve, reject) => {
      const validateRes = validator.validate({ caseCategory, activityCode, regionCode }, schema);
      if (!validateRes.valid) {
        reject(validateRes);
        return;
      }

      const url = (() => {
        if (opusSite) {
          return queryPageAtomConfigV2;
        }
        return getNewNBUI({
          caseCategory: pageConfig?.caseCategory,
          taskDefKey: pageConfig?.activityCode || pageConfig?.activityKey || activityCode,
        })
          ? queryPageAtomConfigUI
          : queryPageAtomConfigV2;
      })();
      url({
        caseCategory,
        activityCode,
        regionCode: opusSite ? `${regionCode}_OPUS` : regionCode,
      }).then((res) => {
        resolve(res);
      });
    });
  }, [caseCategory, activityCode, regionCode, opusSite, pageConfig]);
  const { loading, data } = useRequest(handler, {
    ready: validator.validate({ caseCategory, activityCode, regionCode }, schema).valid,
  });
  useEffect(() => {
    dispatch({
      type: 'setLoading',
      payload: {
        loading,
      },
    });
  }, [loading]);
  const handleSetConfigData = useCallback(
    (response: any) => {
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success) {
        dispatch({
          type: 'setPageAtomConfig',
          payload: {
            pageAtomConfig: resultData,
          },
        });
      }
    },
    [caseCategory, activityCode]
  );
  const handleResetConfig = useCallback(() => {
    dispatch({
      type: 'setPageAtomConfig',
      payload: {
        pageAtomConfig: [],
      },
    });
  }, []);
  useEffect(() => {
    handleSetConfigData(data);
    return handleResetConfig;
  }, [data]);
};
