define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/_base/lang", "dojo/_base/Color", "esri/toolbars/draw", "esri/layers/GraphicsLayer", "esri/graphic", "esri/renderers/SimpleRenderer", "dojo/text!./Draw/templates/Draw.html", "esri/renderers/UniqueValueRenderer", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/layers/FeatureLayer", "dojo/topic", "dojo/aspect", "dojo/i18n!./Draw/nls/resource", "dijit/form/Button", "xstyle/css!./Draw/css/Draw.css", "xstyle/css!./Draw/css/adw-icons.css"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    return a([b, c, d], {
        widgetsInTemplate: !0,
        templateString: k,
        i18n: s,
        drawToolbar: null,
        mapClickMode: null,
        postCreate: function() {
            this.inherited(arguments), this.drawToolbar = new g(this.map), this.drawToolbar.on("draw-end", e.hitch(this, "onDrawToolbarDrawEnd")), this.createGraphicLayers(), this.own(q.subscribe("mapClickMode/currentSet", e.hitch(this, "setMapClickMode"))), this.parentWidget && this.parentWidget.toggleable && this.own(r.after(this.parentWidget, "toggle", e.hitch(this, function() {
                this.onLayoutChange(this.parentWidget.open);
            })));
        },
        createGraphicLayers: function() {
            this.pointSymbol = new m(m.STYLE_CIRCLE, 10, new n(n.STYLE_SOLID, new f([255, 0, 0]), 1), new f([255, 0, 0, 1])), this.polylineSymbol = new n(n.STYLE_DASH, new f([255, 0, 0]), 1), this.polygonSymbol = new o(o.STYLE_SOLID, new n(n.STYLE_DASHDOT, new f([255, 0, 0]), 2), new f([255, 255, 0, 0])), this.pointGraphics = new h({
                id: "drawGraphics_point",
                title: "Draw Graphics"
            }), this.pointRenderer = new j(this.pointSymbol), this.pointRenderer.label = "User drawn points", this.pointRenderer.description = "User drawn points", this.pointGraphics.setRenderer(this.pointRenderer), this.map.addLayer(this.pointGraphics), this.polylineGraphics = new h({
                id: "drawGraphics_line",
                title: "Draw Graphics"
            }), this.polylineRenderer = new j(this.polylineSymbol), this.polylineRenderer.label = "User drawn lines", this.polylineRenderer.description = "User drawn lines", this.polylineGraphics.setRenderer(this.polylineRenderer), this.map.addLayer(this.polylineGraphics), this.polygonGraphics = new p({
                layerDefinition: {
                    geometryType: "esriGeometryPolygon",
                    fields: [{
                        name: "OBJECTID",
                        type: "esriFieldTypeOID",
                        alias: "OBJECTID",
                        domain: null,
                        editable: !1,
                        nullable: !1
                    }, {
                        name: "ren",
                        type: "esriFieldTypeInteger",
                        alias: "ren",
                        domain: null,
                        editable: !0,
                        nullable: !1
                    }]
                },
                featureSet: null
            }, {
                id: "drawGraphics_poly",
                title: "Draw Graphics",
                mode: p.MODE_SNAPSHOT
            }), this.polygonRenderer = new l(new o, "ren", null, null, ", "), this.polygonRenderer.addValue({
                value: 1,
                symbol: new o({
                    color: [255, 170, 0, 255],
                    outline: {
                        color: [255, 170, 0, 255],
                        width: 1,
                        type: "esriSLS",
                        style: "esriSLSSolid"
                    },
                    type: "esriSFS",
                    style: "esriSFSForwardDiagonal"
                }),
                label: "User drawn polygons",
                description: "User drawn polygons"
            }), this.polygonGraphics.setRenderer(this.polygonRenderer), this.map.addLayer(this.polygonGraphics);
        },
        drawPoint: function() {
            this.disconnectMapClick(), this.drawToolbar.activate(g.POINT), this.drawModeTextNode.innerText = this.i18n.labels.point;
        },
        drawCircle: function() {
            this.disconnectMapClick(), this.drawToolbar.activate(g.CIRCLE), this.drawModeTextNode.innerText = this.i18n.labels.circle;
        },
        drawLine: function() {
            this.disconnectMapClick(), this.drawToolbar.activate(g.POLYLINE), this.drawModeTextNode.innerText = this.i18n.labels.polyline;
        },
        drawFreehandLine: function() {
            this.disconnectMapClick(), this.drawToolbar.activate(g.FREEHAND_POLYLINE), this.drawModeTextNode.innerText = this.i18n.labels.freehandPolyline;
        },
        drawPolygon: function() {
            this.disconnectMapClick(), this.drawToolbar.activate(g.POLYGON), this.drawModeTextNode.innerText = this.i18n.labels.polygon;
        },
        drawFreehandPolygon: function() {
            this.disconnectMapClick(), this.drawToolbar.activate(g.FREEHAND_POLYGON), this.drawModeTextNode.innerText = this.i18n.labels.freehandPolygon;
        },
        disconnectMapClick: function() {
            q.publish("mapClickMode/setCurrent", "draw"), this.enableStopButtons();
        },
        connectMapClick: function() {
            q.publish("mapClickMode/setDefault"), this.disableStopButtons();
        },
        onDrawToolbarDrawEnd: function(a) {
            this.drawToolbar.deactivate(), this.drawModeTextNode.innerText = this.i18n.labels.currentDrawModeNone;
            var b;
            switch (a.geometry.type) {
                case "point":
                    b = new i(a.geometry), this.pointGraphics.add(b);
                    break;
                case "polyline":
                    b = new i(a.geometry), this.polylineGraphics.add(b);
                    break;
                case "polygon":
                    b = new i(a.geometry, null, {
                        ren: 1
                    }), this.polygonGraphics.add(b);
            }
            this.connectMapClick();
        },
        clearGraphics: function() {
            this.endDrawing(), this.connectMapClick(), this.drawModeTextNode.innerText = "None";
        },
        stopDrawing: function() {
            this.drawToolbar.deactivate(), this.drawModeTextNode.innerText = "None", this.connectMapClick();
        },
        endDrawing: function() {
            this.pointGraphics.clear(), this.polylineGraphics.clear(), this.polygonGraphics.clear(), this.drawToolbar.deactivate(), this.disableStopButtons();
        },
        disableStopButtons: function() {
            this.stopDrawingButton.set("disabled", !0), this.eraseDrawingButton.set("disabled", !this.noGraphics());
        },
        enableStopButtons: function() {
            this.stopDrawingButton.set("disabled", !1), this.eraseDrawingButton.set("disabled", !this.noGraphics());
        },
        noGraphics: function() {
            return this.pointGraphics.graphics.length > 0 ? !0 : this.polylineGraphics.graphics.length > 0 ? !0 : this.polygonGraphics.graphics.length > 0 ? !0 : !1;
        },
        onLayoutChange: function(a) {
            a || "draw" === this.mapClickMode && q.publish("mapClickMode/setDefault")
        },
        setMapClickMode: function(a) {
            this.mapClickMode = a;
        }
    });
});
//# sourceMappingURL=Draw.map
