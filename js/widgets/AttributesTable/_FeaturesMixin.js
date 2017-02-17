define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/topic'

], function (
    declare,
    lang,
    topic
) {

    return declare(null, {

        featureOptions: {},

        defaultFeatureOptions: {

            // show the features that were the results of the search
            features: true,

            // Allow records to be selected in the grid
            selected: true,

            // Allow the user to highlight features that have been selected in the grid
            highlighted: true,

            // show the source feature used in the search
            source: true,

            // Allow the creation and display of a buffer
            buffer: true,

            // Allow the display of an info window when a feature is selected
            infoWindow: true,

            // Allow StreetView when tehre is a single selected feature
            streetView: true
        },

        features: [],
        selectedFeatures: [],

        getFeaturesConfiguration: function (options) {
            this.featureOptions = this.mixinDeep(lang.clone(this.defaultFeatureOptions), options);
            if (this.featureOptions.features === false) {
                this.featureOptions.selected = false;
                this.featureOptions.highlighted = false;
            }
        },

        getFeaturesFromResults: function () {
            var results = this.results;
            var features = this.features || [];

            if (results.features) {
                features = features.concat(results.features);
            } else if (this.queryParameters && this.queryParameters.type === 'relationship') {
                for (var key in results) {
                    if (results.hasOwnProperty(key)) {
                        var item = results[key];
                        if (item.features) {
                            features = features.concat(item.features);
                        }
                    }
                }
            } else if ((results.length > 0) && (results[0].feature)) {
                var k = 0, len = results.length, result = null;
                var feature = null, attributes = null;
                this.idProperty = 'recID-' + Math.random();
                for (k = 0; k < len; k++) {
                    result = results[k];
                    feature = result.feature;
                    attributes = feature.attributes;
                    attributes[this.idProperty] = k;
                    if (!attributes.value) {
                        attributes.value = result.value;
                    }
                    if (!attributes.displayFieldName) {
                        attributes.displayFieldName = result.displayFieldName;
                    }
                    if (!attributes.foundFieldName) {
                        attributes.foundFieldName = result.foundFieldName;
                    }
                    if (!attributes.layerName) {
                        attributes.layerName = result.layerName;
                    }
                    features.push(feature);
                }
            }

            this.features = features;
            return features;
        },

        getFeatures: function () {
            return this.features;
        },

        getSelectedFeatures: function () {
            return this.selectedFeatures;
        },

        getFeatureCount: function () {
            return (this.features && this.features.length) ? this.features.length : 0;
        },

        clearFeatures: function (specificFeatures) {
            this.clearFeatureGraphics(specificFeatures);
            this.clearSelectedFeatures();
            this.features = [];
            topic.publish(this.attributesContainerID + '/tableUpdated', this);
        },

        clearSelectedFeatures: function () {
            if (this.grid && this.grid.clearSelection) {
                this.grid.clearSelection();
            }
            this.clearSelectedGraphics();
            this.selectedFeatures = [];
            topic.publish(this.attributesContainerID + '/tableUpdated', this);
        },

        doneSelectingFeatures: function (zoom) {
            if (this.selectedFeatures.length < 1) {
                this.setToolbarButtons();
                return;
            }

            this.showAllGraphics();

            var zoomCenter,
                zoomExtent = this.getGraphicsExtent(this.selectedGraphics);
            if (zoomExtent) {
                zoomCenter = zoomExtent.getCenter();
            }
            if (zoom && this.toolbarOptions.zoom.selected) {
                this.zoomToSelectedGraphics();
            }

            this.setToolbarButtons();
            topic.publish(this.attributesContainerID + '/tableUpdated', this);

            // publish the results of our selection
            var sv = (zoom && this.selectedFeatures.length === 1) ? this.featureOptions.streetView : false;
            topic.publish(this.topicID + '/selectFeatures', {
                selectedFeatures: this.selectedFeatures,
                graphics: this.selectedGraphics.graphics,
                extent: zoomExtent,
                mapPoint: zoomCenter,
                allowStreetView: sv
            });

        }
    });
});
