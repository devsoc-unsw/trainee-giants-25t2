import { WhiteBody } from '../components/event-create/Body';
import { Footer } from '../components/Footer';
import { HeaderBar } from '../components/HeaderBar';

export function EventCreate() {
  return (
    <>
      <div className="h-screen w-screen">
        <div className="w-full h-full flex flex-col">
          <HeaderBar />
          <WhiteBody />
        </div>
      </div>
      <Footer />
    </>
  );
}
