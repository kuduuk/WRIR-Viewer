define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/topic", "dojo/dom-attr", "dojo/dom-construct", "dijit/_WidgetBase", "dijit/_Container", "dijit/layout/ContentPane", "dijit/form/Button", "esri/tasks/ProjectParameters", "esri/config", "require", "xstyle/css!./LayerControl/css/LayerControl.css"], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = a([g, h], {
        map: null,
        layerInfos: [],
        icons: {
            expand: "fa-plus-square-o",
            collapse: "fa-minus-square-o",
            checked: "fa-check-square-o",
            unchecked: "fa-square-o",
            update: "fa-refresh",
            menu: "fa-bars",
            folder: "fa-folder-o",
            folderOpen: "fa-folder-open-o"
        },
        separated: !1,
        overlayReorder: !1,
        overlayLabel: !1,
        vectorReorder: !1,
        vectorLabel: !1,
        noMenu: null,
        noLegend: null,
        noZoom: null,
        noTransparency: null,
        subLayerMenu: {},
        swipe: null,
        swiperButtonStyle: "position:absolute;top:20px;left:120px;z-index:50;",
        baseClass: "layerControlDijit",
        _vectorContainer: null,
        _overlayContainer: null,
        _swiper: null,
        _swipeLayerToggleHandle: null,
        _controls: {
            dynamic: "./LayerControl/controls/Dynamic",
            feature: "./LayerControl/controls/Feature",
            image: "./LayerControl/controls/Image",
            tiled: "./LayerControl/controls/Tiled",
            csv: "./LayerControl/controls/CSV",
            georss: "./LayerControl/controls/GeoRSS",
            wms: "./LayerControl/controls/WMS",
            kml: "./LayerControl/controls/KML",
            webtiled: "./LayerControl/controls/WebTiled",
            imagevector: "./LayerControl/controls/ImageVector",
            raster: "./LayerControl/controls/Raster",
            stream: "./LayerControl/controls/Stream"
        },
        constructor: function(a) {
            return a = a || {}, a.map ? void 0 : void d.publish("viewer/handleError", {
                source: "LayerControl",
                error: "map option is required"
            })
        },
        postCreate: function() {
            if (this.inherited(arguments), this.separated) {
                var e = a([g, h]);
                this.vectorLabel !== !1 && this.addChild(new i({
                    className: "vectorLabelContainer",
                    content: this.vectorLabel
                }, f.create("div")), "first"), this._vectorContainer = new e({
                    className: "vectorLayerContainer"
                }, f.create("div")), this.addChild(this._vectorContainer, "last"), this.overlayLabel !== !1 && this.addChild(new i({
                    className: "overlayLabelContainer",
                    content: this.overlayLabel
                }, f.create("div")), "last"), this._overlayContainer = new e({
                    className: "overlayLayerContainer"
                }, f.create("div")), this.addChild(this._overlayContainer, "last")
            } else this.overlayReorder = !1, this.vectorReorder = !1;
            var j = [];
            b.forEach(this.layerInfos, function(a) {
                var b = a.controlOptions;
                if (!b || b.exclude !== !0) {
                    var c = this._controls[a.type];
                    c ? j.push(c) : d.publish("viewer/handleError", {
                        source: "LayerControl",
                        error: 'the layer type "' + a.type + '" is not supported'
                    })
                }
            }, this), m(j, c.hitch(this, function() {
                b.forEach(this.layerInfos, function(a) {
                    var b = a.controlOptions;
                    if (!b || b.exclude !== !0) {
                        var d = this._controls[a.type];
                        d && m([d], c.hitch(this, "_addControl", a))
                    }
                }, this), this._checkReorder()
            }))
        },
        _addControl: function(a, b) {
            var d = new b({
                controller: this,
                layer: "string" == typeof a.layer ? this.map.getLayer(a.layer) : a.layer,
                layerTitle: a.title,
                controlOptions: c.mixin({
                    noLegend: null,
                    noZoom: null,
                    noTransparency: null,
                    swipe: null,
                    expanded: !1,
                    sublayers: !0,
                    menu: this.subLayerMenu[a.type]
                }, a.controlOptions)
            });
            d.startup(), this.separated ? "overlay" === d._layerType ? this._overlayContainer.addChild(d, "first") : this._vectorContainer.addChild(d, "first") : this.addChild(d, "first")
        },
        _moveUp: function(a) {
            var c, d = a.layer.id,
                e = a.domNode;
            "overlay" === a._layerType ? a.getPreviousSibling() && (c = b.indexOf(this.map.layerIds, d), this.map.reorderLayer(d, c + 1), this._overlayContainer.containerNode.insertBefore(e, e.previousSibling), this._checkReorder()) : "vector" === a._layerType && a.getPreviousSibling() && (c = b.indexOf(this.map.graphicsLayerIds, d), this.map.reorderLayer(d, c + 1), this._vectorContainer.containerNode.insertBefore(e, e.previousSibling), this._checkReorder())
        },
        _moveDown: function(a) {
            var c, d = a.layer.id,
                e = a.domNode;
            "overlay" === a._layerType ? a.getNextSibling() && (c = b.indexOf(this.map.layerIds, d), this.map.reorderLayer(d, c - 1), this._overlayContainer.containerNode.insertBefore(e, e.nextSibling.nextSibling), this._checkReorder()) : "vector" === a._layerType && a.getNextSibling() && (c = b.indexOf(this.map.graphicsLayerIds, d), this.map.reorderLayer(d, c - 1), this._vectorContainer.containerNode.insertBefore(e, e.nextSibling.nextSibling), this._checkReorder())
        },
        _checkReorder: function() {
            this.separated && (this.vectorReorder && b.forEach(this._vectorContainer.getChildren(), function(a) {
                a.getPreviousSibling() ? a._reorderUp.set("disabled", !1) : a._reorderUp.set("disabled", !0), a.getNextSibling() ? a._reorderDown.set("disabled", !1) : a._reorderDown.set("disabled", !0)
            }, this), this.overlayReorder && b.forEach(this._overlayContainer.getChildren(), function(a) {
                a.getPreviousSibling() ? a._reorderUp.set("disabled", !1) : a._reorderUp.set("disabled", !0), a.getNextSibling() ? a._reorderDown.set("disabled", !1) : a._reorderDown.set("disabled", !0)
            }, this))
        },
        _zoomToLayer: function(a) {
            if ("esri.layers.KMLLayer" !== a.declaredClass) {
                var b = this.map;
                a.spatialReference === b.spatialReference ? b.setExtent(a.fullExtent, !0) : l.defaults.geometryService ? l.defaults.geometryService.project(c.mixin(new k, {
                    geometries: [a.fullExtent],
                    outSR: b.spatialReference
                }), function(a) {
                    b.setExtent(a[0], !0)
                }, function(a) {
                    d.publish("viewer/handleError", {
                        source: "LayerControl._zoomToLayer",
                        error: a
                    })
                }) : d.publish("viewer/handleError", {
                    source: "LayerControl._zoomToLayer",
                    error: "esriConfig.defaults.geometryService is not set"
                })
            }
        },
        _swipeLayer: function(a, b) {
            a && a.visible && (this._swiper ? (this._swiper.disable(), this._swipeLayerToggleHandle && this._swipeLayerToggleHandle.remove(), this._swiper.set("layers", [a]), this._swiper.set("type", b), this._swiper.enable(), e.set(this._swiper.disableBtn.domNode, "style", this.swiperButtonStyle)) : m(["esri/dijit/LayerSwipe"], c.hitch(this, function(d) {
                this._swiper = new d({
                    type: b || "vertical",
                    map: this.map,
                    layers: [a]
                }, f.create("div", {}, this.map.id, "first")), this._swiper.startup(), this._swiper.disableBtn = new j({
                    label: "Exit Layer Swipe",
                    onClick: c.hitch(this, "_swipeDisable")
                }, f.create("div", {}, this.map.id)), e.set(this._swiper.disableBtn.domNode, "style", this.swiperButtonStyle)
            })), this._swipeLayerToggleHandle = d.subscribe("layerControl/layerToggle", c.hitch(this, function(b) {
                b.id !== a.id || b.visible || this._swipeDisable()
            })))
        },
        _swipeDisable: function() {
            this._swiper.disable(), this._swipeLayerToggleHandle && this._swipeLayerToggleHandle.remove(), e.set(this._swiper.disableBtn.domNode, "style", "display:none;")
        },
        showAllLayers: function() {
            this.separated ? (b.forEach(this._vectorContainer.getChildren(), function(a) {
                a.layer.show()
            }), b.forEach(this._overlayContainer.getChildren(), function(a) {
                a.layer.show()
            })) : b.forEach(this.getChildren(), function(a) {
                a.layer.show()
            })
        },
        hideAllLayers: function() {
            this.separated ? (b.forEach(this._vectorContainer.getChildren(), function(a) {
                a.layer.hide()
            }), b.forEach(this._overlayContainer.getChildren(), function(a) {
                a.layer.hide()
            })) : b.forEach(this.getChildren(), function(a) {
                a.layer.hide()
            })
        }
    });
    return n
});
