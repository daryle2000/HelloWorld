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
    this.btObj = $('#bluetooth');

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
            bluetoothSerial.isEnabled(
                function () {
                    _self.btObj.html('Scan Started...<br>');
                    bluetoothSerial.list(_self.btListSuccess, _self.btListError);
                },
                function () {
                    _self.btObj.html('BT not enabled...<br>');
                });
            
        }
        catch (e) {
            _self.btObj.append("Scan Exception: " + e + "<br>");
            _self.btObj.append("Scanning is stopped!<br>");
        }
    }

    this.btListSuccess = function (result) {
        _self.btObj.append('Found ' + result.length + ' device(s)<br>');
        
        for (var idx=0; idx<result.length; idx++) {
            _self.btObj.append('id: ' + result[idx].id + ', name: ' + result[idx].name + '<br>');
        }
    }

    this.btListError = function (error) {
        _self.btObj.html('BT List Error!!!');
    }
}









