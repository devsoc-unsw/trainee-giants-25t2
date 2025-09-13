import { WhiteBody } from '../components/event-create/Body';
import { Footer } from '../components/Footer';
import { HeaderBar } from '../components/HeaderBar';

export function EventCreate() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <HeaderBar />
        <WhiteBody />
      </div>
      <Footer />
    </>
  );
}
