import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormItem from '../FormItem/FormItem';
import InvoiceInformation from '../InvoiceInformation/InvoiceInformation';
import styles from './index.less';

interface IProps {
  dispatch: Function;
  basicInforData: any;
}

// @ts-ignore
@connect(({ hospitalDetailController }: any) => ({
  basicInforData: lodash.get(hospitalDetailController, 'basicInforData'),
}))
class HospitalDetail extends Component<IProps> {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hospitalDetailController/getHospitalBillingByClaimNoData',
      payload: {
        claimNo: lodash.get(this.props, 'location.query.claimNo', ''),
      },
    });
    dispatch({
      type: 'hospitalDetailController/findDictionaryByTypeCodes',
    });
  };

  render() {
    const { basicInforData } = this.props;
    const { 'Cover Page No': coverPageNo, ...info } = basicInforData;
    const infoKey = lodash.keys(info);
    return (
      <>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.hospitalDetail.basic-information',
          })}
        >
          <div className={styles.info}>
            <FormItem
              labelText="Cover Page No"
              ctnText={coverPageNo}
              style={{ float: 'left', width: '25%' }}
            />
          </div>
          <div className={styles.info}>
            {lodash.map(infoKey, (item: string, key: number) => (
              <FormItem
                labelText={item}
                ctnText={info[item]}
                style={{ float: 'left', width: '25%' }}
                key={key}
              />
            ))}
          </div>
        </Card>
        <InvoiceInformation />
      </>
    );
  }
}

export default HospitalDetail;
