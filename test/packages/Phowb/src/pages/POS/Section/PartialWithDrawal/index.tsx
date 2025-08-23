import React, { Component } from 'react';
import { Form, Table } from 'antd';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection, { FormItemNumber, FormLayout } from 'basic/components/Form/FormSection';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import getColumns from './getColumns';
import { FormId, CalculatType, WithdrawalOptionCode } from '../../Enum';
import { VLD_000006 } from '../../validators/errorWarn';
import Options from './options';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable?: boolean;
  fundList: object[];
  totalWithdrawAmount: number;
  totalAmount: number;
  totalPercentage: number;
  validating: boolean;
  taskDefKey: string;
}

class PartialWithDrawal extends Component<IProps> {
  get VLD_000006() {
    return !!VLD_000006(
      this.props?.totalWithdrawAmount,
      this.props?.totalAmount,
      this.props?.totalPercentage
    )?.length;
  }

  get isNotEditable() {
    const { taskNotEditable, taskDefKey }: any = this.props;
    return (
      taskNotEditable || ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey)
    );
  }

  get hasFuncList(): boolean {
    const { fundList = [] } = this.props;
    return fundList?.length > 0;
  }

  render() {
    const { form, fundList, withdrawalOption, submited }: any = this.props;

    return (
      <div className={styles.container}>
        <FormSection
          form={form}
          formId={FormId.PartialWithDrawal}
          title={
            <>
              {formatMessageApi({
                Label_BIZ_POS: 'PartialWD',
              })}
              {submited && this.VLD_000006 && this.hasFuncList && (
                <ErrorTooltipManual
                  // @ts-ignore
                  manualErrorMessage={
                    <>
                      {this.VLD_000006 && (
                        <p>
                          {formatMessageApi(
                            { Label_COM_WarningMessage: 'ERR_000011' },
                            formatMessageApi({
                              Label_BIZ_Claim:
                                'venus_claim.phowb.dataCapture.label.partialWithdrawal.title',
                            })
                          )}
                        </p>
                      )}
                    </>
                  }
                />
              )}
            </>
          }
          layConf={24}
          isMargin
        >
          <FormLayout
            layConf={{
              default: 24,
              withdrawalOption: 8,
              totalWithdrawAmount: 4,
              totalAmount: 4,
              totalPercentage: 4,
            }}
          >
            {/**
              //@ts-ignore */}
            <Options name="withdrawalOption" taskNotEditable={this.isNotEditable} />
            <FormItemNumber
              // @ts-ignore
              form={form}
              labelId={formatMessageApi({
                Label_BIZ_POS: 'EstTotWDAmt',
              })}
              disabled
              pattern={/^\d+$|(^\d+\.\d)|(^\d+\.)+$/g}
              formName="totalWithdrawAmount"
              name="totalWithdrawAmount"
              labelRight
            />
            <FormItemNumber
              // @ts-ignore
              form={form}
              labelId={formatMessageApi({
                Label_BIZ_POS: 'TotalAmount',
              })}
              disabled={
                this.isNotEditable ||
                lodash.some(fundList, (item) => queryValue(item.currency) === 'USD')
              }
              pattern={/^\d+$|(^\d+\.\d)|(^\d+\.)+$/g}
              formName="totalAmount"
              name="totalAmount"
              labelRight
            />
            <FormItemNumber
              mix={0}
              max={100}
              form={form}
              labelId={formatMessageApi({
                Label_BIZ_POS: 'TotalPercentage',
              })}
              pattern={/^\d+$|(^\d+\.\d)|(^\d+\.)+$/g}
              disabled={this.isNotEditable}
              formName="totalPercentage"
              name="totalPercentage"
              precision={0}
              labelRight
            />
            <div className={styles.tableWrap}>
              <Table
                scroll={{ x: 'max-content' }}
                rowKey={(record: any) => record.fundCode}
                dataSource={fundList}
                columns={getColumns({
                  taskNotEditable: this.isNotEditable,
                  fundList,
                  withdrawalOption: formUtils.queryValue(withdrawalOption),
                  form,
                })}
                pagination={false}
              />
            </div>
          </FormLayout>
        </FormSection>
      </div>
    );
  }
}

export default connect(
  ({ claimEditable, formCommonController, phowbDataCaptureController, processTask }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    fundList:
      phowbDataCaptureController.claimProcessData.posDataDetail.partialWithdrawal?.fundList || [],
    totalWithdrawAmount:
      phowbDataCaptureController.claimProcessData.posDataDetail.partialWithdrawal
        ?.totalWithdrawAmount || 0,
    totalAmount:
      phowbDataCaptureController.claimProcessData.posDataDetail.partialWithdrawal?.totalAmount,
    totalPercentage:
      phowbDataCaptureController.claimProcessData.posDataDetail.partialWithdrawal?.totalPercentage,
    withdrawalOption:
      phowbDataCaptureController.claimProcessData.posDataDetail.partialWithdrawal
        ?.withdrawalOption || WithdrawalOptionCode.Percentage,
    taskDefKey: processTask?.getTask?.taskDefKey,
    submited: formCommonController.submited,
    validating: formCommonController?.validating,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updateFundList',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updateFundList',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { fundList, totalWithdrawAmount, totalAmount, totalPercentage } = props;

      const newArr = lodash.map(lodash.compact(fundList), (paramsItem) =>
        lodash.pick(paramsItem, [
          CalculatType.WithdrawPercentage,
          CalculatType.withdrawNumberOfUnits,
          CalculatType.WithdrawAmount,
        ])
      );

      const newObj = lodash.reduce(
        newArr,
        (obj: any, param: any, index) => {
          // eslint-disable-next-line  no-param-reassign
          obj[`${CalculatType.WithdrawPercentage}_${index}`] =
            param.withdrawPercentage !== 0 ? param.withdrawPercentage : '';
          // eslint-disable-next-line  no-param-reassign
          obj[`${CalculatType.withdrawNumberOfUnits}_${index}`] =
            param.withdrawNumberOfUnits !== 0 ? param.withdrawNumberOfUnits : '';
          // eslint-disable-next-line  no-param-reassign
          obj[`${CalculatType.WithdrawAmount}_${index}`] =
            param.withdrawAmount !== 0 ? param.withdrawAmount : '';
          return obj;
        },
        {}
      );

      return formUtils.mapObjectToFields(
        {
          ...newObj,
          totalWithdrawAmount,
          totalAmount,
          totalPercentage,
        },
        {}
      );
    },
  })(PartialWithDrawal)
);
