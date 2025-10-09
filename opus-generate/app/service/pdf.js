const puppeteer = require('puppeteer');
const Service = require('egg').Service;
const cheerio = require('cheerio');
const he = require('he');

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
      //方案一：动态获取（需要运维配合把服务器主机域名ip配置到FONT_BASE_URL环境变量）----
      // const baseUrl = process.env.FONT_BASE_URL || 'http://localhost:7001';
      // console.log("baseUrl____",baseUrl)
      // const fontUrl = `${baseUrl}/public/fonts/FWDCircularTT-Book.ttf`;
      // const boldFontUrl = `${baseUrl}/public/fonts/FWDCircularTT-Bold.ttf`;

      // const fontStyle = `
      //   <style>
      //     @font-face {
      //       font-family: 'FWD Circular TT Book';
      //       src: url('${fontUrl}') format('truetype');
      //     }
      //     @font-face {
      //       font-family: 'FWD Circular TT Bold';
      //       src: url('${boldFontUrl}') format('truetype');
      //     }
      //     body {
      //       font-family: 'FWD Circular TT Book' !important;
      //     }
      //   </style>
      // `;
      //------------------------------------------------------------------------
      // 方案二：把字体文件转成base64字符串嵌入到style中（缺点是字体文件较大时会导致html内容过大，影响性能）----
      const transBase64 = require('../utils/transBase64')?.transBase64;
      console.log("transBase64___",transBase64)
      const path = require('path');
      const appRoot = path.resolve(__dirname, '../../');
      const fonts = [
        { path: path.resolve(appRoot, 'app/public/fonts/FWDCircularTT-Book.ttf'), name: 'FWD Circular TT Book' },
        { path: path.resolve(appRoot, 'app/public/fonts/FWDCircularTT-Bold.ttf'), name: 'FWD Circular TT Bold' },
      ];

      let cssOutput = '';
      fonts.forEach(font => {
        cssOutput += transBase64(font.path, font.name);
      });
      const fontStyle = `<style>${cssOutput} body { font-family: 'FWD Circular TT Book' ; }</style>`;
      //------------------------------------------------------------------------
      const finalContent = content.replace(/<head>/i, `<head>${fontStyle}`)


    const $ = cheerio.load(content);

    let rawHtml = $('#headerComponent').html();
    // let headerTemplate = he.decode(rawHtml); // 反转义

    const headerTemplate = `
      <style>
        .pdf-header {
          font-size: 12px;
          color: #333;
          width: 100%;
          text-align: center;
          padding: 10px 0;
        }
      </style>
      <div class="pdf-header">testHeader</div>
    `;
    console.log("-=-=-=-=-=-=")
    console.log(headerTemplate)
    console.log("-=-=-=-=-=-=")
    console.log("============")
    console.log($)
    console.log("=============")
      const footerTemplate = "<div>testFooter</div>"
      // 设置内容
      await page.setContent(finalContent);
      // 返回PDF Buffer
      const pdfBuffer = await page.pdf({
        headerTemplate,
        footerTemplate,
        margin: {
          top: 50,
          bottom: 50,
          left: 0,
          right: 0,
        },
        displayHeaderFooter: true,
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
