import { Task } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Input } from "./ui/input";
import { PencilIcon, TrashIcon } from "lucide-react";

interface TaskListProps {
  tasks?: Task[];
  section: string;
}

const TaskList = ({ tasks, section }: TaskListProps) => {
  return (
    <section className="mb-4 w-full">
      <h2 className="font-bold text-xl">{section}</h2>
      {tasks?.map((task: Task) => (
        <Accordion
          className="min-w-142 my-1 w-full border-b-2"
          type="single"
          collapsible
          key={task.id}
        >
          <AccordionItem value={`${task.id}`}>
            <AccordionTrigger className="hover:no-underline py-2">
              <div className="w-full grid grid-cols-[1fr_max-content] justify-between space-x-4">
                <div className="grid grid-cols-[max-content_1fr] items-center">
                  <Input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    defaultChecked={task.done}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-nowrap overflow-hidden text-ellipsis">
                    {task.title}
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_max-content_max-content] gap-x-2">
                  {task.due_date && <span>Due: {task.due_date}</span>}
                  <PencilIcon
                    className="inline w-4"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <TrashIcon
                    className="inline w-4"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {task.description ? task.description : "(No description)"}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </section>
  );
};

export default TaskList;
