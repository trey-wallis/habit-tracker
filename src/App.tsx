import { Box, HStack, usePrevious } from "@chakra-ui/react";
import CardList from "./components/CardList";
import { Column, Item } from "./types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { notEmpty } from "./services/typescript/utils";
import { loadState, saveState } from "./services/persist";
import { useDidMountEffect } from "./services/hooks";

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

const initialState = loadState();

function App() {
  const [columns, setColumns] = useState(initialState.columns);

  // useDidMountEffect(() => {
  //   saveState(columns, loadedItems);
  // }, [columns]);

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setColumns((prevState) => {
      const start = prevState.find(
        (column) => column.id === source.droppableId
      );
      const finish = prevState.find(
        (column) => column.id === destination.droppableId
      );
      if (!start || !finish) return prevState;

      const newItemIds = [...start.itemIds];
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn: Column = {
        ...start,
        itemIds: newItemIds,
      };
      const arr = [...prevState];
      const index = arr.findIndex((column) => column.id === start.id);
      arr[index] = newColumn;
      return arr;
    });

    // const newStartItemIds = [...start.itemIds];
    // newStartItemIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   itemIds: newStartItemIds,
    // };
    // const newFinishItemIds = [...finish.itemIds];
    // newFinishItemIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   itemIds: newFinishItemIds,
    // };
    // setColumns((prevState) => {
    //   const arr = [...prevState];
    //   const startIndex = arr.findIndex(
    //     (column) => column.id === source.droppableId
    //   );
    //   const finishIndex = arr.findIndex(
    //     (column) => column.id === destination.droppableId
    //   );
    //   arr[startIndex] = newStart;
    //   arr[finishIndex] = newFinish;
    //   return arr;
    // });
  }

  return (
    <Box w="100vw" h="100vh">
      <DragDropContext onDragEnd={onDragEnd}>
        <HStack spacing={6} p={8} align="flex-start">
          {columns.map((column) => {
            const items = column.itemIds
              .map((id) => {
                return loadedItems.find((item) => item.id === id);
              })
              .filter(notEmpty);
            return (
              <CardList
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
