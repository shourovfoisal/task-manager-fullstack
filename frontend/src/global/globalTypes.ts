export type PriorityType = "low" | "medium" | "high";
export type StatusType = "pending" | "in_progress" | "completed";

export type FilterSliceStateType = {
  filter: {
    priority: PriorityType | null;
    dueDate: string | null;
    status: StatusType | null;
  };
};
