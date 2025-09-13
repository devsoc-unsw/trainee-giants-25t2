import { motion } from "framer-motion";
import { LoginRequiredModal } from "./LoginRequiredModal";
import { /*useLogout,*/ useUser } from "../../hooks/useAuth";
import { CardCycle } from "./CardCycle";
import { RegisterButton } from "./Button";
// import { UserMenu } from "../profile/Menu";

export function WhiteBody() {
  const { data: user } = useUser();
  // const doLogout = useLogout();
	
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-gradient-to-br from-orange-200 to-orange-700 flex flex-col justify-center items-center p-6 lg:p-12 relative overflow-hidden">
        <div className="flex flex-col items-center gap-8 pb-5">
          <div className="text-center mb-4">
            <div className="text-[60px] font-black text-white mb-4">
              When2
							<span className="text-orange-500">Eat</span>
            </div>
            <div className="text-xl text-white font-bold">
              Event scheduler for hungry eaters
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Discover Amazing Restaurants
              </h2>
							<motion.p
								initial={{ opacity: 0, x: -20 }}
								animate={{ x: [ -40, 0 ], opacity: [ 1, 1, 0 ] }}
								transition={{
									duration: 3.5,
									repeat: Infinity,
									repeatType: "loop",
								}}
								className="text-gray-600 font-medium"
							>
								Swipe right to add to your list, left to pass
							</motion.p>
            </div>

						<CardCycle />
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col justify-center p-6 lg:p-12 relative">
        {/* <div className="absolute top-10 right-6">
          {
            user ?
            <UserMenu name={user.name} onLogout={doLogout} bgColor="bg-black" />
            : null
          }
        </div> */}
        <div className="max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-black text-gray-800 leading-tight mb-6">
            Discover Your Next{" "}
            <span className="text-[#E98657]">Favourite Restaurant</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Bring your group together to decide where to eat. Create an event, suggest 
  					restaurants, and let everyone vote making dining plans simple, fast, and fun.
          </p>

          <div className="flex flex-col gap-5">
            <div className="w-full px-4 py-4 bg-[#E98657] text-white font-bold rounded-lg text-lg hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
							<LoginRequiredModal
								buttonText="Create an event"
								buttonClassName="px-4 py-2 rounded-md font-medium transition-all backdrop-blur-sm cursor-pointer text-lg"
								user={user}
							/>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
              {!user ? (
                <h4 className="text-black">
                  Want to save your events?
                </h4>
              ) : null
              }
              {!user ? (
                <RegisterButton bgColor="bg-black hover:bg-black/30"/>
              ) : null }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
