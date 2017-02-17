define([
    'esri/dijit/Basemap',
    'esri/dijit/BasemapLayer'
], function(Basemap, BasemapLayer) {
    return {
        map: true,
        mode: 'custom',
        title: 'Basemaps',
        mapStartBasemap: 'streets',
        basemapsToShow: ['streets', 'satellite', 'hybrid', 'lightGray', 'googleStreets', 'googleSatellite', 'googleHybrid', 'googleTerrain', 'naip_2006', 'naip_2009', 'naip_2012', 'naip_2015', 'dem'],
        basemaps: {
            streets: {
                title: 'Streets',
                basemap: new Basemap({
                    id: 'streets',
                    layers: [new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
                    })]
                })
            },
            satellite: {
                title: 'Satellite',
                basemap: new Basemap({
                    id: 'satellite',
                    layers: [new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
                    })]
                })
            },
            hybrid: {
                title: 'Hybrid',
                basemap: new Basemap({
                    id: 'hybrid',
                    layers: [new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
                    }), new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
                        isReference: true,
                        displayLevels: [0, 1, 2, 3, 4, 5, 6, 7]
                    }), new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
                        isReference: true,
                        displayLevels: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                    })]
                })
            },
            lightGray: {
                title: 'Light Gray Canvas',
                basemap: new Basemap({
                    id: 'lightGray',
                    layers: [new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer'
                    }), new BasemapLayer({
                        url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer',
                        isReference: true
                    })]
                })
            },
            googleStreets: {
                title: 'Google Streets',
                basemap: new Basemap({
                    id: 'googleStreets',
                    layers: [new BasemapLayer({
                        url: "http://mt${subDomain}.google.com/vt/lyrs=m&hl=en&gl=en&x=${col}&y=${row}&z=${level}&s=png",
                        copyright: "Google, 2016",
                        id: "googleStreets",
                        subDomains: ["0", "1", "2", "3"],
                        type: "WebTiledLayer"
                    })]
                })
            },
            googleSatellite: {
                title: 'Google Satellite',
                basemap: new Basemap({
                    id: 'googleSatellite',
                    layers: [new BasemapLayer({
                        url: "http://mt${subDomain}.google.com/vt/lyrs=s&hl=en&gl=en&x=${col}&y=${row}&z=${level}&s=png",
                        copyright: "Google, 2016",
                        id: "googleSatellite",
                        subDomains: ["0", "1", "2", "3"],
                        type: "WebTiledLayer"
                    })]
                })
            },
            googleHybrid: {
                title: 'Google Hybrid',
                basemap: new Basemap({
                    id: 'googleHybrid',
                    layers: [new BasemapLayer({
                        url: "http://mt${subDomain}.google.com/vt/lyrs=s,h&hl=en&gl=en&x=${col}&y=${row}&z=${level}&s=png",
                        copyright: "Google, 2016",
                        id: "googleHybrid",
                        subDomains: ["0", "1", "2", "3"],
                        type: "WebTiledLayer"
                    })]
                })
            },
            googleTerrain: {
                title: 'Google Terrain',
                basemap: new Basemap({
                    id: 'googleTerrain',
                    layers: [new BasemapLayer({
                        url: "http://mt${subDomain}.google.com/vt/lyrs=t,r&hl=en&gl=en&x=${col}&y=${row}&z=${level}&s=png",
                        copyright: "Google, 2016",
                        id: "googleTerrain",
                        subDomains: ["0", "1", "2", "3"],
                        type: "WebTiledLayer"
                    })]
                })
            },
            naip_2006: {
                title: "2006 NAIP",
                contentType: "raster", //lcs - Basemap Content Type
                basemap: new Basemap({
                    id: "naip_2006",
                    layers: [new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/Imagery/NAIP_2006/ImageServer"
                    }), new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/BaseData/BaseData/MapServer",
                        isReference: true
                    })]
                })
            },
            naip_2009: {
                title: "2009 NAIP",
                contentType: "raster", //lcs - Basemap Content Type
                basemap: new Basemap({
                    id: "naip_2009",
                    layers: [new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/Imagery/NAIP_2009/ImageServer"
                    }), new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/BaseData/BaseData/MapServer",
                        isReference: true
                    })]
                })
            },
            naip_2012: {
                title: "2012 NAIP",
                contentType: "raster", //lcs - Basemap Content Type
                basemap: new Basemap({
                    id: "naip_2012",
                    layers: [new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/Imagery/NAIP_2012/ImageServer"
                    }), new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/BaseData/BaseData/MapServer",
                        isReference: true
                    })]
                })
            },
            naip_2015: {
                title: "2015 NAIP",
                contentType: "raster", //lcs - Basemap Content Type
                basemap: new Basemap({
                    id: "naip_2015",
                    layers: [new BasemapLayer({
                        url: "https://gis.apfo.usda.gov/arcgis/rest/services/NAIP/Wyoming_2015_05m/ImageServer"
                    }), new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/BaseData/BaseData/MapServer",
                        isReference: true
                    })]
                })
            },
            dem: {
                title: "DEM",
                contentType: "raster", //lcs - Basemap Content Type
                basemap: new Basemap({
                    id: "dem",
                    layers: [new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/BaseData/DEM_10M/ImageServer"
                    }), new BasemapLayer({
                        url: "http://wygiscservices.wygisc.org/arcgis/rest/services/BaseData/BaseData/MapServer",
                        isReference: true
                    })]
                })
            }

        }
    };
});
