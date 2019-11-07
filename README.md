# vuepress-article-cli

Create an article in vuepress's blog mode.

[![npm](https://img.shields.io/npm/v/vuepress-article-cli.svg)](https://www.npmjs.com/package/vuepress-article-cli)
[![GitHub stars](https://img.shields.io/github/stars/vxhly/vuepress-article-cli)](https://github.com/vxhly/vuepress-article-cli/stargazers)
[![GitHub license](https://img.shields.io/github/license/vxhly/vuepress-article-cli)](https://github.com/vxhly/vuepress-article-cli/blob/master/LICENSE)


## Install

**npm**

``` bash
npm install vuepress-article-cli -g
```

**yarn**

``` bash
yarn global add vuepress-article-cli -g
```

## Options

**-V, --version**

> output the version number

**-h, --help**

> output usage information

## Commands

**new**     

> create an article.

questions =>

* title =>【**input**】What's the title of your article?
* author =>【**input**】What's the author of your article?
* categories =>【**input**】What's the categories of your article?
* tags =>【**input**】What's the tags of your article?
* dateFormat =>【**input**】What's the format of your article creation time?
* filename =>【**input**】What's the format of your article creation time?

**del**  

> delete an article.

questions =>

* filename =>【**input**】What file do you want to delete?
* delFiles =>【**checkbox**】Do you want to delete those files?
* isDel => 【**confirm**】Do you really want to delete these files?

**tmp**

> create a template file for the article.

**help [cmd]**

> display help for [cmd]

