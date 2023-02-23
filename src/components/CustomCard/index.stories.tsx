import { ComponentMeta, ComponentStory } from "@storybook/react";

import CustomCard from "./index";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "CustomCard",
  component: CustomCard,
} as ComponentMeta<typeof CustomCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof CustomCard> = (args) => (
  <CustomCard {...args} />
);

export const InControl = Template.bind({});

InControl.args = {
  type: "in-control",
  title: "Card title",
  numPoints: 0,
  description: "A description for the card",
};

export const OutOfControl = Template.bind({});
OutOfControl.args = { ...InControl.args, type: "out-of-control" };
