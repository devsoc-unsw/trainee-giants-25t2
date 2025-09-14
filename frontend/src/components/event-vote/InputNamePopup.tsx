import { useState } from "react";

import { NameInput } from "./NameInput";
import { InputButton } from "./InputButton";

interface InputNamePopupProps {
  submit: (name: string) => void;
  onClose: () => void;
}

const InputNamePopup = ({ submit, onClose }: InputNamePopupProps) => {
  const [name, setName] = useState<string>("");
  const isValid =  name.trim().length > 0;

  return (
    <div className="absolute top-0 z-[9999] h-full w-full bg-black/60">
      <div className="flex flex-1 bg-transparent h-full justify-center items-center flex-col">
        <div className="bg-white rounded-2xl shadow-xl border w-[500px] p-6 relative max-h-[800px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">Enter your name</h2>
            <h4
              className="text-md text-black cursor-pointer"
              onClick={() => onClose()}
            >Back</h4>
          </div>

          <NameInput value={name} onChange={setName} isValid={isValid} />

          <InputButton disabled={!isValid} submit={() => submit(name)} />

          {!isValid && (
            <span className="text-red-500 text-sm mt-1 disable">
              Please enter a name before continuing
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputNamePopup;