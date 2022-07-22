const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'CrawlerTools',
  namespace: '*.*',
  version: version,
  author: author,
  source: repository.url,
  icon: "https://www.valuesimplex.com/images/favicon.ico",
  'license': 'MIT',
  match: [
    '*://*/*'
  ],
  connect: '*',
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${dependencies.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
  ],
  grant: [
    'GM.xmlHttpRequest'
  ],
  'run-at': 'document-end'
}
