define(["dojo/_base/declare", "dijit/Dialog"], function(a, b) {
    return a([b], {
        declaredClass: "gis.dijit.FloatingWidget",
        title: "Floating Widget",
        draggable: !0,
        "class": "floatingWidget",
        close: function() {
            this.hide();
        },
        focus: function() {}
    });
});
//# sourceMappingURL=FloatingWidgetDialog.map
