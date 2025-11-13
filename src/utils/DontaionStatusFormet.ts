import { DonationStatusBl, RequestStatusBl } from "@/types/request/type";

 

// Mapping function
export function mapStatus(
  value: string,
  type: "request" | "donation"
): string | undefined {
  let map: { [key: string]: string } = {};

  if (type === "request") {
    map = {
      VeryUrgent: RequestStatusBl.VeryUrgent,
      Urgent: RequestStatusBl.Urgent,
      Needed: RequestStatusBl.Needed,
      "খুব প্রয়োজন": "VeryUrgent",
      প্রয়োজন: "Urgent",
      লাগবে: "Needed",
    };
  } else if (type === "donation") {
    map = {
      Done: DonationStatusBl.Done,
      NoNeed: DonationStatusBl.NoNeed,
      Reserved: DonationStatusBl.Reserved,
      Upcomming: DonationStatusBl.Upcomming,
      সম্পন্ন: "Done",
      "প্রয়োজন নেই": "NoNeed",
      সংরক্ষিত: "Reserved",
      আসন্ন: "Upcomming",
    };
  }

  return map[value];
}
 