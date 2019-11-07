const inquirer = require('inquirer')

const questions = [

  {
    name: 'isInitMdTmp',
    type: 'confirm',
    default: true,
    message: `Do you need a cli tool to automatically create a template file for you?`
  }

]

module.exports = function handleInquirer() {
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
