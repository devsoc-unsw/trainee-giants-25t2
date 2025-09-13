import { Footer } from "../components/Footer";
import { WhiteBody } from "../components/homepage/NewBody";

export function HomePage() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <WhiteBody />
      </div>
      <Footer />
    </>
  );
}
