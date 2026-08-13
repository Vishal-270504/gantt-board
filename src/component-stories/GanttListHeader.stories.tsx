import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GanttTableHeader as GanttListHeader } from '../features/dashboard/components/GanttTableHeader';
import { useDashboardStore } from '../features/dashboard/store/useDashboardStore';
import { GANTT_COLUMNS } from '../features/dashboard/constants';
import type { ColumnWidths, GanttColor } from '../features/dashboard/types';

// Wrapper to initialize store and provide required props
function GanttListHeaderWrapper({
  visibleColumnKeys,
  headerColor,
}: {
  visibleColumnKeys: string[];
  headerColor?: GanttColor;
}) {
  const setVisibleColumns = useDashboardStore((s) => s.setVisibleColumns);
  const setGanttListHeaderColor = useDashboardStore((s) => s.setGanttListHeaderColor);
  const [widths, setWidths] = useState<ColumnWidths>(() => {
    const initial: Record<string, number> = {};
    GANTT_COLUMNS.forEach((col) => {
      initial[col.id] = Number(col.width) || 150;
    });
    return initial as ColumnWidths;
  });

  useEffect(() => {
    setVisibleColumns(visibleColumnKeys);
    if (headerColor) {
      setGanttListHeaderColor(headerColor);
    }
  }, [visibleColumnKeys, headerColor, setVisibleColumns, setGanttListHeaderColor]);

  const handleColumnResize = (columnId: string, width: number) => {
    setWidths((prev) => ({ ...prev, [columnId]: width }));
  };

  return <GanttListHeader widths={widths} onColumnResize={handleColumnResize} />;
}

const meta: Meta<typeof GanttListHeaderWrapper> = {
  title: 'Dashboard/GanttListHeader',
  component: GanttListHeaderWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    headerColor: {
      control: 'select',
      options: ['slate', 'blue', 'indigo', 'emerald', 'amber', 'rose', 'violet', 'cyan'],
      description: 'Background color of the header (set via store)',
    },
    visibleColumnKeys: {
      control: 'object',
      description: 'Array of visible column keys',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GanttListHeaderWrapper>;

const defaultArgs = {
  visibleColumnKeys: ['title', 'startDate', 'endDate', 'duration', 'progress', 'predecessors'],
  headerColor: 'slate' as GanttColor,
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const BlueHeader: Story = {
  args: {
    ...defaultArgs,
    headerColor: 'blue' as GanttColor,
  },
};

export const EmeraldHeader: Story = {
  args: {
    ...defaultArgs,
    headerColor: 'emerald' as GanttColor,
  },
};

export const RoseHeader: Story = {
  args: {
    ...defaultArgs,
    headerColor: 'rose' as GanttColor,
  },
};

export const CustomColumns: Story = {
  args: {
    ...defaultArgs,
    visibleColumnKeys: ['title', 'progress', 'assignee'],
  },
};