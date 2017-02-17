define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/_base/lang", "dijit/DropDownMenu", "dijit/MenuItem", "dojo/_base/array", "dojox/lang/functional", "dojo/text!./Basemaps/templates/Basemaps.html", "esri/dijit/BasemapGallery", "dojo/i18n!./Basemaps/nls/resource", "dijit/form/DropDownButton", "xstyle/css!./Basemaps/css/Basemaps.css"], function(a, b, c, d, e, f, g, h, i, j, k, l) {
    return a([b, c, d], {
        templateString: j,
        widgetsInTemplate: !0,
        i18n: l,
        mode: "custom",
        title: l.title,
        mapStartBasemap: "streets",
        basemapsToShow: ["streets", "satellite", "hybrid", "lightGray"],
        validBasemaps: [],
        postCreate: function() {
            this.inherited(arguments), this.currentBasemap = this.mapStartBasemap || null, "custom" === this.mode && (this.gallery = new k({
                map: this.map,
                showArcGISBasemaps: !1,
                basemaps: i.map(this.basemaps, function(a) {
                    return a.basemap;
                })
            }), this.gallery.startup()), this.menu = new f({
                style: "display: none;"
            }), h.forEach(this.basemapsToShow, function(a) {
                if (this.basemaps.hasOwnProperty(a)) {
                    var b = new g({
                        id: a,
                        label: this.basemaps[a].title,
                        iconClass: a == this.mapStartBasemap ? "selectedIcon" : "emptyIcon",
                        onClick: e.hitch(this, function() {
                            if (a !== this.currentBasemap) {
                                this.currentBasemap = a, "custom" === this.mode ? this.gallery.select(a) : this.map.setBasemap(a);
                                var b = this.menu.getChildren();
                                h.forEach(b, function(b) {
                                    b.id == a ? b.set("iconClass", "selectedIcon") : b.set("iconClass", "emptyIcon");
                                });
                            }
                        })
                    });
                    this.menu.addChild(b);
                }
            }, this), this.dropDownButton.set("dropDown", this.menu);
        },
        startup: function() {
            this.inherited(arguments), "custom" === this.mode ? this.map.getBasemap() !== this.mapStartBasemap && this.gallery.select(this.mapStartBasemap) : this.mapStartBasemap && this.map.getBasemap() !== this.mapStartBasemap && this.map.setBasemap(this.mapStartBasemap);
        }
    });
});
//# sourceMappingURL=Basemaps.map
