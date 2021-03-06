define(["dojo/_base/declare", "dijit/TitlePane", "dojo/on", "dojo/_base/lang", "dojo/dnd/Moveable", "dojo/aspect", "dojo/topic", "dojo/_base/window", "dojo/window", "dojo/dom-geometry", "dojo/dom-style", "dojo/dom-construct", "dojo/dom-attr", "dojo/dom-class", "xstyle/css!./FloatingTitlePane/css/FloatingTitlePane.css"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    return a([b], {
        sidebarPosition: null,
        postCreate: function() {
            this.canFloat && (this.createDomNodes(), this.own(c(window, "resize", d.hitch(this, "_endDrag")))), this.own(g.subscribe("titlePane/event", d.hitch(this, "_updateWidgetSidebarPosition"))), this.own(f.after(this, "toggle", d.hitch(this, "_afterToggle"))), this.inherited(arguments)
        },
        startup: function() {
            this.titleBarNode && this.canFloat && (this._moveable = new e(this.domNode, {
                delay: 5,
                handle: this.titleBarNode
            }), f.after(this._moveable, "onMove", d.hitch(this, "_dragging"), !0), f.after(this._moveable, "onMoveStop", d.hitch(this, "_endDrag"), !0), f.after(this._moveable, "onMoveStart", d.hitch(this, "_startDrag"), !0), c(document, "mouseup, touchend", d.hitch(this, "_endDrag"))), this.inherited(arguments)
        },
        createDomNodes: function() {
            this.moveHandleNode = l.create("span", {
                title: "Move widget",
                "class": "floatingWidgetPopout"
            }, this.titleNode, "after"), this.dockHandleNode = l.create("span", {
                title: "Dock widget",
                style: "display:none",
                "class": "floatingWidgetDock"
            }, this.titleNode, "after"), this.own(c(this.dockHandleNode, "click", d.hitch(this, function(a) {
                this._dockWidget(), a.stopImmediatePropagation()
            })))
        },
        toggle: function() {
            this.isFloating && this.isDragging || this.inherited(arguments)
        },
        _dockWidget: function() {
            if (!this.isDragging) {
                m.remove(this.domNode, "style"), k.set(this.dockHandleNode, "display", "none"), k.set(this.moveHandleNode, "display", "inline");
                var a = this.sidebar.getChildren();
                (this.sidebarPosition > a.length || this.sidebarPosition < 0) && (this.sidebarPosition = a.length), this.placeAt(this.sidebar, this.sidebarPosition), this.isFloating = !1, this._updateTopic("dock")
            }
        },
        _dragging: function() {
            this.isDragging = !0
        },
        _startDrag: function(a) {
            if (this.titleCursor || (this.titleCursor = k.get(this.titleBarNode, "cursor")), k.set(this.titleBarNode, "cursor", "move"), !this.isFloating) {
                this._checkSidebarPosition(), k.set(this.dockHandleNode, "display", "inline"), k.set(this.moveHandleNode, "display", "none"), k.set(this.domNode, "z-index", "40");
                var b = k.getComputedStyle(this.containerNode),
                    c = parseInt(k.getComputedStyle(this.sidebar.containerNode).width, 10);
                j.setContentSize(this.domNode, {
                    w: c - 2
                }, b), this.isFloating = !0, this.placeAt(h.body());
                var d = k.get(this.titleBarNode, "height");
                k.set(this.domNode, {
                    top: a.marginBox.t - d + "px"
                }), this._updateTopic("undock")
            }
        },
        _endDrag: function() {
            var a = j.position(this.domNode),
                b = i.getBox(this.ownerDocument);
            a.y = Math.min(Math.max(a.y, 0), b.h - a.h), a.x = Math.min(Math.max(a.x, 0), b.w - a.w), this._relativePosition = a, this._position(), k.set(this.titleBarNode, "cursor", this.titleCursor), window.setTimeout(d.hitch(this, function() {
                this.isDragging = !1
            }), 50)
        },
        _position: function() {
            if (!n.contains(this.ownerDocumentBody, "dojoMove")) {
                var a = this.domNode,
                    b = i.getBox(this.ownerDocument),
                    c = this._relativePosition,
                    d = c ? null : j.position(a),
                    e = Math.floor(b.l + (c ? c.x : (b.w - d.w) / 2)),
                    f = Math.floor(b.t + (c ? c.y : (b.h - d.h) / 2));
                k.set(a, {
                    left: e + "px",
                    top: f + "px"
                })
            }
        },
        _updateWidgetSidebarPosition: function(a) {
            var b = a.widgetID,
                c = a.sidebarPosition,
                d = a.action;
            if (b !== this.id && this.canFloat && ("dock" === d || "undock" === d))
                if (this._checkSidebarPosition(), "dock" === d) {
                    var e = this.sidebar.getChildren();
                    c < this.sidebarPosition && this.sidebarPosition < e.length && this.sidebarPosition++
                } else "undock" === d && c < this.sidebarPosition && this.sidebarPosition > 0 && this.sidebarPosition--
        },
        _checkSidebarPosition: function() {
            var a = this.sidebar.getChildren();
            if (null === this.sidebarPosition) {
                var b = 0,
                    c = a.length;
                for (b = 0; c > b; b++) {
                    var d = a[b];
                    d.canFloat && (d.sidebarPosition = b)
                }
            }
        },
        _updateTopic: function(a) {
            g.publish("titlePane/event", {
                category: "Titlepane Event",
                action: a,
                label: this.title,
                widgetID: this.id,
                sidebarPosition: this.sidebarPosition,
                value: a
            })
        },
        _afterToggle: function() {
            var a = this.open ? "open" : "close";
            this._updateTopic(a)
        }
    })
});
//# sourceMappingURL=FloatingTitlePane.map
