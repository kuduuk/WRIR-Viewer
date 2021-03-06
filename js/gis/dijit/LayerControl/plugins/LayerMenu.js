define(["dojo/_base/declare", "dijit/Menu", "dijit/MenuItem", "dijit/PopupMenuItem", "dijit/MenuSeparator", "./Transparency", "dojo/i18n!./../nls/resource"], function(a, b, c, d, e, f, g) {
    return a(b, {
        control: null,
        _removed: !1,
        postCreate: function() {
            this.inherited(arguments);
            var a = this.control,
                h = a.layer,
                i = a.controlOptions,
                j = a.controller,
                k = a._layerType,
                l = this;
            if (("vector" === k && j.vectorReorder || "overlay" === k && j.overlayReorder) && (a._reorderUp = new c({
                    label: g.moveUp,
                    onClick: function() {
                        j._moveUp(a);
                    }
                }), l.addChild(a._reorderUp), a._reorderDown = new c({
                    label: g.moveDown,
                    onClick: function() {
                        j._moveDown(a);
                    }
                }), l.addChild(a._reorderDown), l.addChild(new e)), a._dynamicToggleMenuItems && a._dynamicToggleMenuItems(l), (i.noZoom !== !0 && j.noZoom !== !0 || j.noZoom === !0 && i.noZoom === !1) && l.addChild(new c({
                    label: g.zoomTo,
                    onClick: function() {
                        j._zoomToLayer(h);
                    }
                })), (i.noTransparency !== !0 && j.noTransparency !== !0 || j.noTransparency === !0 && i.noTransparency === !1) && l.addChild(new f({
                    label: g.transparency,
                    layer: h
                })), i.swipe === !0 || j.swipe === !0 && i.swipe !== !1) {
                var m = new b;
                m.addChild(new c({
                    label: g.layerSwipeVertical,
                    onClick: function() {
                        j._swipeLayer(h, "vertical");
                    }
                })), m.addChild(new c({
                    label: g.layerSwipeHorizontal,
                    onClick: function() {
                        j._swipeLayer(h, "horizontal");
                    }
                })), i.swipeScope === !0 && m.addChild(new c({
                    label: g.layerSwipeScope,
                    onClick: function() {
                        j._swipeLayer(h, "scope");
                    }
                })), l.addChild(new d({
                    label: g.layerSwipe,
                    popup: m
                }));
            }
            i.metadataUrl === !0 && h.url && (l.addChild(new e), l.addChild(new c({
                label: g.metadata,
                onClick: function() {
                    window.open(h.url, "_blank");
                }
            }))), i.metadataUrl && "string" == typeof i.metadataUrl && (l.addChild(new e), l.addChild(new c({
                label: g.metadata,
                onClick: function() {
                    window.open(i.metadataUrl, "_blank");
                }
            })));
            var n = l.getChildren()[l.getChildren().length - 1];
            n && n.isInstanceOf(e) && l.removeChild(n);
        }
    });
});
//# sourceMappingURL=LayerMenu.map
