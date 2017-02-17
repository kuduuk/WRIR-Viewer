define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "esri/dijit/Directions", "dojo/text!./Directions/templates/Directions.html", "dojo/_base/lang", "dijit/Menu", "dijit/MenuItem", "dijit/PopupMenuItem", "dijit/MenuSeparator", "esri/geometry/Point", "esri/SpatialReference", "dojo/topic", "dojo/i18n!./Directions/nls/resource"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    return a([b, c], {
        templateString: e,
        i18n: n,
        postCreate: function() {
            this.inherited(arguments), this.directions = new d(f.mixin({
                map: this.map
            }, this.options), this.directionsNode), this.directions.startup(), this.directions._activateButton ? this.directions._activateButton.style.display = "none" : this.directions._activateButtonNode && (this.directions._activateButtonNode.style.display = "none", this.directions._addDestinationNode.style["float"] = "inherit", this.directions._optionsButtonNode.style["float"] = "inherit", this.directions._optionsButtonNode.style.marginRight = "5px"), this.mapRightClickMenu && this.addRightClickMenu();
        },
        addRightClickMenu: function() {
            this.map.on("MouseDown", f.hitch(this, function(a) {
                this.mapRightClickPoint = a.mapPoint;
            })), this.menu = new g, this.menu.addChild(new h({
                label: this.i18n.labels.directionsFromHere,
                onClick: f.hitch(this, "directionsFrom")
            })), this.menu.addChild(new h({
                label: this.i18n.labels.directionsToHere,
                onClick: f.hitch(this, "directionsTo")
            })), this.menu.addChild(new j), this.menu.addChild(new h({
                label: this.i18n.labels.addStop,
                onClick: f.hitch(this, "addStop")
            })), this.menu.addChild(new j), this.menu.addChild(new h({
                label: this.i18n.labels.useMyLocationAsStart,
                onClick: f.hitch(this, "getGeoLocation", "directionsFrom")
            })), this.menu.addChild(new h({
                label: this.i18n.labels.useMyLocationAsEnd,
                onClick: f.hitch(this, "getGeoLocation", "directionsTo")
            })), this.mapRightClickMenu.addChild(new i({
                label: this.i18n.labels.directions,
                popup: this.menu
            }));
        },
        clearStops: function() {
            this.directions.reset();
        },
        directionsFrom: function() {
            this.directions.updateStop(this.mapRightClickPoint, 0).then(f.hitch(this, "doRoute"));
        },
        directionsTo: function() {
            this.directions.updateStop(this.mapRightClickPoint, this.directions.stops.length - 1).then(f.hitch(this, "doRoute"));
        },
        addStop: function() {
            this.directions.addStop(this.mapRightClickPoint, this.directions.stops.length - 1).then(f.hitch(this, "doRoute"));
        },
        doRoute: function() {
            this.parentWidget && !this.parentWidget.open && this.parentWidget.toggle(), this.directions.stops[0] && this.directions.stops[1] && this.directions.getDirections();
        },
        startAtMyLocation: function() {
            this.getGeoLocation("directionsFrom");
        },
        endAtMyLocation: function() {
            this.getGeoLocation("directionsTo");
        },
        getGeoLocation: function(a) {
            navigator && navigator.geolocation ? navigator.geolocation.getCurrentPosition(f.hitch(this, "locationSuccess", a), f.hitch(this, "locationError")) : m.publish("growler/growl", {
                title: this.i18n.errors.geoLocation.title,
                message: this.i18n.errors.geoLocation.message,
                level: "default",
                timeout: 1e4,
                opacity: 1
            });
        },
        locationSuccess: function(a, b) {
            this.mapRightClickPoint = new k(b.coords.longitude, b.coords.latitude, new l({
                wkid: 4326
            })), this[a]();
        },
        locationError: function(a) {
            m.publish("growler/growl", {
                title: this.i18n.errors.location.title,
                message: this.i18n.errors.location.message + a.message,
                level: "default",
                timeout: 1e4,
                opacity: 1
            });
        }
    });
});
//# sourceMappingURL=Directions.map
