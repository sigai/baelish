// ==UserScript==
// @name        CrawlerTools
// @namespace   *.*
// @version     0.0.4
// @author      fangtiansheng <fangtiansheng@gmail.com>
// @source      https://github.com/Trim21/webpack-userscript-template
// @icon        https://www.valuesimplex.com/images/favicon.ico
// @license     MIT
// @match       *://*/*
// @connect     *
// @require     https://cdn.jsdelivr.net/npm/jquery@^3.6.0/dist/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/axios@^0.27.2/dist/axios.min.js
// @require     https://cdn.jsdelivr.net/npm/axios-userscript-adapter@^0.2.0/dist/axiosGmxhrAdapter.min.js
// @grant       GM.xmlHttpRequest
// @run-at      document-end
// ==/UserScript==


/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./package.json":
/***/ ((module) => {

module.exports = JSON.parse('{"name":"webpack-userscript-template","description":"Build your UserScript with webpack","version":"0.0.4","author":{"name":"fangtiansheng","email":"fangtiansheng@gmail.com"},"scripts":{"postversion":"git push --follow-tags","analize":"npm_config_report=true npm run build","build":"webpack --mode production --config config/webpack.config.production.cjs","dev":"webpack --mode development --config config/webpack.config.dev.cjs"},"repository":{"type":"git","url":"https://github.com/Trim21/webpack-userscript-template"},"private":true,"dependencies":{"@trim21/gm-fetch":"^0.0.3","axios":"^0.27.2","axios-userscript-adapter":"^0.2.0","jquery":"^3.6.0"},"devDependencies":{"@babel/core":"^7.18.5","@babel/preset-env":"^7.18.2","@babel/preset-typescript":"^7.17.12","@types/greasemonkey":"^4.0.3","@types/jquery":"^3.5.14","babel-loader":"^8.2.5","browserslist":"^4.20.4","css-loader":"^6.7.1","less":"^4.1.3","less-loader":"^11.0.0","style-loader":"^3.3.1","typescript":"^4.7.4","userscript-metadata-webpack-plugin":"^0.1.1","webpack":"^5.73.0","webpack-bundle-analyzer":"^4.5.0","webpack-cli":"^4.10.0","webpack-livereload-plugin":"^3.0.2","webpack-merge":"^5.8.0"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = axios;
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: external "axiosGmxhrAdapter"
const external_axiosGmxhrAdapter_namespaceObject = axiosGmxhrAdapter;
var external_axiosGmxhrAdapter_default = /*#__PURE__*/__webpack_require__.n(external_axiosGmxhrAdapter_namespaceObject);
;// CONCATENATED MODULE: ./src/utils.ts


function get(url, config) {
  return external_axios_default().get(url, {
    adapter: (external_axiosGmxhrAdapter_default()),
    ...config
  });
}
function post(url, data, config) {
  return axios.post(url, data, {
    adapter,
    ...config
  });
}
;// CONCATENATED MODULE: ./src/index.ts


const {
  version
} = __webpack_require__("./package.json");

const interval = 1000 * 20;

async function init() {
  console.log(`%c 泛采系统专业版插件 %c v${version} %c`, "background:#5D5D5D ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff", "background:#0D7FBF ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff", "background:transparent");
}

async function robots() {
  const _title = window.document.title;
  const res = await get("/robots.txt", {});

  if (res.status === 200) {
    console.log(`🔔发现网站有robots.txt文件: ${res.request.responseURL}`);
    window.document.title = "🤖" + _title;
  }
}

async function sitemap() {
  const res = await get("/sitemap.xml", {});

  if (res.status === 200) {
    console.log(`🔔发现网站有sitemap.xml文件: ${res.request.responseURL}`);
    window.document.title = "🌎" + window.document.title;
  }
}

async function show() {
  // confluence一直显示创建页面按钮
  console.log("🔔confluence: 显示创建页面按钮");
  document.getElementsByClassName("aui-header-primary")[0].getElementsByClassName("aui-nav")[0].style.width = "auto";
}

async function ping() {
  const res = await get("/crawl/crawl/get-user-list", {});

  if (res.status === 200) {
    const heads = Array.from(document.getElementsByClassName("head"));
    heads.forEach(head => {
      head.style.backgroundColor = "";
      window.document.title = "爬虫管理系统";
    });
  }
}

async function src_close() {
  // ESC关闭置顶弹出窗
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      console.log("esc 按了"); //全部弹窗

      var popups = document.getElementsByClassName("popup_hover");

      for (let i = popups.length; i--;) {
        //遍历全部弹窗
        if (popups[i].style.display === "") {
          //查找弹出的窗口
          let icon_close = popups[i].getElementsByClassName("popup_head_close_icon");
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
  window.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "s") {
      // Prevent the Save dialog to open
      e.preventDefault(); // Place your code here

      var button = document.getElementsByClassName("pageDetail_toolBox_item")[0] || document.getElementsByClassName("planDetail_toolBox_item")[0];
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

  if (document.getElementsByName("PubDate").length || document.getElementsByName("pubdate").length) {
    console.log('.//*[translate(@name, "PUBDATE", "pubdate")="pubdate"]/@content');
  }

  if (document.getElementsByName("ColumnName").length) {
    console.log('.//*[translate(@name, "COLUMNNAME", "columnname")="columnname"]/@content');
  }

  if (document.getElementsByName("ContentSource").length || document.getElementsByName("contentSource").length) {
    console.log('.//*[translate(@name, "CONTENTSOURCE", "contentsource")="contentsource"]/@content');
  }

  if (document.getElementsByName("Author").length || document.getElementsByName("author").length) {
    console.log('.//*[translate(@name, "AUTHOR", "author")="author"]/@content');
  }

  if (document.getElementsByName("Keywords").length || document.getElementsByName("keywords").length) {
    console.log('.//*[translate(@name, "KEYWORDS", "keywords")="keywords"]/@content');
  } // Wordpress站点发布日期meta标签检测


  let meta_pubdate = document.querySelectorAll('meta[content^="202"]');

  if (meta_pubdate.length > 0) {
    meta_pubdate.forEach(function (each, i) {
      i += 1;
      console.log("带有时间格式的meta标签" + i + ":", each);

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

class Ping {
  check() {
    setTimeout(() => {
      ping().catch(e => {
        const heads = Array.from(document.getElementsByClassName("head"));
        heads.forEach(head => {
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
  if (location.hostname.startsWith("confluence")) {
    await show();
  } else {
    if (window.document.location.href.endsWith("#/home/crawl")) {
      await init();
      await src_close();
      await save();
      let app = new Ping();
      app.check();
    } else {
      await robots().catch(e => `🔔未发现网站有robots.txt文件`);
      await sitemap().catch(e => `🔔未发现网站有sitemap.xml文件`);
      await check_meta_tags().catch(e => e);
    }
  }
}

main().catch(e => {
  console.log(e);
});
})();

/******/ })()
;