# Initial Starter - MomenTUM App

This is an ionic-angular mobile application. 
This readme gives a step by step installation guide for the respective
reader to follow along with building the app.

# Usages

## Installations
#### 1. Install node and npm 
[Download from here](https://nodejs.org/en/download/) 
#### 2. Make sure your installations are complete and working by running the following commands
    $ node -v
    $ npm -v
#### 3. Install Ionic
    $ npm install -g @ionic/cli
#### 4. Make sure your installations are complete and working by running the following commands 
    $ ionic -v

### Useless
#### 1. To create a new app with tabs
    $ ionic start [new-app-name] tabs --type=angular

# Previewing
## Browser Preview
#### 1. Run the following command
    $ ionic serve
    
    
## iOS Preview
#### 1. Xcode installation with an emulator
Note: If you don't already have an xcode and an emulator installed, follow the following guide
to install it. [Guide here](https://ionicframework.com/docs/developing/ios#xcode-setup)
#### 2. Cordova Setup 
    $ npm install -g ios-sim
    $ brew install ios-deploy
#### 3. Project Setup​
Generate the native project, if it does not already exist. (You can only install one)
#### For Cordova, run the following:
    $ ionic cordova prepare ios
#### For Capacitor, run the following:
    $ ionic capacitor add ios

#### Just incase, you can disable capacitor integration by:
    $ ionic integrations disable capacitor
also delete the ```capacitor.config.json``` file
#### 4. Open Emulator
<br>

#### 5. Running with cordova
    $ ionic cordova run ios -l --external
#### Reference
> https://ionicframework.com/docs/developing/ios#xcode-setup

## Android Preview
#### 1. Android Studio and Android SDK installation
Note: If you don't already have android studio or an emulator installed, follow the following guide
to install it. [here](https://ionicframework.com/docs/developing/android#android-studio)
#### 2. Cordova Setup
Additional setup is required for Cordova to support programmatic builds. This section is not necessary for Capacitor.
> Install java [here](https://ionicframework.com/docs/developing/android#java) <br>
> Install Gradle [here](https://ionicframework.com/docs/developing/android#gradle)
#### 3. Project Setup​
Generate the native project, if it does not already exist. (You can only install one)
#### For Cordova, run the following:
    $ ionic cordova prepare android
#### For Capacitor, run the following:
    $ ionic capacitor add android
#### Just incase, you can disable capacitor integration by:
    $ ionic integrations disable capacitor
also delete the ```capacitor.config.json``` file
#### 4. Open Emulator
<br>

#### 5. Running with cordova
    $ ionic cordova run android -l
#### Reference
> https://ionicframework.com/docs/developing/android#installing-android-studio


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
