define({
   map: true,
   zoomExtentFactor: 2,
   queries: [
	   {
		   description: 'Find Walton Water Right by Claim No.',
		   url: 'https://wygiscservices10-3.wygisc.org/arcgis/rest/services/WRIR/WaterResources/MapServer',
		   layerIds: [1, 2, 3, 4],
		   searchFields: ['TRACT','CLAIM_NO_'],
		   minChars: 2,
		   gridColumns: [
			   { field: 'TRACT', label: 'Tract' },
			   { field: 'layerName', label: 'Layer', width: 100, sortable: true, resizable: true }
		   ],
		   sort: [
			   {
				   attribute: 'Name',
				   descending: false
			   }
		   ],
		   prompt: 'Input Tract or Claim No',
		   selectionMode: 'single'
	   },
	   {
		   description: 'Find Irrigation Structures by Description',
		   url: 'https://wygiscservices10-3.wygisc.org/arcgis/rest/services/WRIR/WaterResources/MapServer',
		   layerIds: [0],
		   searchFields: ['IRR2_NAME', 'IRR2_UNIT','IRR2_SOURC'],
		   minChars: 2,
		   gridColumns: [
			   { field: 'layerName', label: 'Layer', width: 100, sortable: false, resizable: false },
			   { field: 'IRR2_NAME', label: 'Name', width: 100 },
			   { field: 'IRR2_UNIT', label: 'Unit' },
			   { field: 'IRR2_SOURC', visible: false, get: function (findResult){
				   return findResult.layerName + ' ' + findResult.feature.attributes.Fcode;  //seems better to use attributes[ 'Fcode' ] but fails build.  Attribute names will be aliases and may contain spaces and mixed cases.
			   } }
		   ],
		   sort: [
			   {
				   attribute: 'IRR2_NAME',
				   descending: false
			   }
		   ],
		   prompt: 'Ditch Name, Source, or Unit ',
		   customGridEventHandlers: [
			   {
				   event: '.dgrid-row:click',
				   handler: function ( event ) {
					   alert( 'Data preview in development' );
					   console.log( event );
				   }
			   }
		   ]
	   }
   ],
   selectionSymbols: {
	   polygon: {
		   type   : 'esriSFS',
		   style  : 'esriSFSSolid',
		   color  : [255, 0, 0, 62],
		   outline: {
			   type : 'esriSLS',
			   style: 'esriSLSSolid',
			   color: [255, 0, 0, 255],
			   width: 3
		   }
	   },
	   point: {
		   type   : 'esriSMS',
		   style  : 'esriSMSCircle',
		   size   : 25,
		   color  : [255, 0, 0, 62],
		   angle  : 0,
		   xoffset: 0,
		   yoffset: 0,
		   outline: {
			   type : 'esriSLS',
			   style: 'esriSLSSolid',
			   color: [255, 0, 0, 255],
			   width: 2
		   }
	   }
   },
   selectionMode   : 'extended'
});
