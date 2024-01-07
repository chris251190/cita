import React from 'react';

type InputFieldProps = {
  title?: string;
  additionalClasses?: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, value, onChange, additionalClasses, title }) => (
  <>
    {title && <label className="font-bold mb-1">{title}</label>}
    <input
      type={type}
      name={name}
      className={`bg-transparent border-b border-black focus:outline-none focus:ring-0 focus:border-orange-700 hover:border-orange-700 text-black placeholder-orange-600 mb-5 ${additionalClasses} text-center hover:scale-110`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </>
);

export default InputField;