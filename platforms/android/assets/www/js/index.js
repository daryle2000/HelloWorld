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

    this.batteryObj = $('#battery');
    this.locationObj = $('#location');

    this.onDeviceReady = function () {
        _self.showReady();
        _self.initBatteryStatus();
        _self.initGeoLocation();
        _self.initBluetooth();
    };

    this.initBatteryStatus = function () {
        window.addEventListener("batterystatus", _self.onBatteryStatus, false);     // battery status
    }

    this.initGeoLocation = function () {
        _self.getLocation();
    }

    this.getLocation = function () {
        navigator.geolocation.getCurrentPosition(_self.onSuccessGeoLocation, _self.onErrorGeoLocation);
        setTimeout(function () {
            _self.getLocation();
        }, 5000);
    }

    this.showReady = function () {
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }

    this.onBatteryStatus = function (info) {
        if (info.level > 80)
            _self.batteryObj.css('color', '#00AA00');
        else
            if (info.level > 40)
                _self.batteryObj.css('color', '#ff6a00');
            else
                _self.batteryObj.css('color', '#ff0000');

        _self.batteryObj.html('Level: ' + info.level + '<br>Plugged: ' + info.isPlugged + '<br><br>');
    }

    this.onSuccessGeoLocation = function (pos) {
        _self.locationObj.html('Lat: ' + pos.coords.latitude + '<br>Long: ' + pos.coords.longitude + '<br><br>');
        _self.locationObj.css('color', '#0000FF');
    }

    this.onErrorGeoLocation = function (err) {
        _self.locationObj.css('color', '#cc0000');
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
            var paramsObj = { request: true };
            bluetoothle.initialize(_self.btInitializeSuccess, _self.btInitializeError, paramsObj);
        }
        catch (e) {
            alert("initBluetooth Exception: " + e);
        }
    }

    // --------------------------------------------------------------------------------------------------------------------
    // BT Initialize
    // --------------------------------------------------------------------------------------------------------------------

    this.btInitializeSuccess = function (result) {
        var btDevices = $('#bluetooth');

        if (result.status == 'enabled') {
            // StartScanning Bluetooth Devices
            btDevices.html ('');
            _self.btStartScan();

            // 15 seconds then stop scanning
            setTimeout(function () {
                _self.btStopScan();
            }, 15000);
        }
    }

    this.btInitializeError = function (result) {
        alert("BT Initialize Error : " + JSON.stringify(result));
    }

    // --------------------------------------------------------------------------------------------------------------------
    // BT Scanning
    // --------------------------------------------------------------------------------------------------------------------
    
    this.btStartScan = function () {
        var paramsObj = { serviceUuids: [] };
        bluetoothle.startScan(_self.btScanSuccess, _self.btScanError, paramsObj);
    }
    
    this.btStopScan = function () {
        bluetoothle.stopScan (
                    function (result) {
                        btDevices.append("End Scan!<br>");
                    },
                    function (result) {
                    });
    }
    
    this.btScanSuccess = function (result) {
        var btDevices = $('#bluetooth');

        if (result.status == "scanResult") {
            var item = "advertisement: " + result.advertisement + ", " +
                       "rssi: " + result.rssi + ", " +
                       "name: " + result.name + ", " +
                       "address: " + result.address + "<br>";
            btDevices.append(item);
        }
        else {
            btDevices.append("Scan Started...<br>");
        }
    }

    this.btScanError = function (result) {
        var btDevices = $('#bluetooth');
        btDevices.append("Scan Error: " + JSON.stringify(result));
    }
}









