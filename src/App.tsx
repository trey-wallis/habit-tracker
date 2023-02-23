import { Box, HStack } from "@chakra-ui/react";
import Section from "./components/Section";
import { Item } from "./services/api/types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import { notEmpty } from "./services/typescript/utils";

const loadedItems: Item[] = [
  {
    id: "1",
    title: "Item 1",
    type: "in-control",
    description: "My description",
    numPoints: 2,
  },
  {
    id: "2",
    title: "Item 2",
    type: "in-control",
    description: "My description",
    numPoints: 5,
  },
  {
    id: "3",
    title: "Item 3",
    type: "out-of-control",
    description: "My description",
    numPoints: 2,
  },
];

interface Column {
  id: string;
  title: string;
  itemIds: string[];
  hidePoints?: boolean;
}

const INITIAL_COLUMNS: Column[] = [
  {
    id: "out-of-control",
    title: "Out of Control",
    itemIds: [],
  },
  {
    id: "in-control",
    title: "In Control",
    itemIds: [],
  },
  {
    id: "backlog",
    title: "Backlog",
    itemIds: ["1", "2", "3"],
    hidePoints: true,
  },
];

function App() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const column = columns.find((column) => column.id === source.droppableId);
    if (column) {
      const arr = [...column.itemIds];
      arr.splice(source.index, 1);
      arr.splice(destination.index, 0, draggableId);

      const newColumn: Column = {
        ...column,
        itemIds: arr,
      };
      setColumns((prevState) => {
        const arr = [...prevState];
        const index = arr.findIndex(
          (column) => column.id === source.droppableId
        );
        arr[index] = newColumn;
        return arr;
      });
    }
  }

  return (
    <Box w="100vw" h="100vh">
      <DragDropContext onDragEnd={onDragEnd}>
        <HStack spacing={6} p={8} h="100%">
          {columns.map((column) => {
            const items = column.itemIds
              .map((id) => {
                return loadedItems.find((item) => item.id === id);
              })
              .filter(notEmpty);
            return (
              <Section
                key={column.id}
                droppableId={column.id}
                title={column.title}
                hidePoints={column.hidePoints ? true : false}
                items={items}
              />
            );
          })}
        </HStack>
      </DragDropContext>
    </Box>
  );
}

export default App;
