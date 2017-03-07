define({
    isDebug: false,

    mapOptions: {
        basemap: 'streets',
        center: [-108.5, 43],
        zoom: 5,
        sliderStyle: 'small'
    },

    titles: {
        header: 'CMV Sharing Widget',
        subHeader: 'This',
        pageTitle: 'Sharing Widget'
    },


    panes: {
        left: {
            collapsible: false,
            style: 'display:none'
        }
    },
    collapseButtonsPane: 'outer', //center or outer

    operationalLayers: [],

    widgets: {
        share: {
            include: true,
            id: 'share',
            type: 'titlePane',
            path: 'gis/dijit/Share',
            title: 'Share This Map',
            options: {
                map: true
            }
        }
    }
});
