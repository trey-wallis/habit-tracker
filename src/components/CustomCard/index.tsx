import { Badge, Box, Card, CardBody, Divider, Text } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  draggableId: string;
  index: number;
  title: string;
  description?: string;
  type: "in-control" | "out-of-control";
  numPoints: number;
}

export default function CustomCard({
  draggableId,
  index,
  title,
  type,
  description,
  numPoints,
}: Props) {
  return (
    <Draggable draggableId={draggableId} index={index} isDragDisabled={false}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            maxW="sm"
            bgColor={type === "in-control" ? "green.100" : "red.100"}
            mb={3}
          >
            <CardBody>
              <Text fontWeight="bold">{title}</Text>
              <Text fontSize="sm">{description}</Text>
              <Divider borderColor="gray.400" my={2} />
              <Badge colorScheme="gray">{numPoints} Points</Badge>
            </CardBody>
          </Card>
        </Box>
      )}
    </Draggable>
  );
}
