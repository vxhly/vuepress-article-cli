const inquirer = require('inquirer')
const find = require('find')

const DOCS_VIEWS = 'docs/views'

const validate = (val, message = 'Required option.') => {
  if (val) {
    return true
  } else {
    return message
  }
}

const questions = [

  {
    name: 'filename',
    type: 'input',
    message: `What file do you want to delete?\n  (PS: Enter the file name keyword you want to delete.)`,
    validate: val => validate(val, 'The title of the article is required.')
  },
  {
    name: 'delFiles',
    type: 'checkbox',
    pageSize: 10,
    choices: (val) => {
      const reg = new RegExp(val.filename, 'ig')
      let files = find.fileSync(reg, DOCS_VIEWS)
      files = files.filter(item => {
        const filename = item.substring(item.lastIndexOf('\/') + 1, item.length)
        const reg = new RegExp(val.filename, 'ig')
        return reg.test(filename)
      })
      return files
    },
    message: `Do you want to delete those files?\n  (PS: This is an unrecoverable operation, choose carefully.)`
  },
  {
    name: 'isDel',
    type: 'confirm',
    default: false,
    message: `Do you really want to delete these files?\n (PS: Please confirm it last time.)`
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
