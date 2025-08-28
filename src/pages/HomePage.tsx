import { HeaderBar } from "../components/HeaderBar";
import { RedBody } from "../components/RedBody";

export function HomePage() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <HeaderBar />
      <RedBody />
    </div>
  );
}
