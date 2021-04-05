# Franq Pokedex Frontend Test

## Running the App

Clone this repository to your local machine

### preparing your project

Download npm dependencies:

```sh
npm i -g react-native-cli
npm install
```
or
```sh
yarn global add react-native-cli
yarn
```

### Running your project

From project dir, run:

#### Android
1. Start an emulator (via Android Studio) or Plug your device via USB
2. Build and run

	```sh
	react-native run-android
	```
	This will also start metro if not already started
  
3. Set your Emulator to live reload changes `⌘`+`m`  (`cmd`+`m`) => `Enable Hot Reloading`

To open packager manually, from project dir run:

```sh
react-native start
```

  
#### iOS
1. Run the packager

	```
	npm run start
	```
	

2. Open the project in xcode from `ios/reactNativeInit.xcodeproj`
3. Build and run from Xcode
