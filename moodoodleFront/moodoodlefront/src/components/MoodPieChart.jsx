import React from 'react';
import { ResponsivePie } from '@nivo/pie';

export default function MoodPieChart({ data }) {
  return (
    <ResponsivePie
      data={data}
      colors={({ data }) => data[`color`]}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      innerRadius={0.0}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextOffset={0}
      arcLinkLabelsTextColor={{ theme: 'background' }}
      arcLinkLabelsStraightLength={0}
      arcLinkLabelsThickness={0}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 0]],
      }}
    />
  );
}
