define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "esri/tasks/PrintTask", "dojo/store/Memory", "dojo/_base/lang", "dojo/_base/array", "dojo/topic", "dojo/dom-style", "dojo/dom-construct", "dojo/dom-class", "dojo/text!./Print/templates/Print.html", "dojo/text!./Print/templates/PrintResult.html", "esri/tasks/PrintTemplate", "esri/tasks/PrintParameters", "esri/request", "dojo/i18n!./Print/nls/resource", "dijit/form/Form", "dijit/form/FilteringSelect", "dijit/form/ValidationTextBox", "dijit/form/NumberTextBox", "dijit/form/Button", "dijit/form/CheckBox", "dijit/ProgressBar", "dijit/form/DropDownButton", "dijit/TooltipDialog", "dijit/form/RadioButton", "xstyle/css!./Print/css/Print.css"], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, PrintTask, Memory, lang, array, topic, Style, domConstruct, domClass, printTemplate, printResultTemplate, PrintTemplate, PrintParameters, esriRequest, i18n) {
    var PrintDijit = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            widgetsInTemplate: !0,
            templateString: printTemplate,
            i18n: i18n,
            map: null,
            count: 1,
            results: [],
            authorText: null,
            copyrightText: null,
            defaultTitle: null,
            defaultFormat: null,
            defaultLayout: null,
            baseClass: "gis_PrintDijit",
            pdfIcon: require.toUrl("gis/dijit/Print/images/pdf.png"),
            imageIcon: require.toUrl("gis/dijit/Print/images/image.png"),
            printTaskURL: null,
            printTask: null,
            postCreate: function() {
                this.inherited(arguments), this.printparams = new PrintParameters, this.printparams.map = this.map, this.printparams.outSpatialReference = this.map.spatialReference, esriRequest({
                    url: this.printTaskURL,
                    content: {
                        f: "json"
                    },
                    handleAs: "json",
                    callbackParamName: "callback",
                    load: lang.hitch(this, "_handlePrintInfo"),
                    error: lang.hitch(this, "_handleError")
                })
            },
            operationalLayersInspector: function(a) {
                return array.forEach(a, function(a) {
                    "Measurement_graphicslayer" == a.id && array.forEach(a.featureCollection.layers, function(a) {
                        array.forEach(a.featureSet.features, function(a) {
                            delete a.attributes, a.symbol.font.family = "Courier"
                        })
                    })
                }), a
            },
            _handleError: function(a) {
                topic.publish("viewer/handleError", {
                    source: "Print",
                    error: a
                })
            },
            _handlePrintInfo: function(a) {
                this.printTask = new PrintTask(this.printTaskURL, {
                    async: "esriExecutionTypeAsynchronous" === a.executionType
                });
                var b = array.filter(a.parameters, function(a) {
                    return "Layout_Template" === a.name
                });
                if (0 === b.length) return void topic.publish("viewer/handleError", {
                    source: "Print",
                    error: "Print service parameters name for templates must be 'Layout_Template'"
                });
                var c = array.map(b[0].choiceList, function(a) {
                    return {
                        name: a,
                        id: a
                    }
                });
                c.sort(function(a, b) {
                    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                });
                var d = new Memory({
                    data: c
                });
                this.layoutDijit.set("store", d), this.defaultLayout ? this.layoutDijit.set("value", this.defaultLayout) : this.layoutDijit.set("value", b[0].defaultValue);
                var e = array.filter(a.parameters, function(a) {
                    return "Format" === a.name
                });
                if (0 === e.length) return void topic.publish("viewer/handleError", {
                    source: "Print",
                    error: "Print service parameters name for format must be 'Format'"
                });
                var f = array.map(e[0].choiceList, function(a) {
                    return {
                        name: a,
                        id: a
                    }
                });
                f.sort(function(a, b) {
                    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                });
                var g = new Memory({
                    data: f
                });
                this.formatDijit.set("store", g), this.defaultFormat ? this.formatDijit.set("value", this.defaultFormat) : this.formatDijit.set("value", e[0].defaultValue)
            },
            print: function() {
                if (this.printSettingsFormDijit.isValid()) {
                    var form = this.printSettingsFormDijit.get("value"),
                        preserve = this.preserveFormDijit.get("value");
                    lang.mixin(form, preserve);
                    var layoutForm = this.layoutFormDijit.get("value"),
                        mapQualityForm = this.mapQualityFormDijit.get("value"),
                        mapOnlyForm = this.mapOnlyFormDijit.get("value");
                    lang.mixin(mapOnlyForm, mapQualityForm);
                    var template = new PrintTemplate;
                    template.format = form.format, template.layout = form.layout, template.preserveScale = eval(form.preserveScale), template.label = form.title, template.exportOptions = mapOnlyForm, template.layoutOptions = {
                        authorText: this.authorText,
                        copyrightText: this.copyrightText,
                        legendLayers: layoutForm.legend.length > 0 && layoutForm.legend[0] ? null : [],
                        titleText: form.title,
                        scalebarUnit: layoutForm.scalebarUnit
                    }, this.printparams.template = template;
                    var fileHandle = this.printTask.execute(this.printparams),
                        result = new PrintResultDijit({
                            count: this.count.toString(),
                            icon: "PDF" === form.format ? this.pdfIcon : this.imageIcon,
                            docName: form.title,
                            title: form.format + ", " + form.layout,
                            fileHandle: fileHandle
                        }).placeAt(this.printResultsNode, "last");
                    this.printTask.async && result.own(this.printTask.printGp.on("status-update", lang.hitch(result, "_handleStatusUpdate"))), Style.set(this.clearActionBarNode, "display", "block"), this.count++
                } else this.printSettingsFormDijit.validate()
            },
            clearResults: function() {
                domConstruct.empty(this.printResultsNode), Style.set(this.clearActionBarNode, "display", "none"), this.count = 1
            }
        }),
        PrintResultDijit = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            widgetsInTemplate: !0,
            templateString: printResultTemplate,
            i18n: i18n,
            url: null,
            fileHandle: null,
            postCreate: function() {
                this.inherited(arguments), this.fileHandle.then(lang.hitch(this, "_onPrintComplete"), lang.hitch(this, "_onPrintError"))
            },
            _onPrintComplete: function(a) {
                a.url ? (this.url = a.url, this.nameNode.innerHTML = '<span class="bold">' + this.docName + "</span>", domClass.add(this.resultNode, "printResultHover")) : this._onPrintError(this.i18n.printResults.errorMessage)
            },
            _onPrintError: function(a) {
                topic.publish("viewer/handleError", {
                    source: "Print",
                    error: a
                }), this.nameNode.innerHTML = '<span class="bold">' + i18n.printResults.errorMessage + "</span>", domClass.add(this.resultNode, "printResultError")
            },
            _openPrint: function() {
                null !== this.url && window.open(this.url)
            },
            _handleStatusUpdate: function(a) {
                var b = a.jobInfo.jobStatus;
                "esriJobFailed" === b && this._onPrintError(this.i18n.printResults.errorMessage)
            }
        });
    return PrintDijit
});
//# sourceMappingURL=Print.map
