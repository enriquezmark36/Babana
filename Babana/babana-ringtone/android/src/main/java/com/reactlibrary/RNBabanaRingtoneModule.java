
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.media.RingtoneManager;
import android.media.MediaPlayer;
import android.media.AudioManager;
import android.net.Uri;
import android.util.Log;
import android.provider.MediaStore;
import android.content.Intent;
import android.app.Activity;
import android.provider.Settings;

public class RNBabanaRingtoneModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private MediaPlayer mCurrentRingtone = null;
  private Uri mLoadedURI = null;
  private Boolean mRingtoneInvalid;

  // Android Log tag
  private static final String ALOG_TAG = "babana-ringtone";

  // Activity Request Codes
  private static final int PICK_RINGTONE_REQUEST = 1;

  // List yer Error Codes here for Promise.reject();
  private static final String E_UNKNOWN = "E_UNKNOWN";
  private static final String E_SHOW_PICKER_FAILED = "E_SHOW_PICKER_FAILED";
  private static final String E_ACTIVITY_DNE = "E_ACTIVITY_DNE";
  private static final String E_NULL = "E_NULL";
  private static final String E_INVAL = "E_INVAL";

  // Message to show during Ringtone Selection
  private static final String PICKER_PROMPT = "Select your alarm tone";


  private Promise mPickerPromise;
  private final ActivityEventListener mPickerListener = new BaseActivityEventListener() {
    @Override
    public void onActivityResult(Activity activity, int requestCode,
                                 int resultCode, Intent intent) {
      if(requestCode == PICK_RINGTONE_REQUEST && mPickerPromise != null) {
        if (resultCode == Activity.RESULT_OK) {
          Uri uri = intent
              .getParcelableExtra(RingtoneManager.EXTRA_RINGTONE_PICKED_URI);
          setCurrentRingtone(uri);
          mPickerPromise.resolve(null);
        } else if (resultCode == Activity.RESULT_CANCELED) {
          // The user cancelled. We can't do anything about this, right?
          mPickerPromise.resolve(null);
        } else {
          mPickerPromise.reject(E_UNKNOWN, "Picker resulted to " + resultCode);
        }
        mPickerPromise = null;
      }
    }
  };

  private void setCurrentRingtone(Uri uri) {
    if (mLoadedURI != null) {
      mCurrentRingtone.reset();
    }

    mLoadedURI = uri;
    mRingtoneInvalid = false;

    if (uri == null) {
      Log.v(ALOG_TAG, "Silent Ringtone");
      return;
    }

    // We don't really know if a ringtone is invalid until this try
    // clause fails. Regardless of any error, any URI loaded will be
    // considered as an invalid Ringtone.
    try {
      mCurrentRingtone.setDataSource(getReactApplicationContext(), mLoadedURI);
      mCurrentRingtone.setAudioStreamType(AudioManager.STREAM_ALARM);
      mCurrentRingtone.setLooping(true);
      mCurrentRingtone.prepare();
      Log.v(ALOG_TAG, "Ringtone Loaded");
    } catch (Exception e) {
      Log.e(ALOG_TAG, "Could not load Ringtone", e);
      mRingtoneInvalid = true;
    }

  }

  public RNBabanaRingtoneModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addActivityEventListener(mPickerListener);
    this.mCurrentRingtone = new MediaPlayer();

  }

//   No constants, yet
//   @Override
//   public Map<String, Object> getConstants() {
//     final Map<String, Object> constants = new HashMap<>();
//     return constants;
//   }

  @Override
  public String getName() {
    return "RNBabanaRingtone";
  }

  @ReactMethod
  public void pickRingtone(final Promise promise) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      promise.reject(E_ACTIVITY_DNE, "Activity does not exist");
      return;
    }

    // Store the promise to resolve/reject when picker returns data
    mPickerPromise = promise;

    try {
      final Intent intent = new Intent(RingtoneManager.ACTION_RINGTONE_PICKER);
      intent.putExtra(RingtoneManager.EXTRA_RINGTONE_TITLE, PICKER_PROMPT);
      intent.putExtra(RingtoneManager.EXTRA_RINGTONE_SHOW_SILENT, true);
      intent.putExtra(RingtoneManager.EXTRA_RINGTONE_SHOW_DEFAULT, true);
      intent.putExtra(RingtoneManager.EXTRA_RINGTONE_TYPE, RingtoneManager.TYPE_ALL);
      currentActivity.startActivityForResult(intent, PICK_RINGTONE_REQUEST);
    } catch (Exception e) {
      mPickerPromise.reject(E_SHOW_PICKER_FAILED, e);
      mPickerPromise = null;
    }
  }

  @ReactMethod
  public void loadDefaultRingtone() {
    // This should use TYPE_ALARM, but there is NO default for TYPE_ALARM.
    // At least for AOSP based phones, it seems to be like that.
    setCurrentRingtone(Settings.System.DEFAULT_RINGTONE_URI);
  }

  @ReactMethod
  public void loadRingtone(String uri, final Promise promise) {
    if (uri == null) {
      setCurrentRingtone(null);
      promise.reject(E_NULL, "Ringtone URI is null");
      return;
    }

    // We won't check if the Uri is invalid.
    // If it is invalid, we just get a no-op or a Silent Ringtone.
    setCurrentRingtone(Uri.parse(uri));

    promise.resolve(null);
  }

  @ReactMethod
  public void getLoadedRingtone(Callback errorCallback, Callback successCallback) {
    if (mLoadedURI == null) {
      successCallback.invoke("", "", true);
      return;
    } else if (mRingtoneInvalid == true) {
      errorCallback.invoke(E_INVAL, "Ringtone might be invalid");
      return;
    }

    // Calling getRingtone() is kinda an overkill for this
    // purpose but it helps to not re-implement some untested voo-doo
    // that might break in the most unexpected ways.
    successCallback.invoke(
        RingtoneManager.getRingtone(getReactApplicationContext(), mLoadedURI)
              .getTitle(getReactApplicationContext().getApplicationContext()),
        mLoadedURI.toString(), false);
  }

  @ReactMethod
  public void playRingtone(final Promise promise) {
    if (mLoadedURI == null) {
      promise.reject(E_NULL, "Ringtone not yet loaded");
      return;
    } else if (mRingtoneInvalid == true) {
      promise.reject(E_NULL, "Ringtone might be invalid");
      return;
    }
    mCurrentRingtone.start();
  }

  @ReactMethod
  public void stopRingtone(final Promise promise) {
    if (mLoadedURI == null) {
      promise.reject(E_NULL, "Ringtone not yet loaded");
      return;
    } else if (mRingtoneInvalid == true) {
      promise.reject(E_NULL, "Ringtone might be invalid");
      return;
    }
    mCurrentRingtone.stop();
  }
}
