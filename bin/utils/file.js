const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment')

function readFile (path, filename, func) {
  fs.readFile(path + '/' + filename, 'utf-8', function (err, data) {
    if (err) {
      console.log(chalk.red(`Failed to read file ${filename}.`))
    } else {
      func(data)
    }
  })
}

function writeFile (path, data, filename) {
  fs.writeFile(path + '/' + filename.split('.')[0] + '.' + filename.split('.')[1], data, function (error) {
    if (error) {
      throw error
    } else {
      console.log(chalk.green(`The file ${path}/${filename} was created successfully.`))
    }
  })
}

function tmpReplace (data, replaceOption) {
  const {
    title,
    author,
    categories,
    tags,
    dateFormat
  } = replaceOption
  const toArrayString = (val) => {
    let tmp = val.trim().split(' ')
    tmp = tmp.filter(item => item)
    tmp = Array.from(new Set(tmp))
    return `[${tmp.toString().replace(/,/g, ', ')}]`
  }

  data = data.replace(/{title}/ig, title)
  data = data.replace(/{author}/ig, author)
  data = data.replace(/{categories}/ig, `[${categories.trim().replace(/\s+/g, '-')}]`)
  data = data.replace(/{tags}/ig, toArrayString(tags))
  data = data.replace(/{date}/ig, moment().format(dateFormat))

  return data
}

module.exports = function copyFile (resPath, desPath, filename, desFileName, replaceOption) {
  readFile(resPath, filename, function (data) {
    writeFile(desPath, replaceOption ? tmpReplace(data, replaceOption) : data, desFileName || filename)
  })
}
