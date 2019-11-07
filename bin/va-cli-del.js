#! /usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const delArticleHandleInquirer = require('./inquirer/del-article-inquirer.js')

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

delArticle()
