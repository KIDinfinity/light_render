/**
 * 压缩图片文件
 * @param file 原始图片 File
 * @param quality 压缩质量(0-1)，默认0.7
 * @param maxWidth 最大宽度，默认不缩放
 * @returns Promise<File>
 */
export function compressImageFile(file: File, quality: number, maxWidth?: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (maxWidth && width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context error'));
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Compression failed'));
            const compressedFile = new File([blob], file.name, { type: file.type });
            resolve(compressedFile);
          },
          file.type,
          quality || 0.7
        );
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
