/* eslint-disable */
import * as fs from 'node:fs';
import superagent from "superagent";
import cheerio from "cheerio";
import chalk from "chalk";
import { exec } from "child_process";

const returnErr = (err) => {
  console.log(
    chalk.yellow("请求失败:可能是当前网络连接中断或者无法连接至jira服务器！")
  );
  return console.log(err);
};

(async () => {
  const cmd = "git rev-parse --abbrev-ref HEAD";
  return console.log(chalk.blue(">正在获取当前分支名..."));
  exec(cmd, async (error, stdout) => {
    if (error) {
      console.log(error.stack);
      console.log("Error code: " + error.code);
      console.log("Signal received: " + error.signal);
    }
    // 分支名按照规范应为 feature/VENUSXX-XXXX_name_xxxxx
    const reg = /\/(.)+-[0-9]+/g;
    const branch = stdout.match(reg);
    if (!branch)
      return console.log(
        chalk.yellow(">无效的分支名！将无法更新到最新版本号！")
      );
    console.log(chalk.blue(">获取当前分支名成功，正在获取对应jira的版本号..."));
    superagent.get("http://10.22.25.95:8080/login.jsp").end((err, res) => {
      if (!res) {
        return returnErr(err);
      }
      const cookie = res.header["set-cookie"];
      const cookieAtlassian = cookie[0].split(";")[0];
      const cookieJsessionId = cookie[1].split(";")[0];
      superagent
        .post("http://10.22.25.95:8080/login.jsp")
        .type("form")
        .set("Cookie", `${cookieAtlassian}; ${cookieJsessionId}`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          os_username: "xuwek.ext",
          os_password: "Fwd123456 ",
          os_destination: "",
          user_role: "",
          atl_token: "",
          login: "登录",
        })
        .redirects(0)
        .end(function (err1, res1) {
          if (!res1) {
            return returnErr(err1);
          }

          if(!res1.header["set-cookie"]){
            console.log(chalk.yellow(">登录失败！正在跳过获取最新版本号！"));
            console.log(chalk.blue(">build..."));
            return ;
          }

          const newJsessionId = res1.header["set-cookie"][0].split(";")[0];
          superagent
            .get(`http://10.22.25.95:8080/browse${branch}`)
            .set("Cookie", `${cookieAtlassian}; ${newJsessionId}`)
            .end(function (err2, res2) {
              if (!res2) {
                return returnErr(err2);
              }
              const $ = cheerio.load(res2.text);
              const version = $("#fixfor-val")
                .text()
                .trim()
                .toLocaleUpperCase();
              if (version.includes("无")) {
                return console.log(
                  chalk.yellow(">当前分支对应jira的版本号不存在！")
                );
              }
              console.log(
                chalk.blue(
                  ">获取对应jira的版本号成功，正在更新到本地packjson中..."
                )
              );
              let pack = fs.readFileSync("./config/version.json");
              // @ts-ignore
              pack = JSON.parse(pack);
              if (pack.version !== version) {
                pack.version = version;
                fs.writeFileSync(
                  "./config/version.json",
                  JSON.stringify(pack, null, 2)
                );
              }
              // @ts-ignore
              console.log(chalk.blue(">更新成功！"));
            });
        });
    });
  });
})();
