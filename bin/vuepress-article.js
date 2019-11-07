#! /usr/bin/env node

const fs = require('fs')
const {
  version
} = require('../package.json')
const figlet = require('figlet')
const chalk = require('chalk')
const program = require('commander')
const newArticleHandleInquirer = require('./new-article-inquirer.js')
const delArticleHandleInquirer = require('./del-article-inquirer.js')
const initRDTmpHandleInquirer = require('./init-mdtmp-inquirer.js')

const copyFile = require('./file.js')
const mkdirs = require('./mkdirs.js')

const VUPRESS_DIR = 'docs/.vuepress'
const TMP_DIR = '.mdtmp'
const TMP_FILE_NAME = 'article_tmp.md'
const TMP_FILE = `${TMP_DIR}/${TMP_FILE_NAME}`
const DOCS_VIEWS = 'docs/views'

figlet(`va-cli\nV${version}`, function (err, data) {
  if (err) {
    console.log('Something went wrong...')
    console.dir(err)
    return
  }
  console.log(data)
  console.log(chalk.yellow('Run the command `va-cli help` to get help'))

  const is_vuepress_project = fs.existsSync(VUPRESS_DIR)

  if (is_vuepress_project) {
    program
      .version(version)
      .usage('[options]')
      .description('Run the command to create or delete articles for you.')
      .option('-n, new', 'create an article.')
      .option('-d, del', 'delete an article.')
      .option('-t, tmp', 'create a template file for the article.')
      .parse(process.argv)

    if (program.new) {
      const is_RD_tmp = fs.existsSync(TMP_FILE)
      if (!is_RD_tmp) {
        console.log(chalk.red('Sorry, there is no template file under your directory.'))
        console.log(chalk.red('The CLI tool will continue to the next step using the default template file.'))
        console.log(chalk.yellow('You can create a template file with the command `va-cli tmp`.'))
        initArticle()
      } else {
        initArticle()
      }
    }

    if (program.tmp) {
      initRDTmp()
    }

    if (program.del) {
      delArticle()
    }
  } else {
    console.log(chalk.red('Sorry! Your project is not a vuepress project.'))
  }

})

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
        copyFile(__dirname + '/', `docs/views/${newCategories}`, 'article_tmp.md', `${_filename}.md`, choices)
      } else {
        mkdirs(`docs/views/${newCategories}`, () => {
          copyFile(__dirname + '/', `docs/views/${newCategories}`, 'article_tmp.md', `${_filename}.md`, choices)
        })
      }
    })
}

const delArticle = () => {
  delArticleHandleInquirer()
    .then((choices) => {
      const {
        delFiles,
        isDel
      } = choices

      if (isDel) {
        delFiles.map(item => {
          fs.unlink(item, err => {
            if (err) {
              console.log(chalk.gray(err))
            } else {
              console.log(chalk.green(`Delete file ${item} successfully.`))
            }
          })
        })
      } else {
        console.log(chalk.gray('Cancel the deletion for you.'))
      }

    })
}

const initRDTmp = () => {
  const is_RD_tmp = fs.existsSync(TMP_FILE)
  if (!is_RD_tmp) {
    return new Promise((resolve, reject) => {
      initRDTmpHandleInquirer()
        .then((choices) => {
          const {
            isInitMdTmp
          } = choices
          if (isInitMdTmp) {
            mkdirs(TMP_DIR, () => {
              copyFile(__dirname + '/', TMP_DIR, TMP_FILE_NAME)
            })
          } else {
            console.log('You have to create the template file manually, and the cli tool will do the next step for you.')
          }
        })
        .catch(() => {
          reject()
        })
    })
  } else {
    copyFile(__dirname + '/', TMP_DIR, TMP_FILE_NAME)
  }
}
