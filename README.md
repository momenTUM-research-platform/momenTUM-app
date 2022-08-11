# MomenTUM

The purpose of this document is to give the respective reader an overview of the general idea and implementation of the momenTUM mobile application and how it is built.

**MomenTUM** is a cross-platform mobile application for collecting and monitoring intervention studies. It is licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).

It supports:

- A diverse range of elements, including slider, text input, date/time, audio, video, image, and more, with support for branching logic.
- Flexible module scheduling, to deliver surveys and/or interventions to participants at random or fixed intervals.
- Participant randomisation into distinct conditions with different modules and scheduling.
- Study registration via scanning a QR code or directly entering protocol URL.
- Dynamic feedback charts to track participant progress on specific variables.
- Distributed architecture, such that study protocols and data can be stored on your own server.

#### Technologies used for implementation:

- [Ionic](https://ionicframework.com/) - Cross-platform mobile app development
- [node.js](https://nodejs.org/en/) - Cross-platform JavaScript run-time environment
- [Chart.js](Chart.js) - Open source HTML5 charts

## Requirements Analysis

### User requirements

- A student/subject will have the option to use the reaction-time test.
- A student/subject will have the option to see draft studies that they did not submit yet.
- A student/subject will have access to see already submitted studies.
- A student/subject can have access to see all the surveys in the study.

### System requirements

- A student/subject can view new and upcoming studies or already submitted/ongoing studies.
- A student/subject has the option withdraw from the study
- A student/subject can choose notification preferences.

## Usecase Diagram

<img src="https://i.postimg.cc/rmxzt3GF/Use-case.png" height="300">

## Citation

If you use schema in your own research, please cite the following:

> Shatte, A. B. R., & Teague, S. J. (2020). schema: An open-source, distributed mobile platform for deploying mHealth research tools and interventions. BMC Medical Research Methodology, 20(1), 1-12. Retrieved from [https://bmcmedresmethodol.biomedcentral.com/articles/10.1186/s12874-020-00973-5](https://bmcmedresmethodol.biomedcentral.com/articles/10.1186/s12874-020-00973-5)

> Shatte, A. B. R., & Teague, S. J. (2019, June 12). schema (Version 1.0). Zenodo. http://doi.org/10.5281/zenodo.3243918

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3243918.svg)](https://doi.org/10.5281/zenodo.3243918)

# Development

This is an ionic-angular mobile application.
This readme gives a step by step installation guide for the respective
reader to follow along with building the app.

## Installations

#### 1. Install node and npm

[Download from here](https://nodejs.org/en/download/)

#### 2. Make sure your installations are complete and working by running the following commands

    $ node -v
    $ npm -v

#### 3. Install Ionic

    $ npm install -g @ionic/cli
    $ npm i -g cordova
    $ npm i -g native-run
    $ npm i -g @angular/cli

#### 4. Make sure your installations are complete and working by running the following commands

    $ ionic -v

#### 5. Install node_modules

    $ npm i

### Useless

#### 1. To create a new app with tabs

    $ ionic start [new-app-name] tabs --type=angular

## Previewing

The following guide shows how to use Cordova to build for Browser, Android and iOS platform targets.
<br>

## Browser Preview

#### 1. Install cordova browers

    $ ionic cordova platform add browser

#### 2. Prepare

    $ ionic cordova prepare browser

#### 2. Run the following command

    $ ionic cordova run browser

## iOS Preview

#### 1. Xcode installation with an emulator

Note: If you don't already have an xcode and an emulator installed, follow the following guide
to install it. <br>[Guide here](https://ionicframework.com/docs/developing/ios#xcode-setup)

#### 2. Cordova Setup

    $ npm install -g ios-sim
    $ brew install ios-deploy

#### 3. Project Setup​

Generate the native project, if it does not already exist. (You can only install one)

#### For Cordova, run the following:

    $ ionic cordova prepare ios

#### 2. Running with cordova

    $ ionic cordova run ios -l --external

#### Reference

> https://ionicframework.com/docs/developing/ios#xcode-setup

## Android Preview

#### 1. Android Studio and Android SDK installation

Note: If you don't already have android studio or an emulator installed, follow the following guide
to install it. <br>[Guide here](https://ionicframework.com/docs/developing/android#android-studio)

#### 2. Cordova Setup

Additional setup is required for Cordova to support programmatic builds. This section is not necessary for Capacitor.

> Install Java [here](https://ionicframework.com/docs/developing/android#java) <br>
> Install Gradle [here](https://ionicframework.com/docs/developing/android#gradle)

#### 3. Project Setup​

Generate the native project, if it does not already exist. (You can only install one)

#### For Cordova, run the following:

    $ ionic cordova prepare android

#### 2. Running with cordova

    $ ionic cordova run android -l

#### Reference

> https://ionicframework.com/docs/developing/android#installing-android-studio

# Testing

For testing, run the following command.

    ng test

## New features

#### 1. Generating new features

        $ ionic generate
        ? What would you like to generate?
        ❯ page
        component
        service
        module
        class
        directive
        guard

## End-to-end testing

Cypress is used for E2E-Testing, which simulates a user interacting with the app. To run, start the app in the browser and then start cypress. A new cypress window will open.

```
ionic cordova run browser
npm run cypress
```
