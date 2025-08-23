import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Form, Button, Row, Col } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection, {
  FormItemInput,
  FormItemSelect,
  FormItemDatePicker,
} from 'basic/components/Form/FormSection';
// TODO:这个需要国际化
import setType from './setType';
import { AddType } from '../../Enum';
import styles from './index.less';

interface IProps {
  ruleModules: any[];
  businessNo: string;
  caseCategory: string;
  taskNotEditable: boolean;
  ruleSetS: any[];
  form: any;
  info: any;
  dispatch: Dispatch<any>;
}

interface IRuleSetInfo {
  ruleSetName: string;
  moduleCode: string;
  ruleSetType: string;
  effectiveDate: string;
  expiredDate: string;
  description: string;
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  validating: boolean;
  ruleSetInfo: IRuleSetInfo;
}

const BasicInfo: React.FC<IProps> = ({ dispatch, form, ruleModules }) => {
  const handleClear = async () => {
    await dispatch({
      type: 'ruleEngineController/clearNewSearchParams',
    });
    await dispatch({
      type: 'ruleEngineController/getSearchQuery',
      payload: {
        activeCode: AddType.NewRuleSet,
      },
    });
  };
  const handleSearch = () => {
    dispatch({
      type: 'ruleEngineController/getSearchQuery',
      payload: {
        activeCode: AddType.NewRuleSet,
      },
    });
  };
  useEffect(() => {
    return () => {
      dispatch({
        type: 'ruleEngineController/clearNewSearchParams',
      });
    };
  }, []);

  return (
    <div className={styles.require}>
      <Row>
        <Col span={20}>
          <FormSection
            form={form}
            formId="require"
            title=""
            layConf={{
              default: 8,
              name: 16,
            }}
            isHideBgColor
            isPadding={false}
            isMargin
          >
            <FormItemSelect
              form={form}
              dicts={ruleModules}
              formName="moduleCode"
              dictCode="moduleCode"
              dictName="moduleName"
              labelId="venus_claim.rules.basicInfo.label.model"
            />
            <FormItemInput form={form} formName="ruleSetName" name="name" labelId="Rule Name" />

            <FormItemSelect
              form={form}
              dicts={setType}
              formName="type"
              labelTypeCode="Label_RUL_Engine"
              labelId="Type"
            />
            <FormItemInput form={form} formName="creator" labelId="Create By" />
            <FormItemDatePicker
              form={form}
              formName="gmtCreate"
              allowFreeSelect
              labelId="Creation Date"
              format="L"
            />
          </FormSection>
        </Col>
        <Col span={4}>
          <div className={styles.button}>
            <div className={styles.first}>
              <Button
                size="small"
                shape="round"
                onClick={() => {
                  handleSearch();
                }}
              >
                {formatMessageApi({
                  Label_BPM_Button: 'venus_claim.button.search',
                })}
              </Button>
            </div>
            <div>
              <Button
                size="small"
                shape="round"
                onClick={() => {
                  handleClear();
                }}
              >
                {formatMessageApi({ Label_BIZ_Claim: 'component.noticeIcon.clear' })}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ ruleEngineController }: any) => ({
  ruleModules: ruleEngineController.dropDown?.ruleModules || [],
  info: ruleEngineController.searchData?.data[AddType.NewRuleSet]?.params || {},
}))(
  Form.create<IFormProps>({
    async onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;
      if (!validating) {
        dispatch({
          type: 'ruleEngineController/updateSearchParams',
          payload: {
            ...formUtils.formatFlattenValue(formUtils.cleanValidateData(changedFields)),
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { info }: any = props;
      return formUtils.mapObjectToFields(info, {});
    },
  })(BasicInfo)
);
