# React Native / Redux Template

An app with some basic components to give a jumping off point for RN apps.

* Splash Screen / Loading state (Auto Login)
* Sign Up
* Sign In
* Profile & Edit Profile
* Settings & Edit settings
* Main screen / List of cards / Detail Screen
* Navigation

## Requirements

For development, you will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & includes [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://git.cratebind.com/mobile-ios/react-native-template.git
    $ cd react-native-template
    $ npm install
    $ react-native link

## Start & watch

    $ react-native run-ios

---

## To Use

Create new project with

    $ react-native init [new-project-name]

You do need some dependencies -

    1. react-navigation
    2. react-native-gesture-handler
    3. redux
    4. react-redux
    5. redux-thunk
    6. styled-components
    7. react-native-image-picker
    8. react-native-image-resizer
    9. react-native-sensitive-info
    10. react-native-vector-icons
    11. moment
    12. react-native-masked-text

Link up libraries

    $ react-native link

#### Copy src folder over into new project & replace App.js.

## May the odds be ever in your favor.

