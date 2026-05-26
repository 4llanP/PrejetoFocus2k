import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "../../components/ui/button";

import "./Coluna.css";

type Task = {
  id: string;
  title: string;
};

type ColumnProps = {
  id: string;
  title: string;
  tasks: Task[];
  removeColumn: (id: string) => void;
  updateColumnTitle: (
    id: string,
    title: string
  ) => void;
  addTask: (
    columnId: string,
    title: string
  ) => void;
  updateTaskTitle: (
    columnId: string,
    taskId: string,
    title: string
  ) => void;
};

export function Column({
  id,
  title,
  tasks,
  removeColumn,
  updateColumnTitle,
  addTask,
  updateTaskTitle,
}: ColumnProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

 const style = {
  transform: transform
    ? `translate3d(${transform.x}px, 0, 0)`
    : undefined,

  transition: transform
    ? "none"
    : transition,
};

 return (
  <div
    ref={setNodeRef}
    style={style}
    className="column"
  >
    <div className="column-header">

      <div
        className="drag-handle"
        {...attributes}
        {...listeners}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className="column-title"
        contentEditable
        spellCheck={false}
        suppressContentEditableWarning
        onBlur={(e) =>
          updateColumnTitle(
            id,
            e.currentTarget.textContent || ""
          )
        }
      >
        {title}
      </div>

      <button
        className="remove-btn"
        onClick={() => removeColumn(id)}
      >
        ×
      </button>

    </div>

    <div className="tasks-container">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task"
        >
          <div
            className="task-title"
            contentEditable
            spellCheck={false}
            suppressContentEditableWarning
            onBlur={(e) =>
              updateTaskTitle(
                id,
                task.id,
                e.currentTarget
                  .textContent || ""
              )
            }
          >
            {task.title}
          </div>
        </div>
      ))}
    </div>

    <Button
      variant="outline"
      size="icon"
      className="add-task-btn"
      onClick={() =>
        addTask(id, "Nova task")
      }
    >
      +
    </Button>
  </div>
);
}