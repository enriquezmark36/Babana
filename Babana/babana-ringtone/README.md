
# react-native-babana-ringtone

## Short Preamble (Please Read)
To be frank, this is based on react-native-ringtone-manager. And yes, it's for Android only.

We need to play some ringtone but unfortunately that module doesn't really work as of now.
Why? The functions are still stubs.

Then this is written to do just that.

I, the developer, have no intention of uploading this.
You may if you want to.
And, if it helped you in a way then you're welcome.

## Getting started
  Assuming that you have a copy of this module on a folder named as "babana-ringtone", please do either of these:

For npm:

`$ yarn add file:babana-ringtone/`

For yarn:

`$ npm install --save file:babana-ringtone/`

### Mostly automatic installation

`$ react-native link react-native-babana-ringtone`

If this didn't work out for you, please try the Manual installation below.

### Manual installation (Android)

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNBabanaRingtonePackage;` to the imports at the top of the file
  - Add `new RNBabanaRingtonePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-babana-ringtone'
  	project(':react-native-babana-ringtone').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-babana-ringtone/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-babana-ringtone')
  	```

## Usage
```javascript
import BabanaRingtone from 'react-native-babana-ringtone';
```

##### Note: All methods here, except for `BabanaRingtone.loadDefaultRingtone()`, returns a **promise**. On resolve cases, the value is always null. On reject cases, the value is the error occurred.


### `BabanaRingtone.pickRingtone()`

Opens the Android ringtone picker for all type of Ringtones (Notification, Alarm, Ringtone).
Automatically stops the playing Ringtone **only after selection**.


### `BabanaRingtone.loadDefaultRingtone()`

Loads the Default ringtone with `TYPE_RINGTONE`, or the ringtone the plays during ingoing calls.
Automatically stops the playing Ringtone.


### `BabanaRingtone.playRingtone()`

Plays the loaded Ringtone.


### `BabanaRingtone.stopRingtone()`

Stops the loaded Ringtone if already playing.

## Reporting Issues
Please use the Babana project issue tracker on github. Don't email me.
