
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
import android.media.Ringtone;
import android.net.Uri;
import android.provider.MediaStore;
import android.content.Intent;
import android.app.Activity;

public class RNBabanaRingtoneModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private Ringtone mCurrentRingtone = null;
  private Uri mLoadedURI = null;

  // Activity Request Codes
  private static final int PICK_RINGTONE_REQUEST = 1;

  // List yer Error Codes here for Promise.reject();
  private static final String E_UNKNOWN = "E_UNKNOWN";
  private static final String E_SHOW_PICKER_FAILED = "E_SHOW_PICKER_FAILED";
  private static final String E_ACTIVITY_DNE = "E_ACTIVITY_DNE";
  private static final String E_NULL = "E_NULL";

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
          mPickerPromise.reject(E_UNKNOWN, "Picker results to " + resultCode);
        }
        mPickerPromise = null;
      }
    }
  };

  private void setCurrentRingtone(Uri uri) {
    if (mCurrentRingtone != null && mCurrentRingtone.isPlaying() == true) {
      mCurrentRingtone.stop();
    }
    mCurrentRingtone = RingtoneManager.getRingtone(getCurrentActivity(), uri);
    mLoadedURI = uri;
  }

  public RNBabanaRingtoneModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addActivityEventListener(mPickerListener);
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
      intent.putExtra(RingtoneManager.EXTRA_RINGTONE_SHOW_SILENT, false);
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
    // This should use TYPE_ALARM, but... there is NO default for TYPE_ALARM.
    // At least, for AOSP based phone it seems to be like that.
    Uri defaultRingtoneUri = RingtoneManager
        .getActualDefaultRingtoneUri(getCurrentActivity().getApplicationContext(),
                                     RingtoneManager.TYPE_RINGTONE);
    setCurrentRingtone(defaultRingtoneUri);
  }

  @ReactMethod
  public void loadRingtoneURI(String uri, final Promise promise) {
    if (uri == null) {
      promise.reject(E_NULL, "Ringtone URI is null");
      return;
    }

    setCurrentRingtone(Uri.parse(uri));

    // We check, if the URI is valid, that is, upon loading,
    // mCurrentRingtone is not null
    if (mCurrentRingtone == null) {
      promise.reject(E_NULL, "Ringtone URI is invalid");
    }

    promise.resolve(null);
  }

  @ReactMethod
  public void getLoadedRingtone(Callback errorCallback, Callback successCallback) {
    if (mCurrentRingtone == null) {
      errorCallback.invoke(E_NULL, "Ringtone not yet loaded");
      return;
    }

    successCallback.invoke(
        mCurrentRingtone.getTitle(getCurrentActivity().getApplicationContext()),
        mLoadedURI.toString());
  }

  @ReactMethod
  public void playRingtone(final Promise promise) {
    if (mCurrentRingtone == null) {
      promise.reject(E_NULL, "Ringtone not yet loaded");
      return;
    }
    mCurrentRingtone.play();
  }

  @ReactMethod
  public void stopRingtone(final Promise promise) {
    if (mCurrentRingtone == null) {
      promise.reject(E_NULL, "Ringtone not yet loaded");
      return;
    }
    mCurrentRingtone.stop();
  }
}
