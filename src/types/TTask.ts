export type TTask = {
    id: number;
    title: string;
    status: string; //"Срочно" | "Несрочно";
    endDate: Date;
    description?: string;
    done: boolean;
  };