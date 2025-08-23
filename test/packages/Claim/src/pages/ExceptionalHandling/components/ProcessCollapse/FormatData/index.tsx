import React, { Component } from 'react';
import JSONView from 'react-json-view';
import XMLViewer from 'react-xml-viewer';
import CommonEmpty from '@/components/Empty';
import Header from './Header';
import styles from './index.less';

class FormatData extends Component<any> {
  renderData = () => {
    const { data, exceptionMsg } = this.props;
    let dataType = 'JSON';
    let renderData;

    try {
      const res=JSON.parse(data);
      if(res===null) dataType='NO_DATA'
    } catch {
      dataType = data ? 'XML' : 'NO_DATA';
    }

    switch (dataType) {
      case 'JSON':
        renderData = <JSONView enableClipboard={false} src={JSON.parse(data)} theme="google" />;
        break;
      case 'XML':
        renderData = (
          <XMLViewer
            xml={data}
            theme={{
              textColor: 'rgba(255, 255, 255, 85%)',
              tagColor: 'rgba(255, 255, 255, 85%)',
              separatorColor: 'rgba(255, 255, 255, 85%)',
            }}
          />
        );
        break;
      case 'NO_DATA':
        renderData = exceptionMsg || <CommonEmpty />;
        break;
      default:
    }
    return renderData;
  };

  render() {
    const { type, time, data, exceptionMsg } = this.props;
    return (
      <div className={styles.formatData}>
        <Header type={type} time={time} data={data || exceptionMsg} />
        <div className={styles.data}>{this.renderData()}</div>
      </div>
    );
  }
}

export default FormatData;
