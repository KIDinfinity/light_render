import { vnbConfig } from '../config';

export default class Request {
  api = '';
  headMap = {
    'Content-Type': 'application/json',
    Authorization:
      'Basic ' +
      Buffer.from(vnbConfig.API_USERNAME + ':' + vnbConfig.API_PASSWORD).toString('base64'),
    'auth-token': vnbConfig.API_KEY,
    Host: vnbConfig.API_HOST,
  };
  requestData = {};
  serviceType = 'restful';

  get serviceUrl() {
    return `https://${vnbConfig.API_HOST}/${vnbConfig.API_SUBDOMAIN}/${this.api}`;
  }

  toParams() {
    return {
      serviceType: this.serviceType,
      headMap: this.headMap,
      requestData: this.requestData,
      serviceUrl: this.serviceUrl,
    };
  }
}
