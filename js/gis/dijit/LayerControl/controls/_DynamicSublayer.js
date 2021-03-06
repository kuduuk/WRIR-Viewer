define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/on", "dojo/dom-class", "dojo/dom-style", "dojo/dom-attr", "dojo/fx", "dojo/html", "dijit/Menu", "dijit/MenuItem", "dojo/topic", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/Sublayer.html", "dojo/i18n!./../nls/resource"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = a([m, n], {
        control: null,
        sublayerInfo: null,
        menu: null,
        icons: null,
        templateString: o,
        i18n: p,
        _expandClickHandler: null,
        postCreate: function() {
            this.inherited(arguments);
            var a = this.checkNode;
            g.set(a, "data-sublayer-id", this.sublayerInfo.id), e.add(a, this.control.layer.id + "-layerControlSublayerCheck"), -1 !== c.indexOf(this.control.layer.visibleLayers, this.sublayerInfo.id) ? this._setSublayerCheckbox(!0, a) : this._setSublayerCheckbox(!1, a), d(a, "click", b.hitch(this, function() {
                "checked" === g.get(a, "data-checked") ? this._setSublayerCheckbox(!1, a) : this._setSublayerCheckbox(!0, a), this.control._setVisibleLayers(), this._checkboxScaleRange()
            })), i.set(this.labelNode, this.sublayerInfo.name), this._expandClick(), (0 !== this.sublayerInfo.minScale || 0 !== this.sublayerInfo.maxScale) && (this._checkboxScaleRange(), this.control.layer.getMap().on("zoom-end", b.hitch(this, "_checkboxScaleRange"))), this.control.controlOptions.menu && this.control.controlOptions.menu.length && (e.add(this.labelNode, "menuLink"), e.add(this.iconNode, "menuLink"), this.menu = new j({
                contextMenuForWindow: !1,
                targetNodeIds: [this.labelNode],
                leftClickToOpen: !0
            }), c.forEach(this.control.controlOptions.menu, b.hitch(this, "_addMenuItem")), this.menu.startup())
        },
        _addMenuItem: function(a) {
            var c = new k(a);
            c.set("onClick", b.hitch(this, function() {
                l.publish("LayerControl/" + a.topic, {
                    layer: this.control.layer,
                    subLayer: this.sublayerInfo,
                    iconNode: this.iconNode,
                    menuItem: c
                })
            })), this.menu.addChild(c)
        },
        _expandClick: function() {
            var a = this.icons;
            this._expandClickHandler = d(this.expandClickNode, "click", b.hitch(this, function() {
                var b = this.expandNode,
                    c = this.expandIconNode;
                "none" === f.get(b, "display") ? (h.wipeIn({
                    node: b,
                    duration: 300
                }).play(), e.replace(c, a.collapse, a.expand)) : (h.wipeOut({
                    node: b,
                    duration: 300
                }).play(), e.replace(c, a.expand, a.collapse))
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
    return q
});
//# sourceMappingURL=_DynamicSublayer.map
