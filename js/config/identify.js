define({
	map: true,
	mapClickMode: true,
	mapRightClickMenu: true,
	identifyLayerInfos: true,
	identifyTolerance: 5,

	// config object definition:
	//	{<layer id>:{
	//		<sub layer number>:{
	//			<pop-up definition, see link below>
	//			}
	//		},
	//	<layer id>:{
	//		<sub layer number>:{
	//			<pop-up definition, see link below>
	//			}
	//		}
	//	}

	// for details on pop-up definition see: https://developers.arcgis.com/javascript/jshelp/intro_popuptemplate.html

	identifies: {
		irrigWaterRightsLayer: {
			0: {
				title: 'Canal System',
				fieldInfos: [{
					fieldName: "IRR2_NAME",
					label: 'Name:',
					visible: true
				},{
					fieldName: 'IRR2_UNIT',
					label: 'Irrigation Unit:',
					visible: true
				},{
					fieldName: 'IRR2_SOURC',
					label: 'Source:',
					visible: true
				},{
					fieldName: 'LENGTH',
					label: 'Length (meter):',
					visible: true
				}, {
					fieldName: 'MILES',
					label: 'Length (mile):',
					visible: true
				}, {
					fieldName: 'IRR2_DITCH',
					label: 'Structure Type:',
					visible: true
				}, {
					fieldName: 'IRR2_COND',
					label: 'Structure Condition:',
					visible: true
				}, {
					fieldName: 'IRR2_VEG',
					label: 'Vegetation:',
					visible: true
				}]
			},
			1: {
				title: 'Water Rights: Walton Awards',
				fieldInfos: [{
					fieldName: "CLAIM_NO_",
					label: 'Claim #',
					visible: true
				},{
					fieldName: "TYPE",
					label: 'Walton Type',
					visible: true
				},{
					fieldName: 'Owner_Name',
					label: 'Owner Name',
					visible: true
				},{
					fieldName: "SOURCE",
					label: 'Water Source',
					visible: true
				},{
					fieldName: "Area_Acres",
					label: 'Total Awarded Acreage',
					visible: true
				},{
					fieldName: "WATER_DUTY",
					label: 'Water Duty (af/ac)',
					visible: true
				},{
					fieldName: "DIV_REQ",
					label: 'Total Diversion Requirement',
					visible: true
				},{
					fieldName: "DITCH",
					label: 'Ditch Name',
					visible: true
				},{
					fieldName: "HEADGATE_LOC",
					label: 'Headgate Location',
					visible: true
				},{
					fieldName: "COURT_REC_URL",
					label: 'Court Record Documents',
					visible: true
				},{
					fieldName: "SETTLE",
					label: 'settlement',
					visible: true
				}]
			},
			2: {
				title: 'Water Rights: Consent Decree',
				fieldInfos: [{
					fieldName: 'TRACT',
					label: 'Tract No',
					visible: true
				},{
					fieldName: 'SOURCE',
					label: 'Water Source',
					visible: true
				},{
					fieldName: "area_acres",
					label: 'Total Awarded Acreage',
					visible: true
				},{
					fieldName: "WATER_DUTY",
					label: 'Water Duty (af/ac)',
					visible: true
				},{
					fieldName: "DIV_REQ",
					label: 'Total Diversion Requirement',
					visible: true
				},{
					fieldName: "DITCH",
					label: 'Ditch Name',
					visible: true
				},{
					fieldName: "HEADGATE_LOC",
					label: 'Headgate Location',
					visible: true
				},{
					fieldName: "AVLINK",
					label: 'AVLink',
					visible: true
				},{
					fieldName: "ACRES",
					label: 'ACRES',
					visible: true
				}]
			},
			3: {
				title: 'Water Rights: Walton Remand'
			},
			4: {
				title: 'Water Rights: Federal Reserved',
				fieldInfos: [{
					fieldName: 'TRACT',
					label: 'Tract No',
					visible: true
				},{
					fieldName: 'SOURCE',
					label: 'Water Source',
					visible: true
				},{
					fieldName: "area_acres",
					label: 'Total Awarded Acreage',
					visible: true
				},{
					fieldName: "WATER_DUTY",
					label: 'Water Duty (af/ac)',
					visible: true
				},{
					fieldName: "DIV_REQ",
					label: 'Total Diversion Requirement',
					visible: true
				},{
					fieldName: "DITCH",
					label: 'Ditch Name',
					visible: true
				},{
					fieldName: "HEADGATE_LOC",
					label: 'Headgate Location',
					visible: true
				},{
					fieldName: "ACRES",
					label: 'ACRES',
					visible: true
				},{
					fieldName: "CLAIM_NO",
					label: 'Claim No.',
					visible: true
				},{
					fieldName: "CLAIM_TYPE",
					label: 'Claim Type',
					visible: true
				},{
					fieldName: "PARTITION",
					label: 'Partition',
					visible: true
				}]
			},
			5: {
				title: 'Irrigation Units',
				fieldInfos: [{
					fieldName: 'IRL_ATT',
					label: 'IRL ATT',
					visible: true
				}]

			}
		}
	}
});
