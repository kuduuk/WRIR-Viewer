define(["dojo/_base/declare", "dojo/_base/lang", "dojo/on", "dojo/topic", "dojo/dom-construct", "dojo/dom-style", "dojo/dom-class", "dojo/dom-attr", "dojo/fx", "dojo/html", "./../plugins/LayerMenu", "dojo/text!./templates/Control.html"], function(a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = a([], {
        templateString: l,
        controller: null,
        layer: null,
        layerTitle: "Layer Title",
        controlOptions: null,
        layerMenu: null,
        icons: null,
        _reorderUp: null,
        _reorderDown: null,
        _scaleRangeHandler: null,
        _expandClickHandler: null,
        constructor: function(a) {
            a.controller && (this.icons = a.controller.icons)
        },
        postCreate: function() {
            return this.inherited(arguments), this.controller ? this.layer ? void(this.layer.loaded ? this._initialize() : this.layer.on("load", b.hitch(this, "_initialize"))) : (d.publish("viewer/handleError", {
                source: "LayerControl/_Control",
                error: "layer option is required"
            }), void this.destroy()) : (d.publish("viewer/handleError", {
                source: "LayerControl/_Control",
                error: "controller option is required"
            }), void this.destroy());
        },
        _initialize: function() {
            this._layerTypePreInit && this._layerTypePreInit();
            var a = this.layer,
                d = this.controlOptions;
            this._setLayerCheckbox(a, this.checkNode), c(this.checkNode, "click", b.hitch(this, "_setLayerVisibility", a, this.checkNode)), j.set(this.labelNode, this.layerTitle), a.on("update-start", b.hitch(this, function() {
                f.set(this.layerUpdateNode, "display", "inline-block")
            })), a.on("update-end", b.hitch(this, function() {
                f.set(this.layerUpdateNode, "display", "none")
            })), d.noMenu !== !0 && this.controller.noMenu !== !0 || this.controller.noMenu === !0 && d.noMenu === !1 ? (this.layerMenu = new k({
                control: this,
                contextMenuForWindow: !1,
                targetNodeIds: [this.menuNode],
                leftClickToOpen: !0
            }), this.layerMenu.startup()) : (g.remove(this.menuNode, "fa, layerControlMenuIcon, " + this.icons.menu), f.set(this.menuClickNode, "cursor", "default")), (0 !== a.minScale || 0 !== a.maxScale) && (this._checkboxScaleRange(), this._scaleRangeHandler = a.getMap().on("zoom-end", b.hitch(this, "_checkboxScaleRange"))), this.layer.on("scale-range-change", b.hitch(this, function() {
                0 !== a.minScale || 0 !== a.maxScale ? (this._checkboxScaleRange(), this._scaleRangeHandler = a.getMap().on("zoom-end", b.hitch(this, "_checkboxScaleRange"))) : (this._checkboxScaleRange(), this._scaleRangeHandler && (this._scaleRangeHandler.remove(), this._scaleRangeHandler = null))
            })), this._layerTypeInit(), d.expanded && d.sublayers && this.expandClickNode.click(), a.on("update-start", b.hitch(this, "_updateStart")), a.on("update-end", b.hitch(this, "_updateEnd")), a.on("visibility-change", b.hitch(this, "_visibilityChange"))
        },
        _expandClick: function() {
            var a = this.icons;
            this._expandClickHandler = c(this.expandClickNode, "click", b.hitch(this, function() {
                var b = this.expandNode,
                    c = this.expandIconNode;
                "none" === f.get(b, "display") ? (i.wipeIn({
                    node: b,
                    duration: 300
                }).play(), g.replace(c, a.collapse, a.expand)) : (i.wipeOut({
                    node: b,
                    duration: 300
                }).play(), g.replace(c, a.expand, a.collapse))
            }))
        },
        _expandRemove: function() {
            g.remove(this.expandIconNode, ["fa", this.icons.expand, "layerControlToggleIcon"]), f.set(this.expandClickNode, "cursor", "default"), e.destroy(this.expandNode)
        },
        _setLayerVisibility: function(a, b) {
            a.visible ? (this._setLayerCheckbox(a, b), a.hide(), d.publish("layerControl/layerToggle", {
                id: a.id,
                visible: a.visible
            })) : (this._setLayerCheckbox(a, b), a.show(), d.publish("layerControl/layerToggle", {
                id: a.id,
                visible: a.visible
            })), (0 !== a.minScale || 0 !== a.maxScale) && this._checkboxScaleRange()
        },
        _setLayerCheckbox: function(a, b) {
            var c = this.icons;
            a.visible ? (h.set(b, "data-checked", "checked"), g.replace(b, c.checked, c.unchecked)) : (h.set(b, "data-checked", "unchecked"), g.replace(b, c.unchecked, c.checked))
        },
        _checkboxScaleRange: function() {
            var a = this.checkNode,
                b = this.layer,
                c = b.getMap().getScale(),
                d = b.minScale,
                e = b.maxScale;
            g.remove(a, "layerControlCheckIconOutScale"), (0 !== d && c > d || 0 !== e && e > c) && g.add(a, "layerControlCheckIconOutScale")
        },
        _updateStart: function() {
            this._layerState = b.clone({
                visible: this.layer.visible,
                visibleLayers: this.layer.visibleLayers || null
            })
        },
        _updateEnd: function() {
            return this._layerState ? void 0 : void(this._layerState = null)
        },
        _visibilityChange: function(a) {
            (a.visible && "unchecked" === h.get(this.checkNode, "data-checked") || !a.visible && "checked" === h.get(this.checkNode, "data-checked")) && this._setLayerCheckbox(this.layer, this.checkNode)
        }
    });
    return m
});
//# sourceMappingURL=_Control.map
