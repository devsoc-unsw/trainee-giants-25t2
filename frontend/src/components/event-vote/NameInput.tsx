interface NameInputProps {
  value: string;
  onChange: (v: string) => void;
  isValid: boolean;
}

export const NameInput: React.FC<NameInputProps> = ({ value, onChange, isValid }) => (
  <div className="flex flex-col mb-4">
    <input
      type="text"
      placeholder="Enter your name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border rounded-md p-2 bg-white text-black ${!isValid ? "border-red-500" : "border-gray-300"}`}
    />
    {!isValid && (
      <span className="text-red-500 text-sm mt-1">Name is required</span>
    )}
  </div>
);
