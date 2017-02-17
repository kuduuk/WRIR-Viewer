define(["esri/map", "dojo/dom", "dojo/dom-style", "dojo/dom-geometry", "dojo/dom-class", "dojo/on", "dojo/_base/array", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "gis/dijit/FloatingTitlePane", "dojo/_base/lang", "dojo/text!./templates/mapOverlay.html", "gis/dijit/FloatingWidgetDialog", "put-selector", "dojo/aspect", "dojo/has", "dojo/topic", "esri/dijit/PopupMobile", "dijit/Menu", "esri/IdentityManager"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    return {
        legendLayerInfos: [],
        editorLayerInfos: [],
        identifyLayerInfos: [],
        layerControlLayerInfos: [],
        panes: {
            left: {
                id: "sidebarLeft",
                placeAt: "outer",
                collapsible: !0,
                region: "left"
            },
            center: {
                id: "mapCenter",
                placeAt: "outer",
                region: "center",
                content: l
            }
        },
        collapseButtons: {},
        startup: function(a) {
            this.config = a, this.mapClickMode = {
                current: a.defaultMapClickMode,
                defaultMode: a.defaultMapClickMode
            }, p("touch") && (p("ios") || p("android") || p("bb")) && (p.add("mobile", !0), screen.availWidth < 500 || screen.availHeight < 500 ? p.add("phone", !0) : p.add("tablet", !0)), a.titles && this.addTitles(), this.addTopics(), this.initPanes(), a.isDebug && (window.app = this);
        },
        addTopics: function() {
            q.subscribe("viewer/togglePane", k.hitch(this, function(a) {
                this.togglePane(a.pane, a.show);
            })), q.subscribe("viewer/loadWidget", k.hitch(this, function(a) {
                this.widgetLoader(a.options, a.position);
            })), this.config.isDebug && q.subscribe("viewer/handleError", k.hitch(this, "handleError")), q.subscribe("mapClickMode/setCurrent", k.hitch(this, function(a) {
                this.mapClickMode.current = a, q.publish("mapClickMode/currentSet", a);
            })), q.subscribe("mapClickMode/setDefault", k.hitch(this, function() {
                q.publish("mapClickMode/setCurrent", this.mapClickMode.defaultMode);
            }));
        },
        addTitles: function() {
            var a = this.config.titles;
            if (a.header) {
                var c = b.byId("headerTitleSpan");
                c && (c.innerHTML = a.header);
            }
            if (a.subHeader) {
                var d = b.byId("subHeaderTitleSpan");
                d && (d.innerHTML = a.subHeader);
            }
            a.pageTitle && (document.title = a.pageTitle);
        },
        initPanes: function() {
            var a, b = this.config.panes || {};
            for (a in this.panes) this.panes.hasOwnProperty(a) && (b[a] = k.mixin(this.panes[a], b[a]));
            this.panes.outer = new h({
                id: "borderContainerOuter",
                design: "sidebar",
                gutters: !1
            }).placeAt(document.body);
            var c, d, g;
            for (a in b) b.hasOwnProperty(a) && (c = k.clone(b[a]), d = this.panes[c.placeAt] || this.panes.outer, c.id = c.id || a, g = c.type, delete c.placeAt, delete c.type, delete c.collapsible, d && ("border" === g ? this.panes[a] = new h(c).placeAt(d) : c.region && (this.panes[a] = new i(c).placeAt(d))));
            this.panes.outer.startup(), this.initMap(), this.collapseButtonsPane = this.config.collapseButtonsPane || "outer";
            for (a in b)
                if (b.hasOwnProperty(a)) {
                    if (b[a].collapsible) {
                        if (this.collapseButtons[a] = n(this.panes[this.collapseButtonsPane].domNode, "div.sidebarCollapseButton.sidebar" + a + "CollapseButton.sidebarCollapseButton" + ("bottom" === a || "top" === a ? "Vert" : "Horz") + " div.dijitIcon.button.close").parentNode, f(this.collapseButtons[a], "click", k.hitch(this, "togglePane", a)), this.positionSideBarToggle(a), "outer" === this.collapseButtonsPane) {
                            var j = this.panes[a]._splitterWidget;
                            j && (o.after(j, "_startDrag", k.hitch(this, "splitterStartDrag", a)), o.after(j, "_stopDrag", k.hitch(this, "splitterStopDrag", a)));
                        }
                        void 0 !== b[a].open && this.togglePane(a, b[a].open);
                    }
                    "center" !== a && this.panes[a]._splitterWidget && (e.add(this.map.root.parentNode, "pane" + a), "right" === a && this.panes.top && e.add(this.panes.top.domNode, "pane" + a), "right" === a && this.panes.bottom && e.add(this.panes.bottom.domNode, "pane" + a), "left" === a && this.panes.top && e.add(this.panes.top.domNode, "pane" + a), "left" === a && this.panes.bottom && e.add(this.panes.bottom.domNode, "pane" + a));
                }
            window.matchMedia && (window.matchMedia("(max-width: 991px)").addListener(k.hitch(this, "repositionSideBarButtons")), window.matchMedia("(max-width: 767px)").addListener(k.hitch(this, "repositionSideBarButtons"))), this.panes.outer.resize();
        },
        initMap: function() {
            p("phone") && !this.config.mapOptions.infoWindow && (this.config.mapOptions.infoWindow = new r(null, n("div"))), this.map = new a("mapCenter", this.config.mapOptions), this.config.mapOptions.basemap ? this.map.on("load", k.hitch(this, "initLayers")) : this.initLayers(), this.config.operationalLayers && this.config.operationalLayers.length > 0 ? f.once(this.map, "layers-add-result", k.hitch(this, "initWidgets")) : this.initWidgets();
        },
        initLayers: function() {
            this.map.on("resize", function(a) {
                var b = a.target.extent.getCenter();
                setTimeout(function() {
                    a.target.centerAt(b);
                }, 100);
            }), this.layers = [];
            var a = {
                    csv: "CSV",
                    dataadapter: "DataAdapterFeature",
                    dynamic: "ArcGISDynamicMapService",
                    feature: "Feature",
                    georss: "GeoRSS",
                    image: "ArcGISImageService",
                    imagevector: "ArcGISImageServiceVector",
                    kml: "KML",
                    label: "Label",
                    mapimage: "MapImage",
                    osm: "OpenStreetMap",
                    raster: "Raster",
                    stream: "Stream",
                    tiled: "ArcGISTiledMapService",
                    webtiled: "WebTiled",
                    wms: "WMS",
                    wmts: "WMTS"
                },
                b = [];
            g.forEach(this.config.operationalLayers, function(c) {
                var d = a[c.type];
                d ? b.push("esri/layers/" + d + "Layer") : this.handleError({
                    source: "Controller",
                    error: 'Layer type "' + c.type + '"" isnot supported: '
                });
            }, this), require(b, k.hitch(this, function() {
                g.forEach(this.config.operationalLayers, function(b) {
                    var c = a[b.type];
                    c && require(["esri/layers/" + c + "Layer"], k.hitch(this, "initLayer", b));
                }, this), this.map.addLayers(this.layers);
            }));
        },
        initLayer: function(a, b) {
            var c = new b(a.url, a.options);
            this.layers.unshift(c);
            var d = !1;
            if ("undefined" != typeof a.legendLayerInfos && "undefined" != typeof a.legendLayerInfos.exclude && (d = a.legendLayerInfos.exclude), !d) {
                var e = {};
                "undefined" != typeof a.legendLayerInfos && "undefined" != typeof a.legendLayerInfos.layerInfo && (e = a.legendLayerInfos.layerInfo);
                var f = k.mixin({
                    layer: c,
                    title: a.title || null
                }, e);
                this.legendLayerInfos.unshift(f);
            }
            if (this.layerControlLayerInfos.unshift({
                    layer: c,
                    type: a.type,
                    title: a.title,
                    controlOptions: a.layerControlLayerInfos
                }), "feature" === a.type) {
                var g = {
                    featureLayer: c
                };
                a.editorLayerInfos && k.mixin(g, a.editorLayerInfos), g.exclude !== !0 && this.editorLayerInfos.push(g);
            }
            if ("dynamic" === a.type || "feature" === a.type) {
                var h = {
                    layer: c,
                    title: a.title
                };
                a.identifyLayerInfos && k.mixin(h, a.identifyLayerInfos), h.exclude !== !0 && this.identifyLayerInfos.push(h);
            }
        },
        initWidgets: function() {
            var a, b = [];
            for (var c in this.config.widgets)
                if (this.config.widgets.hasOwnProperty(c)) {
                    var d = k.clone(this.config.widgets[c]);
                    d.include && (d.position = "undefined" != typeof d.position ? d.position : 1e4, b.push(d));
                }
            for (var e in this.panes) !this.panes.hasOwnProperty(e) || "outer" === e && "center" === e || (a = g.filter(b, function(a) {
                return a.placeAt && a.placeAt === e;
            }), a.sort(function(a, b) {
                return a.position - b.position;
            }), g.forEach(a, function(a, b) {
                this.widgetLoader(a, b);
            }, this));
            a = g.filter(b, function(a) {
                return !a.placeAt;
            }), a.sort(function(a, b) {
                return a.position - b.position;
            }), g.forEach(a, function(a, b) {
                this.widgetLoader(a, b);
            }, this);
        },
        togglePane: function(a, b) {
            if (this.panes[a]) {
                var d = this.panes[a].domNode;
                if (d) {
                    var e = b && "string" == typeof b ? b : "none" === c.get(d, "display") ? "block" : "none";
                    c.set(d, "display", e), this.panes[a]._splitterWidget && c.set(this.panes[a]._splitterWidget.domNode, "display", e), this.positionSideBarToggle(a), this.panes.outer && this.panes.outer.resize();
                }
            }
        },
        positionSideBarToggle: function(a) {
            var b = this.panes[a],
                f = this.collapseButtons[a];
            if (b && f) {
                var g = c.get(b.domNode, "display"),
                    h = "none" === g ? "close" : "open",
                    i = "none" === g ? "open" : "close";
                if (e.remove(f.children[0], h), e.add(f.children[0], i), "outer" === this.collapseButtonsPane) {
                    var j = b._splitterWidget ? 0 : -1,
                        k = "bottom" === a || "top" === a ? "h" : "w";
                    "block" === g && (j += d.getMarginBox(b.domNode)[k]), b._splitterWidget && (j += d.getMarginBox(b._splitterWidget.domNode)[k]), c.set(f, a, j.toString() + "px"), c.set(f, "display", "block");
                }
            }
        },
        repositionSideBarButtons: function() {
            var a = ["left", "right", "top", "bottom"];
            g.forEach(a, k.hitch(this, function(a) {
                this.positionSideBarToggle(a);
            }));
        },
        splitterStartDrag: function(a) {
            var b = this.collapseButtons[a];
            c.set(b, "display", "none");
        },
        splitterStopDrag: function(a) {
            this.positionSideBarToggle(a);
        },
        _createTitlePaneWidget: function(a, b, c, d, e, f) {
            var g, h = {
                title: b || "Widget",
                open: d || !1,
                canFloat: e || !1
            };
            return a && (h.id = a), "string" == typeof f && (f = this.panes[f]), f || (f = this.panes.left), f && (h.sidebar = f, g = new j(h).placeAt(f, c), g.startup()), g;
        },
        _createFloatingWidget: function(a, b) {
            var c = {
                title: b
            };
            a && (c.id = a);
            var d = new m(c);
            return d.startup(), d;
        },
        _createContentPaneWidget: function(a, b, c, d, e) {
            var f, g = {
                title: b,
                region: d || "center"
            };
            return c && (g.className = c), a && (g.id = a), e ? "string" == typeof e && (e = this.panes[e]) : e = this.panes.sidebar, e && (f = new i(g).placeAt(e), f.startup()), f;
        },
        widgetLoader: function(a, b) {
            var c, d, e = ["titlePane", "contentPane", "floating", "domNode", "invisible", "map"];
            return g.indexOf(e, a.type) < 0 ? void this.handleError({
                source: "Controller",
                error: 'Widget type "' + a.type + '" (' + a.title + ") at position " + b + " is not supported."
            }) : (("titlePane" === a.type || "contentPane" === a.type || "floating" === a.type) && a.id && a.id.length > 0 && (c = a.id + "_parent", "titlePane" === a.type ? d = this._createTitlePaneWidget(c, a.title, b, a.open, a.canFloat, a.placeAt) : "contentPane" === a.type ? d = this._createContentPaneWidget(c, a.title, a.className, a.region, a.placeAt) : "floating" === a.type && (d = this._createFloatingWidget(c, a.title)), a.parentWidget = d), void("string" == typeof a.options ? require([a.options, a.path], k.hitch(this, "createWidget", a)) : require([a.path], k.hitch(this, "createWidget", a, a.options))));
        },
        createWidget: function(a, b, c) {
            b.id = a.id + "_widget", b.parentWidget = a.parentWidget, b.map && (b.map = this.map), b.mapRightClickMenu && (this.mapRightClickMenu || (this.mapRightClickMenu = new s({
                targetNodeIds: [this.map.root],
                selector: ".layersDiv"
            }), this.mapRightClickMenu.startup()), b.mapRightClickMenu = this.mapRightClickMenu), b.mapClickMode && (b.mapClickMode = this.mapClickMode.current), b.legendLayerInfos && (b.layerInfos = this.legendLayerInfos), b.layerControlLayerInfos && (b.layerInfos = this.layerControlLayerInfos), b.editorLayerInfos && (b.layerInfos = this.editorLayerInfos), b.identifyLayerInfos && (b.layerInfos = this.identifyLayerInfos);
            var d = b.parentWidget;
            "titlePane" === a.type || "contentPane" === a.type || "floating" === a.type ? this[a.id] = new c(b, n("div")).placeAt(d.containerNode) : "domNode" === a.type ? this[a.id] = new c(b, a.srcNodeRef) : this[a.id] = new c(b), this[a.id] && this[a.id].startup && !this[a.id]._started && this[a.id].startup();
        },
        handleError: function(a) {
            if (this.config.isDebug && "object" == typeof console)
                for (var b in a) a.hasOwnProperty(b);
        }
    };
});
//# sourceMappingURL=Controller.map
