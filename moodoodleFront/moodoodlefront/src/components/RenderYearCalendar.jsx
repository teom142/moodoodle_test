import React from 'react';

export default function RenderYearCalendar({ monthlyList, month }) {
  return (
    <div className='flex flex-row w-[168px] h-[459px] justify-between'>
      <div className='flex flex-col justify-between'>
        <div key={month} className={`flex flex-col h-[459px] gap-[2px]`}>
          {Object.values(monthlyList[0][month - 1]) ? (
            Object.values(monthlyList[0][month - 1]).map((v) =>
              Object.values(v)[2] !== null ? (
                <div
                  key={Object.values(v)[1]}
                  className={`w-[11.6px] h-[11.6px] rounded-[3px] bg-[#${Object.values(v)[2]}]`}
                />
              ) : (
                <div
                  key={Object.values(v)[1]}
                  className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1'
                />
              ),
            )
          ) : (
            <div
              key={Object.values(monthlyList[0][month - 1])[1]}
              className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1'
            />
          )}
        </div>
      </div>
    </div>
  );
}
