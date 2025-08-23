export default {

  method: 'POST',
  url: 'workspace/getEnvProfile',
  status: 200,
  data: {
    body: {
      "success": true,
      "type": null,
      "resultData": {
        "authURL": "http://localhost:8000/Authen.ashx",
        "activeProfile": "sithk",
        "enableSSO": true
      }
    }

  }
}
