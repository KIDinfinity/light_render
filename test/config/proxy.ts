const proxy = {
  mock: 'http://localhost:8000',
  ci: 'http://10.22.28.131:9100',
  dit: 'http://dit.fwdowb.net:9100', // 10.22.28.133
  presit: 'http://10.22.168.115/', // 10.22.60.12
  uat: 'https://uat-claims.fwd.com.hk',
  dev: 'https://dev-claims.fwd.com.hk',
  // presit: 'http://presit.fwdowb.net:9100', // 10.22.42.2
  'bs-sit': 'http://bssit.fwdowb.net:9100', //10.22.40.43
  'th-uat': 'http://10.16.95.131:9100',
  // 'th-sit': 'http://thsit.fwdowb.net:9100', // 10.22.40.48
  'th-sit': 'http://10.22.40.48:9100/', // 10.22.40.48
  'jp-sit': 'http://jpsit.fwdowb.net:9100', // 10.22.28.132
  'jp-uat': 'http://10.22.171.52', // 10.22.61.1:9100
  'ph-sit': 'http://phsit.fwdowb.net:9100', // 10.22.60.4
  'ph-uat': 'http://10.22.171.113',
  'sit2.3': 'http://10.22.171.53',
  'hk-sit': 'http://hksit.fwdowb.net:9100', // 10.22.60.2
  'local-uat': 'http://10.22.171.127',
  'hk-uat': 'http://hkuat.fwdowb.net:9100', //10.22.60.1
  'pre-uat': 'http://10.22.61.2:9100', //10.22.60.1
  'nb-uat': 'http://10.22.171.46', //10.22.60.1
  'vn-uat': 'http://10.22.171.109/',
  sit: 'http://10.22.171.51',
  'id-busit': 'https://sit-owb.fwd.co.id',
  'ph-busit': 'https://owb-sit.apse1.phl.np-api.fwd.com/',
  'ph-nbuat': 'https://uat-owb.fwd.com.ph',
  operations: 'https://operations-workbench.fwd.com',
  'my-busit': 'http://operations-workbench.sit.my.intranet/',
  'my-uat': 'https://operations-workbench.uat.my.intranet/',
  'my-localUat': 'http://10.22.171.134/',
  'my-buuat': 'https://operations-workbench.uat.my.intranet/',
  'kh-uat': 'https://operations-workbench.uat.kh.intranet/',
  'kh-sit': 'https://operations-workbench.dev.kh.intranet/',
  nbidbuuat: 'http://owb-uat.id.intranet/',
  'vn-busit': 'https://10.154.130.10',
  'vn-buuat': 'https://uat-owb.fwd.com.vn',
  id_prod: 'https://owb.apse1.idn.api.fwd.com',
  ph_prod: 'https://owb.fwd.com.ph',
  id_uat: 'https://owb-uat.apse1.idn.np-api.fwd.com',
  'th-busit': 'http://opus.sit.th.intranet',
  'th-buuat': 'http://opus.uat.th.intranet',
  'ph-buuat': 'https://owb-uat.apse1.phl.np-api.fwd.com',
  'vn-prod': 'https://10.154.3.16',
  'my-fibsuat': 'http://opus-uat.my.intranet',
  'th-Opus': 'http://10.22.171.71',
  'my-prod': 'https://operations-workbench.my.intranet',
  poc: 'http://10.22.171.87',
  'MY-staging': 'http://10.151.157.248',
  'opus-th-staging': 'http://opus.staging.th.intranet',
  'th-prod': 'https://opus-gtf.internal.fwd.com',
  'opus-uat': 'https://opus-gtf-uat.internal.fwd.com',
  'jp-opus-prod': 'https://opus.fwd.com',
};

export default Object.keys(proxy).reduce(
  (data, item) => ({
    ...data,
    [`/${item}`]: {
      target: proxy[item],
      changeOrigin: true,
      secure: false,
      pathRewrite: { [`/${item}`]: '' },
      headers: {
        Referer: proxy[item],
      },
    },
  }),
  {}
);

/*
    target: 'http://10.22.28.131:9100', // CI
    target: 'http://10.22.28.133:9100', // DIT
    target: 'http://10.22.42.2:9100', // P-Sit
    target: 'http://10.22.42.1:9100', // Demo
    target: 'http://10.22.40.43:9100', // sit-jp
    target: 'http://10.22.40.48:9100', // sit-th
    target: 'http://10.22.28.132:9100', // demo-jp
    target: 'http://10.22.87.19:9100', // wing
    target: 'http://10.22.85.64:8080', // Johnny
    target: 'http://10.22.87.18:9100', // dirk
    target: 'http://10.22.87.45:8028', // Molly
    target: 'http://10.22.85.9:8018', // Mark
    target: 'http://10.22.87.14:8018', // jarvis
    target: 'http://10.22.87.36:8888', // Johnny
*/
