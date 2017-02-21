define([
    'esri/units',
    'esri/geometry/Extent',
    'esri/config',
    'esri/tasks/GeometryService',
    'esri/layers/ImageParameters'
], function(units, Extent, esriConfig, GeometryService, ImageParameters) {

    // url to your proxy page, must be on same machine hosting you app. See proxy folder for readme.
    esriConfig.defaults.io.proxyUrl = 'proxy/proxy.ashx';
    esriConfig.defaults.io.alwaysUseProxy = false;
    // url to your geometry server.
    esriConfig.defaults.geometryService = new GeometryService('http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer');

    //image parameters for dynamic services, set to png32 for higher quality exports.
    var imageParameters = new ImageParameters();
    imageParameters.format = 'png32';

    return {
        // used for debugging your app
        isDebug: true,

        //default mapClick mode, mapClickMode lets widgets know what mode the map is in to avoid multipult map click actions from taking place (ie identify while drawing).
        defaultMapClickMode: 'identify',
        // map options, passed to map constructor. see: https://developers.arcgis.com/javascript/jsapi/map-amd.html#map1
        mapOptions: {
            navigationMode: 'classic',
            basemap: 'streets',
            center: [-108.7009687497497, 43.3093629694],
            zoom: 9,
            sliderStyle: 'small',
            logo: false
        },
        titles: {
            header: 'Wind River Reservation',
            subHeader: 'Mapping Application',
            pageTitle: 'WRIR Web Map'
        },
        // three 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
        operationalLayers: [{
            type: 'dynamic',
            url: 'https://wygiscservices10-3.wygisc.org/arcgis/rest/services/WRIR/WRIR_Boundary1/MapServer',
            title: 'Reservation Boundary',
            options: {
                id: 'resboundaryLayer',
                opacity: 1.0,
                visible: true
            },
            layerControlLayerInfos: {
                swipe: false,
                metadataUrl: true,
                expanded: true
            }
        }, {

            type: 'dynamic',
            url: 'https://wygiscservices10-3.wygisc.org/arcgis/rest/services/WRIR/WaterResources/MapServer',
            title: 'Irrigation and Water Rights',
            options: {
                id: 'irrigWaterRightsLayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {

            type: 'dynamic',
            url: 'https://wygiscservices10-3.wygisc.org/arcgis/rest/services/WildernessSociety/WildernessSocietyAdminBnds/MapServer',
            title: 'Administrative',
            options: {
                id: 'adminLayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 3, 4, 5, 6, 7, 8]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {

            type: 'dynamic',
            url: 'https://wygiscservices-dev.wygisc.org/arcgis/rest/services/EORI/EORI_BaseLayers/MapServer',
            title: 'Administrative 2',
            options: {
                id: 'admLayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {

            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/WRDS_PLSS/MapServer',
            title: 'Public Land Survey System',
            options: {
                id: 'plssLayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'https://services.gis.ca.gov/arcgis/rest/services/AtmosphereClimate/DroughtMonitor/MapServer',
            title: 'Drought Monitor',
            options: {
                id: 'droughtLayer',
                opacity: 0.5,
                visible: false
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'https://wygiscservices10-3.wygisc.org/arcgis/rest/services/IRMA/IRMA_Geology/MapServer',
            title: 'Geology',
            options: {
                id: 'geologylayer',
                opacity: 0.5,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6, 7]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/WRDS_Landcover/MapServer',
            title: 'Landcover',
            options: {
                id: 'landcoverlayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'https://wygiscservices10-3.wygisc.org/arcgis/rest/services/SuiteWater/Water_Resources/MapServer',
            title: 'Watersheds',
            options: {
                id: 'watershedlayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/WRDS_Water_Resources/MapServer',
            title: 'Water Resources',
            options: {
                id: 'waterResourceslayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/WRDS_Wyoming_NHD/MapServer',
            title: 'National Hydrography Dataset',
            options: {
                id: 'nhdLayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 7, 8, 9]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'https://wygiscservices10-3.wygisc.org/arcgis/rest/services/SuiteWater/Ag_Farming/MapServer',
            title: 'Cropland',
            options: {
                id: 'croplandlayer',
                opacity: 0.5,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/WRDS_Climate_Tools/MapServer',
            title: 'Climate Tools',
            options: {
                id: 'climateToolslayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/Prism_Data_All/MapServer',
            title: 'PRISM Climate data (annual)',
            options: {
                id: 'prismlayer',
                opacity: 0.6,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/PRISM_Precipitation/MapServer',
            title: 'Precipitation (monthly)',
            options: {
                id: 'preciplayer',
                opacity: 0.5,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/PRISM_TempMax/MapServer',
            title: 'Maximum Temperature (monthly)',
            options: {
                id: 'tempMaxlayer',
                opacity: 0.5,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/PRISM_TempMin/MapServer',
            title: 'Minimum Temperature (monthly)',
            options: {
                id: 'tempMinlayer',
                opacity: 0.5,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'http://heraclea.wrds.uwyo.edu:6080/arcgis/rest/services/WRDS/PRISM_TempMean/MapServer',
            title: 'Mean Temperature (montly)',
            options: {
                id: 'tempAvgLayer',
                opacity: 0.5,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'https://geodata.epa.gov/arcgis/rest/services/ORD/ROE_NLCD/MapServer',
            title: 'NLCD',
            options: {
                id: 'nlcdLayer',
                opacity: 0.5,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
        }, {
            type: 'dynamic',
            url: 'https://geodata.epa.gov/ArcGIS/rest/services/ORD/USEPA_Ecoregions_Level_III_and_IV/MapServer/',
            title: 'Ecoregions',
            options: {
                id: 'testlayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }
          }, {
              type: 'dynamic',
              url: 'https://server.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer/',
              title: 'SSURGO',
              options: {
                  id: 'surgor',
                  opacity: 1.0,
                  visible: false
              },
              identifyLayerInfos: {
                  layerIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
              },
              layerControlLayerInfos: {
                  swipe: true,
                  metadataUrl: true,
                  expanded: false
              }
        }, {
            type: 'image',
            url: 'https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer/',
            title: 'Current NDVI',
            options: {
                id: 'ndviLayer',
                opacity: 1.0,
                visible: false
            },
            identifyLayerInfos: {
                layerIds: [0]
            },
            layerControlLayerInfos: {
                swipe: true,
                metadataUrl: true,
                expanded: false
            }

        }],
        // set include:true to load. For titlePane type set position the the desired order in the sidebar
        widgets: {
            growler: {
                include: true,
                id: 'growler',
                type: 'domNode',
                path: 'gis/dijit/Growler',
                srcNodeRef: 'growlerDijit',
                options: {}
            },
            geocoder: {
                include: true,
                id: 'geocoder',
                type: 'domNode',
                path: 'gis/dijit/Geocoder',
                srcNodeRef: 'geocodeDijit',
                options: {
                    map: true,
                    mapRightClickMenu: true,
                    geocoderOptions: {
                        autoComplete: true,
                        arcgisGeocoder: {
                            placeholder: 'Enter an address or place'
                        }
                    }
                }
            },
            identify: {
                include: true,
                id: 'identify',
                type: 'titlePane',
                canFloat: true,
                path: 'gis/dijit/Identify',
                title: 'Identify',
                open: false,
                position: 3,
                options: 'config/identify'
            },
            basemaps: {
                include: true,
                id: 'basemaps',
                type: 'domNode',
                path: 'gis/dijit/Basemaps',
                srcNodeRef: 'basemapsDijit',
                options: 'config/basemaps'
            },
            mapInfo: {
                include: true,
                id: 'mapInfo',
                type: 'domNode',
                path: 'gis/dijit/MapInfo',
                srcNodeRef: 'mapInfoDijit',
                options: {
                    map: true,
                    mode: 'dms',
                    firstCoord: 'y',
                    unitScale: 3,
                    showScale: true,
                    xLabel: '',
                    yLabel: '',
                    minWidth: 286
                }
            },
            scalebar: {
                include: true,
                id: 'scalebar',
                type: 'map',
                path: 'esri/dijit/Scalebar',
                options: {
                    map: true,
                    attachTo: 'bottom-center',
                    scalebarStyle: 'line',
                    scalebarUnit: 'dual'
                }
            },
            locateButton: {
                include: true,
                id: 'locateButton',
                type: 'domNode',
                path: 'gis/dijit/LocateButton',
                srcNodeRef: 'locateButton',
                options: {
                    map: true,
                    publishGPSPosition: true,
                    highlightLocation: true,
                    useTracking: true,
                    geolocationOptions: {
                        maximumAge: 0,
                        timeout: 15000,
                        enableHighAccuracy: true
                    }
                }
            },
            overviewMap: {
                include: true,
                id: 'overviewMap',
                type: 'map',
                path: 'esri/dijit/OverviewMap',
                options: {
                    map: true,
                    attachTo: 'bottom-right',
                    color: '#0000CC',
                    height: 100,
                    width: 125,
                    opacity: 0.30,
                    visible: false
                }
            },
            homeButton: {
                include: true,
                id: 'homeButton',
                type: 'domNode',
                path: 'esri/dijit/HomeButton',
                srcNodeRef: 'homeButton',
                options: {
                    map: true,
                    extent: new Extent({
                        xmin: -12301412.256328698,
                        ymin: 5260442.955035873,
                        xmax: -11914946.641319033,
                        ymax: 5443891.822920207,
                        spatialReference: {
                            wkid: 102100
                        }
                    })
                }
            },
            legend: {
                include: true,
                id: 'legend',
                type: 'titlePane',
                path: 'esri/dijit/Legend',
                title: 'Legend',
                open: false,
                position: 1,
                options: {
                    map: true,
                    legendLayerInfos: true
                }
            },
            layerControl: {
                include: true,
                id: 'layerControl',
                type: 'titlePane',
                path: 'gis/dijit/LayerControl',
                title: 'Layers',
                open: false,
                position: 0,
                options: {
                    map: true,
                    layerControlLayerInfos: true,
                    separated: true,
                    vectorReorder: true,
                    overlayReorder: true
                }

            },
            bookmarks: {
                include: true,
                id: 'bookmarks',
                type: 'titlePane',
                path: 'gis/dijit/Bookmarks',
                title: 'Bookmarks',
                open: false,
                position: 2,
                options: 'config/bookmarks'
            },
            find: {
                include: true,
                id: 'find',
                type: 'titlePane',
                canFloat: true,
                path: 'gis/dijit/Find',
                title: 'Find',
                open: false,
                position: 3,
                options: 'config/find'
            },
            draw: {
                include: true,
                id: 'draw',
                type: 'titlePane',
                canFloat: true,
                path: 'gis/dijit/Draw',
                title: 'Draw',
                open: false,
                position: 4,
                options: {
                    map: true,
                    mapClickMode: true
                }
            },
            measure: {
                include: true,
                id: 'measurement',
                type: 'titlePane',
                canFloat: true,
                path: 'gis/dijit/Measurement',
                title: 'Measurement',
                open: false,
                position: 5,
                options: {
                    map: true,
                    mapClickMode: true,
                    defaultAreaUnit: units.SQUARE_MILES,
                    defaultLengthUnit: units.MILES
                }
            },
            print: {
                include: true,
                id: 'print',
                type: 'titlePane',
                canFloat: true,
                path: 'gis/dijit/Print',
                title: 'Print',
                open: false,
                position: 6,
                options: {
                    map: true,
                    printTaskURL: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
                    // can also use WyGISC URL https://wygiscservices10-3.wygisc.org/arcgis/rest/services/EORI/EORIExportWebMap/GPServer/Export%20Web%20Map
                    copyrightText: 'Copyright 2017',
                    authorText: 'Office of the Tribal Water Engineer',
                    defaultTitle: 'WRIR Web Map',
                    defaultFormat: 'PDF',
                    defaultLayout: 'Letter ANSI A Landscape'
                }
            },
            help: {
                include: true,
                id: 'help',
                type: 'floating',
                path: 'gis/dijit/Help',
                title: 'Help',
                options: {}
            }
        }
    };
});
