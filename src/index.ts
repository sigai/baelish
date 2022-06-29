import { get } from './utils'
import './style/main.less'
import { add } from './example'
const { version } = require('../package.json')

const interval = 1000 * 20;

async function init () {
  console.log(
    `%c 泛采系统专业版插件 %c v${version} %c`,
    "background:#5D5D5D ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#0D7FBF ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent"
  );
}

async function robots() {
  const _title = window.document.title
  const res = await get<{ robots: string }>( '/robots.txt',{})
  if (res.status === 200) {
    console.log(`🔔发现网站有robots.txt文件：${res.request.responseURL}`)
    window.document.title = "🤖" + _title
  } else {
    console.log(`🔔未发现网站有robots.txt文件`)
  }
}

async function ping() {
  const res = await get<{ ping: string }>( '/crawl/crawl/get-user-list',{})

  const heads = Array.from(
    document.getElementsByClassName("head")
  )
  heads.forEach(head => {
    head.style.backgroundColor = "none"
    window.document.title = "爬虫管理系统";
  });
}


class Ping {
  check() {
    setTimeout(() => {
      ping().catch(e => {
        const heads = Array.from(
          document.getElementsByClassName("head")
        )
        heads.forEach(head => {
          head.style.backgroundColor = "gray"
          window.document.title = "🔥后台服务异常🔥"
        });
        console.error(e)
      })
      this.check()
    }, interval)
  }
}


async function main () {
  await init()
  await robots().catch(e => console.error(e))
}

main().catch((e) => {
  console.log(e)
})

let app = new Ping()
app.check()