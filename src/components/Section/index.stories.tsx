import { ComponentMeta, ComponentStory } from "@storybook/react";

import Section from "./index";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Section",
  component: Section,
} as ComponentMeta<typeof Section>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: "Section title",
  items: [
    {
      id: "1",
      title: "Item 1",
      description: "This is a description",
      numPoints: 20,
      type: "out-of-control",
    },
    {
      id: "2",
      title: "Item 2",
      description: "This is a description",
      numPoints: 10,
      type: "in-control",
    },
  ],
};

export const HidePoints = Template.bind({});
HidePoints.args = {
  ...Default.args,
  hidePoints: true,
};
