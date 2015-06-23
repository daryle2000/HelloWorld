/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function myApp() {
    var _self = this;

    this.pageObj = $('#page');
    this.messagesObj = $('#messages');
    this.btButtonObj = $('#btScan');
    this.windowObj = $(window);

    this.postMessage = function (msg) {
        _self.messagesObj.append(msg + '<br>');
    }

    this.detectDeviceType = function () {
        if (navigator.userAgent.match(/iPad/i) == "iPad")
            return "ipad";
        else
            if (navigator.userAgent.match(/iPhone/i) == "iPhone")
                return "iphone";
            else
                if (navigator.userAgent.match(/Android/i) == "Android")
                    return "android";
                else
                    if (navigator.userAgent.match(/BlackBerry/i) == "BlackBerry")
                        return "blackBerry";
                    else
                        return "undetected";
    }

    this.onDeviceReady = function () {
        try
        {
            StatusBar.show();
            StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByHexString("#aa0000");

            _self.postMessage('Device is Ready ...');

            _self.postMessage ('Device type is ' + _self.detectDeviceType());
            _self.initBatteryStatus();
            _self.initGeoLocation();

            _self.btButtonObj.unbind('click');
            _self.btButtonObj.click(function () {
                _self.initBluetooth();
            });
        }
        catch (e) {
            _self.postMessage(e);
        }
    };

    this.initBatteryStatus = function () {
        window.addEventListener("batterystatus", _self.onBatteryStatus, false);     // battery status
    }

    this.initGeoLocation = function () {
        navigator.geolocation.getCurrentPosition(_self.onSuccessGeoLocation, _self.onErrorGeoLocation);
    }

    this.onBatteryStatus = function (info) {
        _self.postMessage('Level: ' + info.level + ' Plugged: ' + info.isPlugged);
    }

    this.onSuccessGeoLocation = function (pos) {
        _self.postMessage('Latitude: ' + pos.coords.latitude);
        _self.postMessage('Logitude: ' + pos.coords.longitude);
    }

    this.onErrorGeoLocation = function (err) {
    }

    this.init = function () {
        document.addEventListener('deviceready', _self.onDeviceReady, false);
    }

    // --------------------------------------------------------------------------------------------------------------------
    // --- BLUETOOTH ---
    // --------------------------------------------------------------------------------------------------------------------

    this.initBluetooth = function () {
        try
        {       
            _self.postMessage('Scan Started...');
            bluetoothSerial.list(_self.btListSuccess, _self.btListError);                     
        }
        catch (e) {
            _self.postMessage("Scan Exception: " + e);
            _self.postMessage("Scanning is stopped!");
        }
    }

    this.btListSuccess = function (result) {
        _self.postMessage('Found ' + result.length + ' device(s)');
        
        for (var idx=0; idx<result.length; idx++) {
            _self.postMessage ('id: ' + result[idx].id + ', name: ' + result[idx].name);
        }
    }

    this.btListError = function (error) {
        _self.postMessage ('BT List Error!!!');
    }
}









