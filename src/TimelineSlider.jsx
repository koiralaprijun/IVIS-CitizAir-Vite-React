// import React, { useEffect } from 'react';

// const YourComponent = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://gis.slbanalys.se/geoserver/slb/wms?service=WMS&request=getFeatureInfo&layers=slb:metadata&styles=&version=1.3.0&width=256&height=256&crs=EPSG:3011&bbox=6578437.5,153375.0,6579375.0,154312.5&tiled=true&i=10&j=10&query_layers=slb:metadata&info_format=application/json');
//         const data = await response.json();
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {/* Your component JSX */}
//     </div>
//   );
// };

// export default YourComponent;
