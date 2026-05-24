import { useState } from "react";
import { Column } from "../Coluna/Coluna";
import { Button } from "@/components/ui/button";

import "./Board.css";

type Task = {
  id: string;
  title: string;
};

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

export function Board() {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: crypto.randomUUID(),
      title: "Coluna 1",
      tasks: [],
    },
  ]);

  function addColumn() {
    const newColumn: ColumnType = {
      id: crypto.randomUUID(),
      title: "Nova Coluna",
      tasks: [],
    };

    setColumns((prev) => [...prev, newColumn]);
  }

  function removeColumn(id: string) {
    setColumns((prev) => prev.filter((col) => col.id !== id));
  }

  function updateColumnTitle(id: string, title: string) {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === id ? { ...col, title } : col
      )
    );
  }

  function addTask(columnId: string, title: string) {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: crypto.randomUUID(),
                  title,
                },
              ],
            }
          : col
      )
    );
  }

  function updateTaskTitle(
    columnId: string,
    taskId: string,
    title: string
  ) {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, title }
                  : task
              ),
            }
          : col
      )
    );
  }

  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={column.tasks}
          removeColumn={removeColumn}
          updateColumnTitle={updateColumnTitle}
          addTask={addTask}
          updateTaskTitle={updateTaskTitle}
        />
      ))}

      <Button variant="outline" size="icon" onClick={addColumn}>
        +
      </Button>
    </div>
  );
}