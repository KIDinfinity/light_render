const puppeteer = require('puppeteer');
const Service = require('egg').Service;

class PDFService extends Service {
  // @ts-ignore
  config = {
    headless: true,
    args: [
      '--no-sandbox',
      '--enable-font-antialiasing',
      '--disable-font-subpixel-positioning',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-zygote',
    ],
  };

  /**
   * 根据url生成PDF
   */
  async buildPdfByUrl(url) {
    // 启动无头浏览器
    const browser = await puppeteer.launch(this.config);
    try {
      // new一个Tab
      const page = await browser.newPage();
      // 设置窗口大小
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      // 跳转页面
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 0,
      });
      // 返回PDF Buffer
      const pdfBuffer = await page.pdf({
        // headerTemplate,
        // footerTemplate,
        margin: {
          top: 50,
          bottom: 50,
          left: 0,
          right: 0,
        },
        displayHeaderFooter: false,
        printBackground: true,
      });
      this.ctx.logger.info('pdfBuffer');
      return pdfBuffer;
    } catch (e) {
      throw e;
    } finally {
      browser.close();
    }
  }

  /**
   * 根据html content生成PDF
   */
  async buildPdfByContent(content) {

    // 启动无头浏览器
    const browser = await puppeteer.launch(this.config);
    try {
      // new一个Tab
      const page = await browser.newPage();
      page.on('console',msg=>console.log('PAGE LOG',msg.text()));
      await page.evaluate(()=>{
        const computedFont = window.getComputedStyle(document.body).fontFamily;
        console.log("document.body使用的字体",computedFont)
      })
      // 设置窗口大小
      await page.setViewport({
        width: 1920,
        height: 1080,
      });

      const transBase64 = require('../utils/transBase64')?.transBase64;
      console.log("transBase64___",transBase64)
      const path = require('path');
      const appRoot = path.resolve(__dirname, '../../');
      const fonts = [
        { path: path.resolve(appRoot, 'app/public/fonts/FWDCircularTT-Book.ttf'), name: 'FWD Circular TT Book' },
        { path: path.resolve(appRoot, 'app/public/fonts/FWDCircularTT-Bold.ttf'), name: 'FWD Circular TT Bold' },
      ];
      // await page.addScriptTag({ path: path.resolve(appRoot, 'app/public/plugins/paged.js') });
      let cssOutput = '';
      fonts.forEach(font => {
        cssOutput += transBase64(font.path, font.name);
      });
      const fontStyle = `<style>${cssOutput} body { font-family: 'FWD Circular TT Book' ; }</style>`;
      //------------------------------------------------------------------------
      const pagedJsUrl = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
      const finalContent = content.replace(/<head>/i, `<head>${fontStyle}`)



      // 设置内容
      await page.setContent(finalContent,{ waitUntil: 'load' });
      await page.addScriptTag({ url: pagedJsUrl });
    

  await page.evaluate(() => {
    const template = document.querySelector('template[data-ref="pagedjs-content"]');
    if (template) {
      const clone = template.content.cloneNode(true);
      document.body.appendChild(clone);
    }

  // 显式启动分页
  if (window.PagedPolyfill) {
    window.PagedPolyfill.preview();
  }

  });

  await page.evaluate(() => {
    console.log("test____")
    console.log("=====================")
    console.log(document.body.innerHTML)
    console.log("=====================")
    return new Promise((resolve) => {
      document.addEventListener('pagedjs:rendered', () => {
        resolve();
      });
    });
  });


      // 返回PDF Buffer
      const pdfBuffer = await page.pdf({
        headerTemplate,
        // footerTemplate,
        margin: {
          top: 50,
          bottom: 50,
          left: 0,
          right: 0,
        },
        displayHeaderFooter: false,
        printBackground: true,
      });
      this.ctx.logger.info('pdfBuffer');
      return pdfBuffer;
    } catch (e) {
      console.log("")
      throw e;
    } finally {
      browser.close();
    }
  }
}

module.exports = PDFService;
