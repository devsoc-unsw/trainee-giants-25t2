import { useNavigate } from "react-router-dom";
import { editUserFood, useUser } from "../../hooks/useAuth";
import { editEventFood } from "../../hooks/useEvents";
import type { User, UserPlace } from "../../types/user.types";
import { getCookieUUID, setCookie } from "../../cookie/cookie";
import InputNamePopup from "./InputNamePopup";
import { useState } from "react";

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

  const [popup, setPopup] = useState<boolean>(false);

  const submit = async (name?: string) => {
    let uid: string;
    if (user) {
      uid = user.userId;
    } else {
      if (!getCookieUUID()) {
        uid = self.crypto.randomUUID();
        const date = new Date();
        date.setDate(date.getDate() + 7);
        setCookie(uid, name!, date);
      } else {
        uid = getCookieUUID()!;
      }
    }
    let userPayload: User;
    if (user) {
      userPayload = {
        userId: user.userId,
        email: user.email,
        name: user.name,
      }
    } else {
      userPayload = {
        userId: uid,
        email: "",
        name: name!,
      }
    }

    const userPlace: UserPlace = {
      user: userPayload,
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
    <>
      <div
        onClick={() => {
          if (user || getCookieUUID()) submit();
          else setPopup(true);
        }}
        className="px-8 py-3 bg-orange-500 text-white font-bold rounded-lg text-lg hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer my-8"
      >
        Next
      </div>
      {popup && (
        <InputNamePopup 
          submit={async (name: string) => {
            setPopup(false);
            await submit(name);
          }}
          onClose={() => {
            setPopup(false);
          }}
        />
      )}
    </>
  );
}

export default SubmitEventVote;