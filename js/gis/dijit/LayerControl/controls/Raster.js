define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_Contained", "./_Control"], function(a, b, c, d, e) {
    var f = a([b, c, d, e], {
        _layerType: "overlay",
        _esriLayerType: "raster",
        _layerTypeInit: function() {
            this._expandRemove()
        }
    });
    return f
});
//# sourceMappingURL=Raster.map
