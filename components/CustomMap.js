// // import { useState, useEffect } from 'react';
// // import { loadModules } from 'esri-loader';

// const CustomMap = (props) => {

//     const [graphic, setGraphic] = useState([]);
//     useEffect(() => {

//         loadModules(['esri/Graphic']).then(([Graphic]) => {
//             // Create a polygon geometry
//             const polygon = {
//                 type: "polygon", // autocasts as new Polygon()
//                 rings: [
//                     [-64.78, 32.3],
//                     [-66.07, 18.45],
//                     [-80.21, 25.78],
//                     [-64.78, 32.3]
//                 ]
//             };

//             // Create a symbol for rendering the graphic
//             const fillSymbol = {
//                 type: "simple-fill", // autocasts as new SimpleFillSymbol()
//                 color: [227, 139, 79, 0.8],
//                 outline: { // autocasts as new SimpleLineSymbol()
//                     color: [255, 255, 255],
//                     width: 1
//                 }
//             };

//             props.farmers.map((item, ind) => {
//                 const markerSymbol = {
//                     type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
//                     color: [226, 119, 40],
//                     outline: {
//                         // autocasts as new SimpleLineSymbol()
//                         color: [255, 255, 255],
//                         width: 2
//                     }
//                 };

//                 const point = {
//                     type: "point", // autocasts as new Point()
//                     longitude: item.longitude,
//                     latitude: item.latitude
//                 };
//                 const pointGraphic = new Graphic({
//                     geometry: point,
//                     symbol: markerSymbol,
//                     onclick: (event) => {
//                         console.log(event)
//                     }


//                 });

//                 setGraphic((state) => [...state, pointGraphic])
//             })

//             props.producers.map((item, ind) => {

//                 const markerSymbol = {
//                     type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
//                     color: [0, 0, 0],
//                     outline: {
//                         // autocasts as new SimpleLineSymbol()
//                         color: [255, 255, 255],
//                         width: 2
//                     }
//                 };
//                 const point = {
//                     type: "point", // autocasts as new Point()
//                     longitude: item.longitude,
//                     latitude: item.latitude
//                 };
//                 const pointGraphic = new Graphic({
//                     geometry: point,
//                     symbol: markerSymbol,
//                     onclick: (event) => {
//                         console.log(event)
//                     }


//                 });

//                 setGraphic((state) => [...state, pointGraphic])
//             })
//             props.markers.map((item, ind) => {

//                 const polyline = {
//                     type: "polyline", // autocasts as new Polyline()
//                     paths: [[26.427293, 82.385190], [23.172684, 71.850477]]
//                 };

//                 // Create a symbol for drawing the line
//                 const lineSymbol = {
//                     type: "simple-line", // autocasts as SimpleLineSymbol()
//                     color: [226, 119, 40],
//                     width: 4
//                 };
//                 const lineAtt = {
//                     Name: "Keystone Pipeline",
//                     Owner: "TransCanada",
//                     Length: "3,456 km"
//                 };

//                 /*******************************************
//                  * Create a new graphic and add the geometry,
//                  * symbol, and attributes to it. You may also
//                  * add a simple PopupTemplate to the graphic.
//                  * This allows users to view the graphic's
//                  * attributes when it is clicked.
//                  ******************************************/
//                 const polylineGraphic = new Graphic({
//                     geometry: polyline,
//                     symbol: lineSymbol,
//                     attributes: lineAtt,
//                     popupTemplate: {
//                         // autocasts as new PopupTemplate()
//                         title: "{Name}",
//                         content: [
//                             {
//                                 type: "fields",
//                                 fieldInfos: [
//                                     {
//                                         fieldName: "Name"
//                                     },
//                                     {
//                                         fieldName: "Owner"
//                                     },
//                                     {
//                                         fieldName: "Length"
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 });

//                 setGraphic((state) => [...state, polylineGraphic])

//             })

//             // props.view.on("click", function (event) {
//             //     // you must overwrite default click-for-popup
//             //     // behavior to display your own popup
//             //     props.view.popupEnabled = false;

//             //     // Get the coordinates of the click on the view
//             //     let lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
//             //     let lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
//             //     // latitude: "13.870080",
//             //     // longitude: "77.228188",


//             // })

//             // Add the geometry and symbol to a new graphic

//             props.view.graphics.addMany(graphic);
//         }).catch((err) => console.error(err));

//         return function cleanup() {
//             props.view.graphics.remove(graphic);
//         };
//     }, [props]);

//     return null;

// }

// export default CustomMap;