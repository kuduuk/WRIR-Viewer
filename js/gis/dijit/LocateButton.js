define(["dojo/_base/declare", "dojo/_base/lang", "esri/dijit/LocateButton", "esri/renderers/SimpleRenderer", "esri/symbols/PictureMarkerSymbol", "esri/layers/GraphicsLayer", "esri/InfoTemplate", "dojo/topic"], function(a, b, c, d, e, f, g, h) {
    return a(null, {
        growlTemplate: "latitude: {latitude}<br/>longitude: {longitude}<br/>accuracy: {accuracy}<br/>altitude: {altitude}<br/>altitude accuracy: {altitudeAccuracy}<br/>heading: {heading}<br/>speed: {speed}",
        constructor: function(a, b) {
            this.options = a, this.parentNode = b
        },
        startup: function() {
            var a = new e("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABJhJREFUeNrcmN9PW2UYx7/n9ATKj7QMMUCxmSxlCRI3BzF6MRO9WOyVN5sJFxqvNCa7MmbphTG78Iprwx+weEMiF8bdLNFojBhNDEwu3ObWjo2uLUXKaIFSCqdnz7e8hx1WdOcUij+e5ElLOe3zyfd93ud9nlezLAte7LOv0S4vZ8VPi0eU72dx5bPiU+Jr9j8+fevpcTS3YALUIy/viUdRn10TvyK+cChgTwL5dOCZNqA7CARbgIB//+8VSkB+A8jmgdw6YFb2AgrcQt1gAsUli4m3E6gnAAx0A61N3qQqloE7WZGqsAvIZR0TuCnPYAJ1UV4u8H2oAzhZB9B+gLcFML2y+9GkwI27BhOomL10g71AfxcO1eaWgJuZx0srcGNPBbOV4tK9emInjxphzL9f7u4ubY1y+j45VV2+RkLR+NuMoeyCil0LpnZfzF6+RkI54RhLWUwx1CjGktDORD/snPo7YyzGZGzF8BhMkUaZV9x9R22M6duRKGqrpjvUqtapg5aEeowxGdvJoquzr6rWgEe1uJ8rFrSy+EYFOp3v+ZnlEW5gr2rthjqQq8eMF7UYvGRBL5jwFbZhFCs76rfqqAQMbAd8MP0aKroGy61qZFhcrf551lBdQvXs8wK1VoFvoYym+5vwT6ceBrMrq36YW+gOtJRGng/ljzej1NOEcrsO0y0cGRTYacNuW9yWB0agUoSaLpiBianfw5l7ydbBvle0Yi6Dn+IT1s8n+ouj588nR441F55rxmaLBlNzWT6URXbB/qpLqAETtbh8VGrih9nwYHi47e33TyErx3Lhfhc6Zl7Ufrs62TaxfiXc9eEHCS4rl1RzoZqDIaJ73UHbbGkkp64/WAqm/7jROvAacGtTzj5Zgrvii5YJq/N1pH/8tvX6rTtBPrtdx071DGaKYkz0zFLOf/LZF7TMn0BqXlqaJJBZLCOVzwEbq7CWwlpmPunns/yO1zhG3cVHEn0rn8bq3DBK0s4UimsoPlzZaboyImFB1tY06/55z4r5JFdYEno7g6W5+HfW9vwGyullbKSkl7knaiXyVdcqv1q9faESn/W53JUHAqPETOgz/eF8KDJYnPnmC6wncrASotRN6aFnRKnclwi9ca545tRQns8adSoWt3t0N8bdxeLJOjX6zrvJQMfq+vJXFy1c/Rz4fhz68kdW3zn/+ugnl5N8hs9qLhVzMMQNBRZh4+amZDCLuf1ZPEc6/YWuSx8npt+MBrMPUn5UKugOXSqNDL+0W2CrpcJD8+gE49wX5TQTPuZSZlGAFZ3Fk0t1/OWhUnFk6EBHEo0MymYNNYzGOGJxWHB7XjIgKzqDdxrYsksCE91QS+6lRjA2GZRN6dJrc5S6xt6bI5YX0xRgEyFFKTrf6x6haIyt+n8OJ2v2ruSEXC1BJD9qY0zGdrLo6i5hwVbtdvbowW6k96i18GQdI+kah1HOfUdljKVaHabUeE2BVaTVwZPDqGPrNswYwzH4jql8r6386i5hku85jDYSzh54HVcFU//NK4JGX6ow0VVOeb9U+VdfQzX44m7cmej/r6vOf+py+JEAAwDRMD/uB0XQuQAAAABJRU5ErkJggg==", 38, 38);
            this.graphics = new f({
                id: "GeoLocationGraphics"
            });
            var h = new d(a);
            h.label = "GPS Position", h.description = "GPS Position", this.graphics.setRenderer(h), this.options.map.addLayer(this.graphics), this.options.graphicsLayer = this.graphics, this.options.infoTemplate = new g("GPS Position", "${*}"), this.options.symbol = null, this.locateButton = new c(this.options, this.parentNode), this.locateButton.startup(), this.locateButton.on("locate", b.hitch(this, "_growlLocation"))
        },
        _growlLocation: function(a) {
            var c = {
                accuracy: a.position.coords.accuracy ? a.position.coords.accuracy : "",
                altitude: a.position.coords.altitude ? a.position.coords.altitude : "",
                altitudeAccuracy: a.position.coords.altitudeAccuracy ? a.position.coords.altitudeAccuracy : "",
                heading: a.position.coords.heading ? a.position.coords.heading : "",
                latitude: a.position.coords.latitude ? a.position.coords.latitude : "",
                longitude: a.position.coords.longitude ? a.position.coords.longitude : "",
                speed: a.position.coords.speed ? a.position.coords.speed : ""
            };
            this.graphics.graphics.length > 0 && (this.graphics.graphics[0].attributes = c), this.options.publishGPSPosition && h.publish("growler/growl", {
                title: "GPS Position",
                message: b.replace(this.growlTemplate, c),
                level: "default",
                timeout: 1e4,
                opacity: 1
            })
        }
    })
});
