import { useNavigate } from 'react-router-dom';

export function HeaderBar() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-gradient-to-r from-[#F4975C] to-[#999999] w-full h-[65px] px-20">
        <div className="flex flex-row justify-between items-center text-white text-[8px]">
          <div className="flex flex-row gap-[200px] mt-4 ">
            <h1 className="flex text-md font-semibold">When2Eat</h1>
          </div>
          <div className="flex flex-row gap-[100px] mt-4 ">
            <h1 className="flex text-md font-semibold">Create an event</h1>
          <h1
            className="text-md font-semibold hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
