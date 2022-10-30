# momenTUM

The purpose of this document is to give the respective reader an overview of the general idea and implementation of the momenTUM mobile application and how it is built.

**momenTUM** is a cross-platform mobile application for collecting and monitoring intervention studies. It is licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).

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

For a more detailed tutorial on how to develop Ionic projects visit:

>https://ionicframework.com/docs

## Set up local project

Navigate to the destination of your project and clone the GitHub repository:

      cd /full/path/to/your/destination
      git clone https://github.com/TUMChronobiology/momenTUM-app.git
      cd momenTUM-app

[Install node and npm](https://nodejs.org/en/download/) or check whether they are installed:

      node -v
      npm -v

Install global npm packages:

      npm i -g @ionic/cli @angular/cli native-run cordova-res

Navigate to the momenTUM-app folder and install the dependencies:

      cd /path/to/momenTUM-app
      npm i

## Build and run project

### Run in web browser

Run a development server with live-reload in your browser:

      ionic serve

### Build and run on iOS emulator
Notice: iOS apps can only be developed on macOS with Xcode installed.

Download Xcode:
>https://developer.apple.com/xcode/.

Once Xcode is installed, make sure the command-line tools are selected for use:

      xcode-select --install

Create an iOS emulator:
> 1. Open Xcode.
> 2. Navigate to Window » Devices and Simulators.
> 3. Create a new simulator, if it doesn't already exist.

Generate a native project:

      ionic cap add ios

Open in Xcode:

      ionic cap open ios

Sign the App:
>1. Click on the Project root.
>2. under the Signing section, ensure Automatically manage signing is enabled.
>3. Then, select a Development Team.

You can now close Xcode and build & run the App on iOS with live-reload:

      ionic cap copy ios
      ionic cap run ios -l

For debugging, you can use the Safari Browser:
> 1. Open Safari
> 2. Navigate to Develop >> _name_of_emulator_ >> localhost

Alternatively, you can run the native iOS Project in Xcode.

### Android

Install [Android Studio](https://developer.android.com/studio/install):
>https://developer.android.com/studio/install

Install the Android SDK by opening Android Studio. It will lead you through the installation.
Open ~/.bashrc, ~/.bash_profile, or similar bash startup scripts and add the following lines:

      export ANDROID_SDK_ROOT=/Path/to/android/sdk
      # avdmanager, sdkmanager
      export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
      # adb, logcat
      export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
      # emulator
      export PATH=$PATH:$ANDROID_SDK_ROOT/emulator

In Android Studio, open the _Virtual Device Manager_ and create a _Virtual Device_. Run the Device and keep the emulator running.
Generate the android native project by running the following inside of the momenTUM-app directory:

      ionic cap add android

Build the web assets and copy them into the native project:

      ionic cap copy android

Run the app with live-reload:

      ionic cap run android -l

For debugging, open [chrome://inspect](chrome://inspect) with the Chrome Web Browser.

Alternatively, you can run the native Android Project in Android Studio.

# Testing

For testing, run the following command.

    ng test

For a code-coverage report:

    ng test --no-watch --code-coverage

## End-to-end testing

Cypress is used for E2E-Testing, which simulates a user interacting with the app. To run, start the app in the browser and then start cypress. A new cypress window will open.

```
ionic serve
npm run cypress
```

