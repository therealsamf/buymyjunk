/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var defaultGetCallback = function defaultGetCallback(http, success, fail) {
	    return function (http) {
	        http = http.originalTarget;
	        console.log(http);
	        if (http.readyState == 4 && http.status == 200) {
	            success(http.response);
	        } else {
	            fail();
	        }
	    };
	};

	var callGetResponse = function callGetResponse(url, success, fail) {
	    var http = new XMLHttpRequest();
	    http.open("GET", url, true);

	    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	    http.onreadystatechange = defaultGetCallback(http, success, fail);
	    http.send(null);
	};

	var validEmail = function validEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email) && email.endsWith('edu');
	};

	var getUUID = function getUUID() {
	    function randomNum() {
	        return Math.floor((1 + Math.random()) * 0x1000000000).toString(16).substring(1);
	    }
	    return randomNum();
	};

	var emailUUID = function emailUUID(email, name, UUID) {
	    emailjs.send("default_service", "buymyjunk", { code: UUID, name: name, to: email });
	};

	var storeUUID = function storeUUID(UUID, success, fail) {
	    callGetResponse("http://www.danielloera.co/buymyjunk/add_uuid.php?code=" + UUID, success, fail);
	};

	var deleteUUID = function deleteUUID(UUID, success, fail) {
	    callGetResponse("http://www.danielloera.co/buymyjunk/delete_uuid.php?code=" + UUID, success, fail);
	};

	var addPost = function addPost(id, school, username, title, description, category, tags, images, success, fail) {};

	module.exports = {
	    'defaultGetCallback': defaultGetCallback
	};

/***/ }
/******/ ]);