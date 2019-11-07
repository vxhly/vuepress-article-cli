#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const mkdirs = require('./utils/mkdirs.js')
const copyFile = require('./utils/file.js')
const chalk = require('chalk')
const pinyin = require('pinyin')
const newArticleHandleInquirer = require('./inquirer/new-article-inquirer.js')

const TMP_DIR = '.mdtmp'
const TMP_FILE_NAME = 'article_tmp.md'
const TMP_FILE = `${TMP_DIR}/${TMP_FILE_NAME}`
const DOCS_VIEWS = 'docs/views'

const initArticle = () => {
  newArticleHandleInquirer()
    .then((choices) => {
      const {
        categories,
        filename
      } = choices
      const newCategories = categories.trim().replace(/\s/g, '-')
      const is_categories = fs.existsSync(`${DOCS_VIEWS}/${newCategories}`)

      let _filename

      if (/[\u4e00-\u9fa5]/.test(filename)) {
        _filename = pinyin(filename.trim().replace(/\s+/g, '-'), {
          style: pinyin.STYLE_NORMAL
        })
      } else {
        _filename = filename
      }

      if (is_categories) {
        copyFile(path.join(__dirname, '/tmp'), `docs/views/${newCategories}`, 'article_tmp.md', `${_filename}.md`, choices)
      } else {
        mkdirs(`docs/views/${newCategories}`, () => {
          copyFile(path.join(__dirname, '/tmp'), `docs/views/${newCategories}`, 'article_tmp.md', `${_filename}.md`, choices)
        })
      }
    })
}

const is_RD_tmp = fs.existsSync(TMP_FILE)
if (!is_RD_tmp) {
  console.log(chalk.red('Sorry, there is no template file under your directory.'))
  console.log(chalk.red('The CLI tool will continue to the next step using the default template file.'))
  console.log(chalk.yellow('You can create a template file with the command `va-cli tmp`.'))
  initArticle()
} else {
  initArticle()
}
