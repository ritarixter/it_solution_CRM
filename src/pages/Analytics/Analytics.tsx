import { FC, useEffect, useState } from "react";
import { Task } from "../../components/Task";
import { TData } from "../../components/Task/Task";
import { getTasks } from "../../utils/api";
import { getTask } from "../../services/slices/task";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { UserBlock,TableTask } from "../../components";

export const Analytics: FC = () => {
  const { tasks } = useAppSelector(
    state => state.task
  );
//     <Task tasks={tasks} />
  return (
    <div>
 
      <TableTask mini={true}/>
      
    </div>
  );
};