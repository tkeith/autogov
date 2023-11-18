"use client";

import { useRouter } from "next/navigation";

export default function AddOrganizationButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/add-organization");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Add Organization
    </button>
  );
}
