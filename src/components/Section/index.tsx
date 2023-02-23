import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { Item } from "../../services/api/types";
import CustomCard from "../CustomCard";
import { StrictModeDroppable } from "../StrictModeDroppable";

interface Props {
  droppableId: string;
  title: string;
  items: Item[];
  hidePoints?: boolean;
}

export default function Section({
  droppableId,
  title,
  hidePoints,
  items,
}: Props) {
  const totalPoints = items.reduce((acc, val) => (acc += val.numPoints), 0);

  return (
    <Box bgColor="gray.100" borderRadius={3} p={6} w="xs" h="100%">
      <Box mb={4}>
        <Heading as="h2" size="sm">
          {title}
        </Heading>
        {!hidePoints && (
          <Text fontSize="sm" mt={1}>
            {totalPoints} Points
          </Text>
        )}
      </Box>
      <StrictModeDroppable droppableId={droppableId}>
        {(provided) => (
          <Flex
            flexDirection="column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((card, i) => (
              <CustomCard
                key={card.id}
                draggableId={card.id}
                index={i}
                title={card.title}
                type={card.type}
                description={card.description}
                numPoints={card.numPoints}
              />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </StrictModeDroppable>
    </Box>
  );
}
