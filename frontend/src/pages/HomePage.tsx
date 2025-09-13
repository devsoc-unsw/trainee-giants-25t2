import { HeaderBar } from "../components/HeaderBar";
import { WhiteBody } from "../components/homepage/NewBody";

export function HomePage() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <HeaderBar />
      <WhiteBody />
    </div>
  );
}
