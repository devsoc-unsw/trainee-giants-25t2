import { useNavigate } from "react-router-dom";
import { editUserFood, useUser } from "../../hooks/useAuth";
import { editEventFood } from "../../hooks/useEvents";
import type { UserPlace } from "../../types/user.types";
import { getCookie } from "../../cookie/cookie";

interface SubmitEventVoteProps {
  likes: string[];
  dislikes: string[];
  eid: string;
}

interface EditEventFoodPayload {
  eid: string;
  user: UserPlace;
}

const SubmitEventVote = ({ likes, dislikes, eid }: SubmitEventVoteProps) => {
  const navigate = useNavigate();
  const { data: user } = useUser();

  const submit = async () => {
    let uid: string;
    if (user) {
      uid = user.userId;
    } else {
      uid = getCookie()!;
    }

    const userPlace: UserPlace = {
      userId: uid,
      likes,
      dislikes,
    }

    const payload: EditEventFoodPayload = {
      eid,
      user: userPlace,
    }

    try {
      const event = await editEventFood(payload);
      if (uid !== "") {
        try {
          if (uid !== "") {
            await editUserFood({ userPlace });
          };
        } catch (e: any) {
          const message = e?.response?.data?.error || e?.message || "Adding user food failed.";
          console.log(message);
        }
      }
      navigate("/event/" + event.eventId + "/availability/");
    } catch (e: any) {
      const message = e?.response?.data?.error || e?.message || "Adding event food recommendations failed.";
      console.log(message);
    }
  }

  return (
    <button
      onClick={submit}
    >
      Next
    </button>
  );
}

export default SubmitEventVote;