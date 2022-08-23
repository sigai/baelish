import { get } from "./utils";
const { version } = require("../package.json");

const interval = 1000 * 20;
const GMMenus = [
  {
    name: '配置项',
    fn: log,
    accessKey: 'o'
  }
];
async function log() {
  alert("配置项")
}
async function init() {
  console.log(
    `%c 泛采系统专业版插件 %c v${version} %c`,
    "background:#5D5D5D ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#0D7FBF ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent"
  );
}

async function robots() {
  const _title = window.document.title;
  const res = await get<{ robots: string }>("/robots.txt", {});
  if (res.status === 200) {
    console.log(`🔔发现网站有robots.txt文件: ${res.request.responseURL}`);
    window.document.title = "🤖" + _title;
  }
}

async function sitemap() {
  const res = await get<{ sitemap: string }>("/sitemap.xml", {});
  if (res.status === 200) {
    console.log(`🔔发现网站有sitemap.xml文件: ${res.request.responseURL}`);
    window.document.title = "🌎" + window.document.title;
  }
}

async function show() {
  // confluence一直显示创建页面按钮
  console.log("🔔confluence: 显示创建页面按钮");
  document
    .getElementsByClassName("aui-header-primary")[0]
    .getElementsByClassName("aui-nav")[0].style.width = "auto";
}

async function ping() {
  const res = await get<{ ping: string }>("/crawl/crawl/get-user-list", {});
  if (res.status === 200) {
    const heads = Array.from(document.getElementsByClassName("head"));
    heads.forEach((head) => {
      head.style.backgroundColor = "";
      window.document.title = "爬虫管理系统";
    });
  }
}

async function close() {
  // ESC关闭置顶弹出窗
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      console.log("esc 按了");
      //全部弹窗
      var popups = document.getElementsByClassName("popup_hover");
      for (let i = popups.length; i--; ) {
        //遍历全部弹窗
        if (popups[i].style.display === "") {
          //查找弹出的窗口
          let icon_close = popups[i].getElementsByClassName(
            "popup_head_close_icon"
          );
          icon_close[0].click();
          break;
        }
      }
    }
  });
  console.log("🔔baelish: ESC绑定成功");
}

async function save() {
  //保存
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s") {
      // Prevent the Save dialog to open
      e.preventDefault();
      // Place your code here
      var button =
        document.getElementsByClassName("pageDetail_toolBox_item")[0] ||
        document.getElementsByClassName("planDetail_toolBox_item")[0];
      button.getElementsByTagName("button")[0].click();
    }
  });
  console.log("🔔baelish: CTL+s绑定成功");
}

async function check_meta_tags() {
  //检测meta标签
  let title = window.document.title;
  if (document.getElementsByName("ArticleTitle").length) {
    console.log('.//*[@name="ArticleTitle"]/@content');
    window.document.title = "❤️" + window.document.title;
    setInterval(function () {
      if (window.document.title.startsWith("❤️")) {
        window.document.title = "🇨🇳" + title;
      } else {
        window.document.title = "❤️" + title;
      }
    }, 600);
  }
  if (
    document.getElementsByName("PubDate").length ||
    document.getElementsByName("pubdate").length
  ) {
    console.log(
      './/*[translate(@name, "PUBDATE", "pubdate")="pubdate" and contains(@content, "20")]/@content'
    );
  }
  if (document.getElementsByName("ColumnName").length) {
    console.log(
      './/*[translate(@name, "COLUMNNAME", "columnname")="columnname"]/@content'
    );
  }
  if (
    document.getElementsByName("ContentSource").length ||
    document.getElementsByName("contentSource").length
  ) {
    console.log(
      './/*[translate(@name, "CONTENTSOURCE", "contentsource")="contentsource"]/@content'
    );
  }
  if (
    document.getElementsByName("Author").length ||
    document.getElementsByName("author").length
    ) {
    console.log(
      './/*[translate(@name, "AUTHOR", "author")="author"]/@content'
    );
  }
  if (
    document.getElementsByName("Keywords").length ||
    document.getElementsByName("keywords").length
    ) {
    console.log(
      './/*[translate(@name, "KEYWORDS", "keywords")="keywords"]/@content'
    );
  }
  // Wordpress站点发布日期meta标签检测
  let meta_pubdate = document.querySelectorAll('meta[content^="202"]');
  if (meta_pubdate.length > 0) {
    meta_pubdate.forEach(function (each, i) {
      i += 1;
      console.log("带有时间格式的meta标签" + i  + ":", each);
      if (each.property && each.property.startsWith("article:")) {
        window.document.title = "💚" + window.document.title;
        setInterval(function () {
          if (window.document.title.startsWith("💚")) {
            window.document.title = "🇺🇸" + title;
          } else {
            window.document.title = "💚" + title;
          }
        }, 600);
        console.log('.//*[contains(@property, "article:published")]/@content');
      }
    });
  }
}

async function auto_refesh() {
  setInterval(function () {
    let refresh_button = document.getElementsByClassName("is-circle")[0];
    if (!refresh_button){return}
    console.log("🔔auto_refesh: 刷新按钮1", refresh_button);
    if (document.getElementsByClassName("auto_refresh_button").length > 0){return}
    console.log("🔔auto_refesh: 刷新按钮2", refresh_button);

    var b = document.createElement("button")
    b.textContent = "自动"
    b.classList.add("auto_refresh_button")
    b.classList.add("el-button")
    b.classList.add("el-button--success")
    b.classList.add("el-button--mini")

    b.onclick = function () {
        var timer = setInterval(function(){
          document.getElementsByClassName("el-icon-refresh")[0].click()
        }, 1000*5)
        b.id = timer
        b.textContent = "停止"
        b.classList.remove("el-button--success")
        b.classList.add("el-button--warning")
        b.onclick = function(){
            clearInterval(b.id)
            b.remove()
        }
    }

    refresh_button.after(b)

  }, 1000);
  console.log("🔔baelish: 自动刷新绑定成功")
}
class Ping {
  check() {
    setTimeout(() => {
      ping().catch((e) => {
        const heads = Array.from(document.getElementsByClassName("head"));
        heads.forEach((head) => {
          head.style.backgroundColor = "gray";
          window.document.title = "🔥后台服务异常🔥";
        });
        console.error(e);
      });
      this.check();
    }, interval);
  }
}

async function main() {
  GMMenus.forEach(m => {
    GM.registerMenuCommand(m.name, m.fn, m.accessKey);
  });
  if (location.hostname.startsWith("confluence")) {
    await show();
  } else {
    if (window.document.location.href.endsWith("#/home/crawl")) {
      await init();
      await close();
      await save();
      let app = new Ping();
      app.check();
      await auto_refesh().catch((e) => e);
    } else {
      await robots().catch((e) => `🔔未发现网站有robots.txt文件`);
      await sitemap().catch((e) => `🔔未发现网站有sitemap.xml文件`);
      await check_meta_tags().catch((e) => e);
    }
  }
}

main().catch((e) => {
  console.log(e);
});
