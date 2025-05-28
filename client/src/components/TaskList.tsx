import { Task } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface TaskListProps {
  tasks?: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <>
      {tasks?.map((task: Task) => (
        <Accordion type="single" collapsible key={task.id}>
          <AccordionItem value={`${task.id}`}>
            <AccordionTrigger className="text-white">
              <div className="flex justify-between space-x-4">
                <span>{task.title}</span>
                {task.due_date && <span>Due: {task.due_date}</span>}
              </div>
            </AccordionTrigger>
            <AccordionContent>{task.description}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default TaskList;
