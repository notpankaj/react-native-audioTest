package com.nativemod;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import com.facebook.react.modules.core.DeviceEventManagerModule;

public class CalendarModule extends ReactContextBaseJavaModule {
   
   private int eventCount = 0;

   CalendarModule(ReactApplicationContext context) {
       super(context);
   }

    @ReactMethod
    public void createCalendarEvent(Callback callback ) {
        Log.d("CalendarModule", "Log from our calender module");
        callback.invoke("DATA RETURNED FROM OUR CALANDER MOD 🎈");
    }



    @ReactMethod
    public void createCalendarEventPromise(Promise promise ) {
        try{
            promise.resolve("Data returned from promise 🎁");
            eventCount += 1;
            sendEvent(getReactApplicationContext(),"EventCount",eventCount);
        }catch(Exception e){
            promise.reject("Error return from promise 🎃",e);
        }
    }






    private void sendEvent(ReactContext reactContext,String eventName,int params) {
        reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
    }

    @Override
    public String getName() {
        return "CalendarModule"; //name of module
    }

}