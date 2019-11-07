#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const mkdirs = require('./utils/mkdirs.js')
const copyFile = require('./utils/file.js')

const TMP_DIR = '.mdtmp'
const TMP_FILE_NAME = 'article_tmp.md'
const TMP_FILE = `${TMP_DIR}/${TMP_FILE_NAME}`

const initRDTmp = () => {
  const is_RD_tmp = fs.existsSync(TMP_FILE)
  if (!is_RD_tmp) {
    mkdirs(TMP_DIR, () => {
      copyFile(path.join(__dirname, '/tmp'), TMP_DIR, TMP_FILE_NAME)
    })
  } else {
    copyFile(path.join(__dirname, '/tmp'), TMP_DIR, TMP_FILE_NAME)
  }
}

initRDTmp()
