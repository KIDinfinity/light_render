export default async (file: any) => {
  return await new Promise((resolve) => {
    try {
      if (typeof file === 'string' || file === undefined) {
        resolve(file);
        return;
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: any) => {
        const imageData = e?.target.result.replace(/data:(.*?);base64,/, "")
        resolve(imageData);
      };
    } catch (err) {
      console.log('err', err);
    }
  });
};
