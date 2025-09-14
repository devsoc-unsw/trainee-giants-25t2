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
        <div className="w-full h-full flex flex-col items-center">
          <HeaderBar />
          <EventVoteHeader />
          <EventVoteSwipeCards likes={likes} setLikes={setLikes} dislikes={dislikes} setDislikes={setDislikes} />
          <SubmitEventVote likes={likes} dislikes={dislikes} eid={eid} />
        </div>
      </div>
      <Footer />
    </>
  );
}
