import { WhiteBody } from '../components/events/Body';
import { HeaderBar } from '../components/HeaderBar';

export function EventsPage() {
  return (
    <div className="flex flex-col h-screen w-screen">
        <HeaderBar />
        <WhiteBody />
    </div>
  );
}
