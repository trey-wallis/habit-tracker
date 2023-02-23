import { Badge, Card, CardBody, Divider, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  description?: string;
  type: "in-control" | "out-of-control";
  numPoints: number;
}

export default function HabitCard({
  title,
  type,
  description,
  numPoints,
}: Props) {
  return (
    <Card maxW="sm" bgColor={type === "in-control" ? "green.100" : "red.100"}>
      <CardBody>
        <Text fontWeight="bold">{title}</Text>
        <Text fontSize="sm">{description}</Text>
        <Divider borderColor="gray.400" my={2} />
        <Badge colorScheme="gray">{numPoints} Points</Badge>
      </CardBody>
    </Card>
  );
}
