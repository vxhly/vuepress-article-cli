const inquirer = require('inquirer')
const pinyin = require('pinyin')
const fs = require('fs')

const VUPRESS_DIR = 'docs/.vuepress'
const is_vuepress_project = fs.existsSync(VUPRESS_DIR)
let author = ''

if (is_vuepress_project) {
  const {
    themeConfig
  } = require(process.cwd() + '/docs/.vuepress/config.js')
  author = themeConfig.author
}

const validate = (val, message = 'Required option.') => {
  if (val) {
    return true
  } else {
    return message
  }
}
const DOCS_VIEWS = 'docs/views'

const questions = [

  {
    name: 'title',
    type: 'input',
    message: `What's the title of your article?\n  (PS: Every article should have its title.)`,
    validate: val => validate(val, 'The title of the article is required.')
  },
  {
    name: 'author',
    type: 'input',
    default: author,
    message: `What's the author of your article?\n  (PS: The default is the author name you configured.)`
  },
  {
    name: 'categories',
    type: 'input',
    message: `What's the categories of your article?\n  (PS: There is only one categories for an article.)`,
    validate: val => validate(val, 'The categories of the article is required.')
  },
  {
    name: 'tags',
    type: 'input',
    message: `What's the tags of your article?\n  (PS: Space to separate your keywords.)`
  },
  {
    name: 'dateFormat',
    type: 'input',
    default: 'YYYY-MM-DD HH:mm:ss',
    message: `What's the format of your article creation time?\n  (PS: Support for time formatting strings in moment.)`
  },
  {
    name: 'filename',
    type: 'input',
    default: opt => {
      let {
        title
      } = opt
      if (/[\u4e00-\u9fa5]/.test(title)) {
        title = pinyin(title.trim().replace(/\s+/g, '-'), {
          style: pinyin.STYLE_NORMAL
        })
      }
      return title.toString().replace(/,/g, '')
    },
    validate: (val, opt) => {
      const articleFileName = `${DOCS_VIEWS}/${opt.categories}/${val}.md`
      const is_has_article = fs.existsSync(articleFileName)
      if (is_has_article) {
        return `The file ${articleFileName} already exists, change the name.`
      } else {
        return true
      }
    },
    message: `What's the filename of your article?\n  (PS: The default is your title.)`
  }

]

module.exports = function handleInquirer () {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(questions)
      .then((answers) => {
        resolve(answers)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
