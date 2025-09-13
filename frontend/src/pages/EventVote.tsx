import { useState } from "react";
import EventVoteHeader from "../components/event-vote/EventVoteHeader";
import EventVoteSwipeCards from "../components/event-vote/EventVoteSwipeCards";
import SubmitEventVote from "../components/event-vote/SubmitEventVote";
import { useParams } from "react-router-dom";
import { HeaderBar } from "../components/HeaderBar";
import { Footer } from "../components/Footer";

export function EventVote() {
  const eid = useParams().eid!;

  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

  return (
    <>
      <div className="h-screen w-screen">
        <div className="flex flex-col h-full w-full bg-gradient-to-br from-orange-200 to-orange-700 gap-2">
          <HeaderBar />
          <div className="flex flex-col items-center h-full w-full gap-8">
            <EventVoteHeader />
            <EventVoteSwipeCards likes={likes} setLikes={setLikes} dislikes={dislikes} setDislikes={setDislikes} />
            <SubmitEventVote likes={likes} dislikes={dislikes} eid={eid} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
