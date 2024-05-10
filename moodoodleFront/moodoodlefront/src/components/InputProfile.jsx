import React from 'react';

export default function InputProfile({
  content,
  placeholder,
  modifiedProfile,
  setModifiedProfile,
  type,
  defaultValue,
}) {
  const handleSetValue = (e) => {
    setModifiedProfile({ ...modifiedProfile, [type]: e.target.value });
  };

  return (
    <div className='flex flex-row w-[280px] h-[27px] justify-between items-start border-b border-b-darkGray/40ss'>
      <p className='text-[14px] font-semibold text-darkNavy tracking-[-0.98px]'>
        {content}
      </p>
      <input
        type='text'
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => handleSetValue(e)}
        className='w-[203px] h-[20px] text-[12px] font-light text-darkGray tracking-[-1.2px] outline-none'
      ></input>
    </div>
  );
}
