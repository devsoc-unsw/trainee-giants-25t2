export function UserAvailability({ user }: { user: any }) {
  return (
    <div className="text-sm text-gray-600 w-[20%]">
      <span className="font-medium">
        {typeof user.users === "string" ? user.users : user.users.join(", ")}:
      </span>{" "}
      {Array.isArray(user.slots) && user.slots.length > 0
        ? user.slots
            .map((s: any) => `${s.date} [${s.times.join(", ")}]`)
            .join(" | ")
        : "No availability yet"}
    </div>
  );
}