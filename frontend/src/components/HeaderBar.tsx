import Logo from "./icon/Logo"
export function HeaderBar() {

	return (
		<div>
			<div className="bg-red-300 w-full h-[50px]">
				<div className="flex flex-row justify-around items-center text-white text-[8px]">
					<div className="flex flex-row gap-3"> 
						<h1 className="flex">
							When2Eat
						</h1>		
					</div>
					<div className="flex flex-row gap-10"> 
						<h1 className="flex">
							Create an event
						</h1>
						<h1 className="flex">
							Register
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}