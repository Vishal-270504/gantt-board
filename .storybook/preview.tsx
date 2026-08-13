import type { Preview } from '@storybook/react-vite';
import { TooltipProvider } from '../src/components/ui/tooltip';
import '../src/index.css'; // Make sure your Tailwind CSS is imported

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default preview;