import { FC, useEffect, useState } from "react";
import { Task } from "../../components/Task";
import { TData } from "../../components/Task/Task";
import { getTasks } from "../../utils/api";
import { getTask } from "../../services/slices/task";
import { useAppDispatch } from "../../services/hooks";

export const Applications: FC = () => {
  const [tasks, setTasks] = useState<Array<TData>>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTask())
  }, []);
  return (
    <div>
      <Task />
    </div>
  );
};
