# Keep JS bridge
-keepclassmembers class com.liquidglass.pro.ScriptBridge {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.liquidglass.pro.ScriptBridge { *; }
