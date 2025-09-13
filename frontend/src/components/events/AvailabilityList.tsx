export function UserAvailability({ user }: { user: any }) {
  return (
    <div className="text-sm text-gray-600 w-[20%]">
      <span className="font-medium">
        {user.name ?? "Unknown"}
      </span>{" "}
    </div>
  );
}
