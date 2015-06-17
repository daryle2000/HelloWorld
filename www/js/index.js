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

var messageObj = null;

function onDeviceReady() {
    messageObj = $('#message');
    initOtherEvents();
    showReady();
}

function initOtherEvents() {
    window.addEventListener("batterystatus", onBatteryStatus, false);     // battery status
    getLocation();
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccessGeoLocation, onErrorGeoLocation);
    setTimeout(function () {
        getLocation();
    }, 5000);
}

function showReady() {
    var parentElement = document.getElementById('deviceready');
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    messageObj.html('Waiting ...');
}

function onBatteryStatus(info) {
    if (info.level > 80)
        messageObj.css('color', '#00AA00');
    else
        if (info.level > 40)
            messageObj.css('color', '#ff6a00');
        else
            messageObj.css('color', '#ff0000');
        
    messageObj.html('Level: ' + info.level + '<br>Plugged: ' + info.isPlugged + '<br><br>');
}

function onSuccessGeoLocation(pos) {
    messageObj.html('Lat: ' + pos.coords.latitude + '<br>Long: ' + pos.coords.longitude + '<br><br>');
    messageObj.css('color', '#0000FF');
}
    
function onErrorGeoLocation (err) {
    messageObj.css('color', '#cc0000');
}


document.addEventListener('deviceready', onDeviceReady, false);


