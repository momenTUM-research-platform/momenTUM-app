# Initial Starter - MomenTUM App

This is an ionic-angular mobile application.
This readme gives a step by step installation guide for the respective
reader to follow along with building the app.

# Usages

Sample URLs:

- https://gist.githubusercontent.com/BlenDaniel/6f44bdf665123d612295ed47d1a58a77/raw/40e95e86ff86267f0dae21491102c5f32fe283f9/Test.json
- https://tuspl22-momentum.srv.mwn.de/api/surveys/demo
- https://tuspl22-momentum.srv.mwn.de/api/surveys/onlyPVT_myID2000_1655989948278
- https://ashatte.io/schema/sleep.json

## Installations

#### 1. Install node and npm

[Download from here](https://nodejs.org/en/download/)

#### 2. Make sure your installations are complete and working by running the following commands

    $ node -v
    $ npm -v

#### 3. Install Ionic

    $ sudo npm install -g @ionic/cli

#### 4. Make sure your installations are complete and working by running the following commands

    $ ionic -v

#### 5. Install node_modules

    $ sudo npm i

### Useless

#### 1. To create a new app with tabs

    $ ionic start [new-app-name] tabs --type=angular

# Previewing

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

<<<<<<< HEAD
<<<<<<< HEAD
$ ionic cordova run android
=======

=======

> > > > > > > main

    $ ionic cordova run android -l

> > > > > > > main

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
