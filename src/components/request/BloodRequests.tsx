// ✅ Displays a responsive grid of blood request cards
import React from "react";
import { BloodRequest } from "@/types/request/type";
import BloodRequestCard from "./BloodRequestCard";

interface BloodRequestsProps {
  requests: BloodRequest[];
}
const BloodRequests: React.FC<BloodRequestsProps> = ({ requests }) => {
  const safeRequests = Array.isArray(requests) ? requests : [];

  if (safeRequests.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="mt-4 text-xl font-semibold text-gray-700">
          এখন কোনো রক্তের আবেদন নেই
        </h3>
        <p className="mt-2 text-gray-500">
          নতুন কোনো আবেদন আসলে এখানে দেখতে পাবেন।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {safeRequests.map((request) => (
        <BloodRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};


export default BloodRequests;
