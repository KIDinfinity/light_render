import React, { Component } from 'react';
import { Select } from 'antd';
import lodash from 'lodash';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './AddDocumentTypes.less';

class DocumentTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState((state) => ({
      ...state,
      open: true,
    }));
  };

  handleCancel = (value) => {
    const { handleSelectDocument } = this.props;
    this.setState({
      open: false,
    });
    handleSelectDocument(value);
  };

  render() {
    const { disabled, selectedOptions, dicts } = this.props;
    const dictsList = lodash.filter(
      dicts,
      (item) => !lodash.includes(selectedOptions, item.dictCode)
    );
    const { open } = this.state;

    return (
      <>
        <div className={styles.addDocumentWrap}>
          {!disabled && (
            <div className={styles.buttonWrap}>
              <ButtonOfClaim
                handleClick={this.handleOpen}
                buttonText={formatMessageApi({
                  Label_BIZ_Claim: 'app.claim.documentTypes',
                })}
                buttonStyle={{ height: '36px' }}
              />
            </div>
          )}
        </div>
        {open && (
          <Select
            showSearch
            open={open}
            mode="multiple"
            style={{ width: '60%' }}
            onBlur={this.handleCancel}
            dropdownMatchSelectWidth={false}
            filterOption={(input, option) =>
              String(option.props.children).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
            }
          >
            {lodash.map(dictsList, (item) => (
              <Select.Option key={item.dictCode} value={item.dictCode}>
                {item.dictName}
              </Select.Option>
            ))}
          </Select>
        )}
      </>
    );
  }
}

export default DocumentTypes;
