#! /usr/bin/env node

const fs = require('fs')
const {
  version
} = require('../package.json')
const figlet = require('figlet')
const chalk = require('chalk')
const program = require('commander')

const VUPRESS_DIR = 'docs/.vuepress'

figlet(`va-cli\nV${version}`, function (err, data) {
  if (err) {
    console.log('Something went wrong...')
    console.dir(err)
    return
  }
  console.log(data)

  const is_vuepress_project = fs.existsSync(VUPRESS_DIR)

  if (is_vuepress_project) {
    program
      .version(version)
      .usage('[options]')
      .description('Run the command to create or delete articles for you.')
      .command('new', 'create an article.')
      .command('del', 'delete an article.')
      .command('tmp', 'create a template file for the article.')
      .parse(process.argv)
  } else {
    console.log(chalk.red('Sorry! Your project is not a vuepress project.'))
  }
})
