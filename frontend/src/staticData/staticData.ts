import { PriorityType, StatusType } from "../global/globalTypes";

export const priorityDropdown: { label: string; value: PriorityType }[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export const statusDropdown: { label: string; value: StatusType }[] = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];
