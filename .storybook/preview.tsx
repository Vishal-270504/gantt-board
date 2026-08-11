import { definePreview } from '@storybook/react-vite';
import '../src/index.css';
import { TooltipProvider } from '../src/components/ui/tooltip';
import addonPerformancePanel from '@github-ui/storybook-addon-performance-panel'

export default definePreview({
  addons: [addonPerformancePanel()],
  tags: ['autodocs'], // 👈 ADD THIS
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={1150}> 
        <div className="overflow-auto border border-border w-full min-h-[200px]"> 
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
});