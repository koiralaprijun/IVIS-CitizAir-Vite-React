import React, { useEffect } from 'react';

const YourComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gis.slbanalys.se/geoserver/slb/wms?service=WMS&request=getFeatureInfo&layers=slb:metadata&styles=&version=1.3.0&width=256&height=256&crs=EPSG:3011&bbox=6578437.5,153375.0,6579375.0,154312.5&tiled=true&i=10&j=10&query_layers=slb:metadata&info_format=application/json');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <RangeSlider defaultValue={[120, 240]} min={0} max={300} step={30}>
            <RangeSliderTrack bg='red.100'>
                <RangeSliderFilledTrack bg='tomato' />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0} />
            <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider>
    </div>
  );
};

export default YourComponent;
