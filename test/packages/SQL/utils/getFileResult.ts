const getFileResult = (file: File, type: string = 'buffer') => {
  return new Promise((res) => {
    const fileReader = new FileReader()
    /* fileReader.readAsArrayBuffer() // 转成buffer格式数据
      fileReader.readAsBinaryString() // 转成二进制格式数据
      fileReader.readAsDataURL() // 转成base64格式数据
    */
    switch (type) {
      case 'base64':
        fileReader.readAsDataURL(file)
        break
      case 'buffer':
        fileReader.readAsArrayBuffer(file)
        break
      case 'binary':
        fileReader.readAsBinaryString(file)
        break
      default:
        break
    }
    fileReader.onload = (e) => {
      res(e.target?.result)
    }
  })
}

export default getFileResult;
