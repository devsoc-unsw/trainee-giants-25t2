import { useState } from "react";
import EventVoteHeader from "../components/event-vote/EventVoteHeader";
import EventVoteSwipeCards from "../components/event-vote/EventVoteSwipeCards";
import SubmitEventVote from "../components/event-vote/SubmitEventVote";
import { useParams } from "react-router-dom";

export function EventVote() {
  const eid = useParams().eid!;

  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="w-full flex relative">
        <div className="flex flex-col items-center w-full gap-16">
          <EventVoteHeader />
          <EventVoteSwipeCards likes={likes} setLikes={setLikes} dislikes={dislikes} setDislikes={setDislikes} />
          <SubmitEventVote likes={likes} dislikes={dislikes} eid={eid} />
        </div>
      </div>
    </div>
  );
}
