define(["dojo/_base/declare", "dijit/_WidgetBase", "esri/dijit/Measurement", "dojo/aspect", "dojo/_base/lang", "dojo/dom-construct", "dojo/topic"], function(a, b, c, d, e, f, g) {
    return a([b], {
        declaredClass: "gis.dijit.Measurement",
        mapClickMode: null,
        postCreate: function() {
            this.inherited(arguments), this.measure = new c({
                map: this.map,
                defaultAreaUnit: this.defaultAreaUnit,
                defaultLengthUnit: this.defaultLengthUnit
            }, f.create("div")).placeAt(this.domNode), this.measure.startup(), d.after(this.measure, "setTool", e.hitch(this, "checkMeasureTool")), d.after(this.measure, "closeTool", e.hitch(this, "checkMeasureTool")), this.own(g.subscribe("mapClickMode/currentSet", e.hitch(this, "setMapClickMode"))), this.parentWidget && this.parentWidget.toggleable && this.own(d.after(this.parentWidget, "toggle", e.hitch(this, function() {
                this.onLayoutChange(this.parentWidget.open);
            })))
        },
        checkMeasureTool: function() {
            this.measure.activeTool && "" !== this.measure.activeTool ? "measure" !== this.mapClickMode && this.disconnectMapClick() : "measure" === this.mapClickMode && this.connectMapClick()
        },
        disconnectMapClick: function() {
            g.publish("mapClickMode/setCurrent", "measure");
        },
        connectMapClick: function() {
            g.publish("mapClickMode/setDefault");
        },
        onLayoutChange: function(a) {
            a || "measure" !== this.mapClickMode || this.connectMapClick()
        },
        setMapClickMode: function(a) {
            this.mapClickMode = a, "measure" !== a && (this.measure.setTool("area", !1), this.measure.setTool("distance", !1), this.measure.setTool("location", !1), this.measure.clearResult())
        }
    });
});
//# sourceMappingURL=Measurement.map
