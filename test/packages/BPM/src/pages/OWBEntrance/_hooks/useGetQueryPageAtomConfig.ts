import { useEffect } from 'react';
import lodash from 'lodash';
import { queryPageAtomConfig } from '@/services/miscPageAtomConfigControllerService';
import { tenant } from '@/components/Tenant';
import { Validator } from 'jsonschema';

const validator = new Validator();
const schema = {
  id: 'queryPageAtomConfigParam',
  properties: {
    caseCategory: {
      type: 'string',
    },
    sectionId: {
      type: 'string',
    },
    regionCode: {
      type: 'string',
    },
  },
  required: ['caseCategory', 'sectionId', 'regionCode'],
};

export default ({ caseCategory, sectionId, dispatch = () => {} }: any) => {
  const regionCode = tenant.region();
  const isValidated = validator.validate({ caseCategory, sectionId, regionCode }, schema)?.valid;
  useEffect(() => {
    if (isValidated) {
      queryPageAtomConfig({
        caseCategory,
        regionCode,
        sectionId,
      }).then((response) => {
        const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
        if (success) {
          dispatch({
            type: 'setPageAtomConfig',
            payload: {
              pageAtomConfig: resultData,
            },
          });
        } else {
          dispatch({
            type: 'setPageAtomConfig',
            payload: {
              pageAtomConfig: [],
            },
          });
        }
      });
    } else {
      dispatch({
        type: 'setPageAtomConfig',
        payload: {
          pageAtomConfig: [],
        },
      });
    }
  }, [caseCategory, sectionId, isValidated]);
};
