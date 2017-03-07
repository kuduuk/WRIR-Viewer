define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/_base/lang", "dojo/html", "dojo/dom-style", "dojo/number", "dojo/topic", "//cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.3/proj4.js", "xstyle/css!./MapInfo/css/MapInfo.css"], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    return a([b, c], {
        map: null,
        mode: "map",
        firstCoord: "x",
        unitScale: 2,
        showScale: !1,
        showZoom: !1,
        xLabel: "X:",
        yLabel: "Y:",
        scaleLabel: "1:",
        zoomLabel: "Z:",
        minWidth: 0,
        proj4Catalog: null,
        proj4Wkid: null,
        proj4CustomURL: null,
        _mode: 0,
        _projection: null,
        _projectionLoaded: !1,
        constructor: function(b) {
            a.safeMixin(this, b || {});
            var c = '<div class="gis-dijit-MapInfo">';
            this.showScale && (c += '${scaleLabel}<span data-dojo-attach-point="scaleNode"></span>&nbsp;&nbsp;'), this.showZoom && (c += '${zoomLabel}<span data-dojo-attach-point="zoomNode"></span>&nbsp;&nbsp;');
            var d = this.firstCoord;
            "x" === d ? c += '${xLabel}<span data-dojo-attach-point="xNode"></span>&nbsp;&nbsp;${yLabel}<span data-dojo-attach-point="yNode"></span>' : "y" === d ? c += '${yLabel}<span data-dojo-attach-point="yNode"></span>&nbsp;&nbsp;${xLabel}<span data-dojo-attach-point="xNode"></span>' : (this.firstCoord = "x", c += '${xLabel}<span data-dojo-attach-point="xNode"></span>&nbsp;&nbsp;${yLabel}<span data-dojo-attach-point="yNode"></span>'), c += "</div>", this.templateString = c
        },
        postCreate: function() {
            var a = this.map;
            return a ? void(a.loaded ? this._initialize(a) : a.on("load", d.hitch(this, "_initialize", a))) : (h.publish("viewer/handleError", {
                source: "MapInfo",
                error: "A map reference is required"
            }), void this.destroy())
        },
        _initialize: function(a) {
            var b = a.spatialReference.wkid,
                c = this.mode;
            if (102100 === b && "dec" !== c && "dms" !== c) this._mode = 0;
            else if (102100 === b) this._mode = 1;
            else if (4326 === b) this._mode = 2;
            else if ("dec" !== c && "dms" !== c) this._mode = 3;
            else {
                if (this._mode = 4, window.Proj4js = i, !this.proj4Catalog && !this.proj4Wkid && !this.proj4CustomURL) return void h.publish("viewer/handleError", {
                    source: "MapInfo",
                    error: "MapInfo error::a proj4Catalog/proj4Wkid or custom URL must be defined"
                });
                this.proj4CustomURL ? require([this.proj4CustomURL], d.hitch(this, function() {
                    this._projectionLoaded = !0, this._projection = this.proj4Catalog + ":" + this.proj4Wkid
                })) : require(["http://spatialreference.org/ref/" + this.proj4Catalog.toLowerCase() + "/" + this.proj4Wkid + "/proj4js/"], d.hitch(this, function() {
                    this._projectionLoaded = !0, this._projection = this.proj4Catalog + ":" + this.proj4Wkid
                }))
            }
            this.minWidth && f.set(this.domNode, "minWidth", this.minWidth + "px"), this.showScale && (this._setScale(), a.on("zoom-end", d.hitch(this, "_setScale"))), this.showZoom && (this._setZoom(), a.on("zoom-end", d.hitch(this, "_setZoom"))), a.on("mouse-move, mouse-drag", d.hitch(this, "_setCoords"))
        },
        _setCoords: function(a) {
            var b = a.mapPoint,
                c = this.mode,
                d = this.unitScale;
            switch (this._mode) {
                case 0:
                case 3:
                    this._xCoord(g.round(b.x, d)), this._yCoord(g.round(b.y, d));
                    break;
                case 1:
                    "dms" === c ? (this._xCoord(this._decToDMS(b.getLongitude(), "x")), this._yCoord(this._decToDMS(b.getLatitude(), "y"))) : (this._xCoord(g.round(b.getLongitude(), d)), this._yCoord(g.round(b.getLatitude(), d)));
                    break;
                case 2:
                    "dms" === c ? (this._xCoord(this._decToDMS(b.x, "x")), this._yCoord(this._decToDMS(b.y, "y"))) : (this._xCoord(g.round(b.x, d)), this._yCoord(g.round(b.y, d)));
                    break;
                case 4:
                    this._projectionLoaded && this._project(b)
            }
        },
        _project: function(a) {
            var b = i(i.defs[this._projection]).inverse([a.x, a.y]);
            "dms" === this.mode ? (this._xCoord(this._decToDMS(b[0], "x")), this._yCoord(this._decToDMS(b[1], "y"))) : (this._xCoord(g.round(b[0], this.unitScale)), this._yCoord(g.round(b[1], this.unitScale)))
        },
        _setScale: function() {
            var a = this.map.getScale();
            null === a || isNaN(a) || e.set(this.scaleNode, String(g.format(g.round(a, 0))))
        },
        _setZoom: function() {
            e.set(this.zoomNode, String(this.map.getLevel()))
        },
        _xCoord: function(a) {
            e.set(this.xNode, String(a))
        },
        _yCoord: function(a) {
            e.set(this.yNode, String(a))
        },
        _decToDMS: function(a, b) {
            var c = "?",
                d = Math.abs(a),
                e = parseInt(d, 10),
                f = 60 * (d - e),
                h = parseInt(f, 10),
                i = g.round(60 * (f - h), this.unitScale),
                j = 10 > h ? "0" + h : h,
                k = 10 > i ? "0" + i : i;
            return ("lat" === b || "y" === b) && (c = a > 0 ? "N" : "S"), ("lng" === b || "x" === b) && (c = a > 0 ? "E" : "W"), e + "&deg;" + j + "'" + k + '"&nbsp;' + c
        }
    })
});
