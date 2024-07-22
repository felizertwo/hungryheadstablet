cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-btprinter.BluetoothPrinter",
      "file": "plugins/cordova-plugin-btprinter/www/BluetoothPrinter.js",
      "pluginId": "cordova-plugin-btprinter",
      "clobbers": [
        "BTPrinter"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-fullscreen.AndroidFullScreen",
      "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
      "pluginId": "cordova-plugin-fullscreen",
      "clobbers": [
        "AndroidFullScreen"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "cordova-plugin-x-toast.Toast",
      "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
      "pluginId": "cordova-plugin-x-toast",
      "clobbers": [
        "window.plugins.toast"
      ]
    },
    {
      "id": "cordova-sumup-plugin.SumUp",
      "file": "plugins/cordova-sumup-plugin/www/sumup.js",
      "pluginId": "cordova-sumup-plugin",
      "clobbers": [
        "window.SumUp"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-btprinter": "0.1.0-dev",
    "cordova-plugin-device": "3.0.0",
    "cordova-plugin-fullscreen": "1.3.0",
    "cordova-plugin-statusbar": "4.0.0",
    "cordova-plugin-x-toast": "2.7.3",
    "cordova-sumup-plugin": "2.0.0"
  };
});