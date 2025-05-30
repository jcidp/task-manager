import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

const taskFormSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  due_date: z.date().optional(),
  urgent: z.boolean(),
  important: z.boolean(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  createTask: (values: TaskFormValues) => Promise<void>;
}

const TaskForm = ({ createTask }: TaskFormProps) => {
  const taskForm = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      urgent: false,
      important: false,
    },
  });

  return (
    <Form {...taskForm}>
      <form onSubmit={taskForm.handleSubmit(createTask)}>
        <div className="p-2 grid gap-2">
          <FormField
            control={taskForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="My task" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={taskForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="What this means..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={taskForm.control}
            name="due_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={taskForm.control}
            name="urgent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgent</FormLabel>
                <FormControl>
                  <Checkbox onChangeCapture={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={taskForm.control}
            name="important"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Important</FormLabel>
                <FormControl>
                  <Checkbox onChangeCapture={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button>Create</Button>
      </form>
    </Form>
  );
};

export default TaskForm;
