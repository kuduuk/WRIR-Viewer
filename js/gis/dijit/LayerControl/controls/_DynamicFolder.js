define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/on", "dojo/dom-class", "dojo/dom-style", "dojo/dom-attr", "dojo/fx", "dojo/html", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/Folder.html"], function(a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = a([j, k], {
        control: null,
        sublayerInfo: null,
        icons: null,
        templateString: l,
        _expandClickHandler: null,
        postCreate: function() {
            this.inherited(arguments);
            var a = this.checkNode;
            g.set(a, "data-sublayer-id", this.sublayerInfo.id), e.add(a, this.control.layer.id + "-layerControlSublayerCheck"), -1 !== c.indexOf(this.control.layer.visibleLayers, this.sublayerInfo.id) ? this._setSublayerCheckbox(!0, a) : this._setSublayerCheckbox(!1, a), d(a, "click", b.hitch(this, function() {
                "checked" === g.get(a, "data-checked") ? this._setSublayerCheckbox(!1, a) : this._setSublayerCheckbox(!0, a), this.control._setVisibleLayers(), this._checkboxScaleRange()
            })), i.set(this.labelNode, this.sublayerInfo.name), this._expandClick(), (0 !== this.sublayerInfo.minScale || 0 !== this.sublayerInfo.maxScale) && (this._checkboxScaleRange(), this.control.layer.getMap().on("zoom-end", b.hitch(this, "_checkboxScaleRange")))
        },
        _expandClick: function() {
            var a = this.icons;
            this._expandClickHandler = d(this.expandClickNode, "click", b.hitch(this, function() {
                var b = this.expandNode,
                    c = this.expandIconNode;
                "none" === f.get(b, "display") ? (h.wipeIn({
                    node: b,
                    duration: 300
                }).play(), e.replace(c, a.folderOpen, a.folder)) : (h.wipeOut({
                    node: b,
                    duration: 300
                }).play(), e.replace(c, a.folder, a.folderOpen))
            }))
        },
        _setSublayerCheckbox: function(a, b) {
            b = b || this.checkNode;
            var c = this.icons;
            a ? (g.set(b, "data-checked", "checked"), e.replace(b, c.checked, c.unchecked)) : (g.set(b, "data-checked", "unchecked"), e.replace(b, c.unchecked, c.checked))
        },
        _checkboxScaleRange: function() {
            var a = this.checkNode,
                b = this.control.layer.getMap().getScale(),
                c = this.sublayerInfo.minScale,
                d = this.sublayerInfo.maxScale;
            e.remove(a, "layerControlCheckIconOutScale"), (0 !== c && b > c || 0 !== d && d > b) && e.add(a, "layerControlCheckIconOutScale")
        }
    });
    return m
});
//# sourceMappingURL=_DynamicFolder.map
