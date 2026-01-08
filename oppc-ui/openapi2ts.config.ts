const requestLibPath = "import { request } from '@umijs/max'";



export default [
  {
    schemaPath: 'http://10.22.168.104:8561/api/integration/v3/api-docs',
    serversPath: './src/servers/integration',
    requestLibPath: requestLibPath,
  },
  {
    schemaPath: 'http://10.22.171.36:8858/api/autoRule/v3/api-docs',
    serversPath: './src/servers/autoRule',
    requestLibPath: requestLibPath,
  },
  {
    schemaPath: 'http://10.22.171.38:8222/v3/api-docs',
    serversPath: './src/servers/claimCenter',
    requestLibPath: requestLibPath,
  },
  {
    schemaPath: 'http://10.22.171.25:8020/api/registration/v3/api-docs',
    serversPath: './src/servers/registration',
    requestLibPath: requestLibPath,
  },
  {
    schemaPath: 'http://10.22.171.24:8888/api/bpm/v3/api-docs',
    serversPath: './src/servers/bpm',
    requestLibPath: requestLibPath,
  },
  {
     schemaPath: 'http://10.22.171.30:9527/api/evy/v3/api-docs',
    serversPath: './src/servers/evy',
    requestLibPath: requestLibPath,
  },
    {
     schemaPath: 'http://10.22.171.22:8016/api/misc/v3/api-docs',
    serversPath: './src/servers/misc',
    requestLibPath: requestLibPath,
  },
    {
     schemaPath: 'http://10.22.171.43:8018/api/misc/v3/api-docs',
    serversPath: './src/servers/misc',
    requestLibPath: requestLibPath,
  },
    {
     schemaPath: 'http://10.22.171.160:9666/api/pc/v3/api-docs',
    serversPath: './src/servers/pc',
    requestLibPath: requestLibPath,
  },
    {
     schemaPath: 'http://10.22.171.29:8111/api/rbac2/v3/api-docs',
    serversPath: './src/servers/rbac2',
    requestLibPath: requestLibPath,
  },
    {
     schemaPath: 'http://10.22.171.33:8085/api/uc/v3/api-docs',
    serversPath: './src/servers/uc',
    requestLibPath: requestLibPath,
  },

]