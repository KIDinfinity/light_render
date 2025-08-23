import mockServer from 'pptr-mock-server';
import mockList from '../mock';
// import config from '../config';


export default async ({ page }: any) => {

  const baseAppUrl = 'http://localhost:8000';
  const mockRequest = await mockServer.init(page, {
    baseAppUrl,
    baseApiUrl: `${baseAppUrl}/presit/api/`
  });
  mockList.forEach((item: any) => {
    const { method, url, status, data } = item;
    mockRequest.on(method, url, status, data)
  })
}


