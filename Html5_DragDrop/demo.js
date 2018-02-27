var app = {};
$(document).ready(function () {
    'use strict';



    app.log = [];
    app.whatHappened;
    app.whatsStored;
    // oursession
    app.fromStorage = {};
    app.localStorage = {};

    app.getFromStorage = function (key) {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(key);
        } else {
            app.whatHappened.innerHTML = "local storage not allowed";
        }
    }


    app.saveToStorage = function (key, value) {

        app.whatHappened = document.getElementById("whatHappened");
        if (typeof (Storage) !== "undefined") {
            app.localStorage.setItem(key, value);
            app.fromStorage = getFromStorage(key);
            app.whatHappened.innerHTML = "container " + key + " now holds " + fromStorage;
            // $('#whatHappened').html = "container " + key + " now holds " + value;
        } else {
            app.whatHappened.innerHTML = "local storage not allowed";
        }
    }

    app.getFromSession = function (key) {
        var requestedValue = "";
        switch (key) {
            case "div1":
                requestedValue = sessionStorage.div1;
                break;

            case "div2":
                requestedValue = sessionStorage.div2;
                break;

            case "div3":
                requestedValue = sessionStorage.div3;
                break;

            case "div4":
                requestedValue = sessionStorage.div4;
                break;

            case "div5":
                requestedValue = sessionStorage.div5;
                break;

            case "div6":
                requestedValue = sessionStorage.div6;
                break;

        }

        return requestedValue;
    }

    app.saveToSession = function (key, value) {

        app.whatHappened = document.getElementById("whatHappened");

        sessionStorage.removeItem(key);
        sessionStorage.setItem(key, value);

        var fromSession = app.getFromSession(key);
        app.whatHappened.innerHTML = "container " + key + " now holds " + fromSession;
        // $('#whatHappened').html = "container " + key + " now holds " + value;

    }



    app.showItemsByKey = function () {
        console.log("starting list");
        var typeofKey = null;
        var valueOfKey = null;
        for (var key in sessionStorage) {
            valueOfKey = sessionStorage[key];
            typeofKey = (typeof sessionStorage[key]);
            console.log(key, valueOfKey, typeofKey);
            // $('#whatsStored').append(" " + key + " = " + valueOfKey);
        }
    }

    app.allowDrop = function (ev) {

        ev.preventDefault();
        // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element.

    }

    app.drag = function (ev) {
        // setData([datatype],'div1')
        ev.dataTransfer.setData("text", ev.target.id);
    }

    app.drop = function (ev) {

        // Call preventDefault() to prevent the browser default handling of the data (default is open as link on drop).

        ev.preventDefault();

        // only save this if it's a valid drop target.. NOT IMAGES

        if (!ev.target.id.startsWith("drag", 0)) {
            // Get the dragged data with the dataTransfer.getData() method.
            // This method will return any data that was set to the same type in the setData() method
            var data = ev.dataTransfer.getData("text");

            // store it in html5 local storage
            // saveToStorage(ev.target.id, data);
            app.saveToSession(ev.target.id, data);

            // display current storage
            $('#whatsStored').text = "";
            app.showItemsByKey();

            // Append the dragged element into the drop element
            ev.target.appendChild(document.getElementById(data));
        } else {

            console.log("tried to drop an image non-drop item... id: " + ev.target.id);
        }

    }


    $().ready(function () {
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            app.log.push("Can use localStorage/sessionStorage.");
        } else {

            // Sorry! No Web Storage support..
            app.log.push("Sorry! No Web Storage support...");
        }

        app.whatHappened = document.getElementById("whatHappened");
        app.whatsStored = document.getElementById("whatsStored");

        $("<img/>").click(function (e) {
            e.preventDefault();
            e.dataTransfer.setData("text", ev.target.id);

            //Clear header fields
            rackbin.value = "";
            ticket.value = "";
            baseSKU.value = "";
            color.value = "";
            $('#color').prop('disabled', true);

            //Clear detail gridview
            $('#inventoryCountTable > tbody').html('');

            //Reinitialize session
            $.session.set('drag-n-drop', "false");
        });

    });

});
