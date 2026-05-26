import { useState } from "react";

import { DndContext,closestCenter, } from "@dnd-kit/core";

import { SortableContext,horizontalListSortingStrategy,arrayMove, } from "@dnd-kit/sortable";

import type { DragEndEvent } from "@dnd-kit/core";

import { Column } from "../Coluna/Coluna";
import { Button } from "../../components/ui/button";

import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

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
  const [columns, setColumns] =
    useState<ColumnType[]>([
      {
        id: crypto.randomUUID(),
        title: "Coluna 1",
        tasks: [],
      },
    ]);

  function handleDragEnd(
    event: DragEndEvent
  ) {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setColumns((columns) => {
        const oldIndex = columns.findIndex(
          (col) => col.id === active.id
        );

        const newIndex = columns.findIndex(
          (col) => col.id === over.id
        );

        return arrayMove(
          columns,
          oldIndex,
          newIndex
        );
      });
    }
  }

  function addColumn() {
    const newColumn: ColumnType = {
      id: crypto.randomUUID(),
      title: "Nova Coluna",
      tasks: [],
    };

    setColumns((prev) => [
      ...prev,
      newColumn,
    ]);
  }

  function removeColumn(id: string) {
    setColumns((prev) =>
      prev.filter((col) => col.id !== id)
    );
  }

  function updateColumnTitle(
    id: string,
    title: string
  ) {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === id
          ? { ...col, title }
          : col
      )
    );
  }

  function addTask(
    columnId: string,
    title: string
  ) {
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
    <div className="board-wrapper">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext
          items={columns}
          strategy={
            horizontalListSortingStrategy
          }
        >
          <div className="board">
            {columns.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={column.tasks}
                removeColumn={removeColumn}
                updateColumnTitle={
                  updateColumnTitle
                }
                addTask={addTask}
                updateTaskTitle={
                  updateTaskTitle
                }
              />
            ))}

            <Button
  variant="outline"
  size="icon"
  onClick={addColumn}
  className="add-column-btn"
>
  +
</Button>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}