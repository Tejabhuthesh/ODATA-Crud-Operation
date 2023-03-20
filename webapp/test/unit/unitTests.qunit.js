/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"idodata1/project50000/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
