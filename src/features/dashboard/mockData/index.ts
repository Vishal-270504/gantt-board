import type { Task } from '../types';

export const mockTasks: Task[] = [
  //Construction / Event Planning
  {
  id: 'ev-1',
  title: 'Annual Tech Conference 2026',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'st-1',
  title: 'Venue & Logistics',
  assignee: 'Operations',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-20T17:00:00',
  type: 'task',
  parentId: 'ev-1'
},
{
  id: 'st-1-1',
  title: 'Venue Booking',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-05T17:00:00',
  type: 'task',
  parentId: 'st-1'
},
{
  id: 'st-1-2',
  title: 'Catering Contract',
  progress: 0,
  startDate: '2026-10-06T09:00:00',
  endDate: '2026-10-10T17:00:00',
  type: 'task',
  predecessors: ['st-1-1'],
  parentId: 'st-1'
},
{
  id: 'st-1-3',
  title: 'AV Equipment Setup Plan',
  progress: 0,
  startDate: '2026-10-11T09:00:00',
  endDate: '2026-10-20T17:00:00',
  type: 'task',
  predecessors: ['st-1-2'],
  parentId: 'st-1'
},
{
  id: 'm-v',
  title: 'Venue Locked',
  progress: 0,
  startDate: '2026-10-20T17:00:00',
  endDate: '2026-10-20T17:00:00',
  type: 'milestone',
  predecessors: ['st-1'],
  parentId: 'ev-1'
},
{
  id: 'st-2',
  title: 'Speaker Coordination',
  assignee: 'Content Team',
  progress: 0,
  startDate: '2026-10-15T09:00:00',
  endDate: '2026-11-15T17:00:00',
  type: 'task',
  parentId: 'ev-1'
},
{
  id: 'st-3',
  title: 'Marketing & Registration',
  assignee: 'Growth Team',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2026-12-01T17:00:00',
  type: 'task',
  predecessors: ['m-v'],
  parentId: 'ev-1'
},
{
  id: 'st-4',
  title: 'Final Run-through',
  assignee: 'Event Lead',
  progress: 0,
  startDate: '2026-12-10T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'task',
  predecessors: ['st-2', 'st-3'],
  parentId: 'ev-1'
},
{
  id: 'm-launch',
  title: 'Conference Day',
  progress: 0,
  startDate: '2026-12-15T17:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'milestone',
  predecessors: ['st-4'],
  parentId: 'ev-1'
},
{
  id: 'st-5',
  title: 'Post-Event Wrap Up',
  assignee: 'Operations',
  progress: 0,
  startDate: '2026-12-16T09:00:00',
  endDate: '2026-12-20T17:00:00',
  type: 'task',
  predecessors: ['m-launch'],
  parentId: 'ev-1'
},
{
  id: 'st-5-1',
  title: 'Attendee Feedback Survey',
  progress: 0,
  startDate: '2026-12-16T09:00:00',
  endDate: '2026-12-17T17:00:00',
  type: 'task',
  parentId: 'st-5'
},
{
  id: 'st-5-2',
  title: 'Vendor Payments',
  progress: 0,
  startDate: '2026-12-16T09:00:00',
  endDate: '2026-12-18T17:00:00',
  type: 'task',
  parentId: 'st-5'
},
{
  id: 'st-5-3',
  title: 'Content Archive & Upload',
  progress: 0,
  startDate: '2026-12-18T09:00:00',
  endDate: '2026-12-20T17:00:00',
  type: 'task',
  predecessors: ['st-5-1', 'st-5-2'],
  parentId: 'st-5'
},
{
  id: 'm-close',
  title: 'Project Closed',
  progress: 0,
  startDate: '2026-12-20T17:00:00',
  endDate: '2026-12-20T17:00:00',
  type: 'milestone',
  predecessors: ['st-5'],
  parentId: 'ev-1'
},
{
  id: 'ev-2',
  title: 'Q1 2027 Regional Roadshow',
  progress: 0,
  startDate: '2027-01-05T09:00:00',
  endDate: '2027-03-30T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'rs-1',
  title: 'City Selection & Permits',
  assignee: 'Legal Team',
  progress: 0,
  startDate: '2027-01-05T09:00:00',
  endDate: '2027-01-25T17:00:00',
  type: 'task',
  parentId: 'ev-2'
},
{
  id: 'rs-1-1',
  title: 'Bangalore Venue Permit',
  progress: 0,
  startDate: '2027-01-05T09:00:00',
  endDate: '2027-01-10T17:00:00',
  type: 'task',
  parentId: 'rs-1'
},
{
  id: 'rs-1-2',
  title: 'Mumbai Venue Permit',
  progress: 0,
  startDate: '2027-01-08T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['rs-1-1'],
  parentId: 'rs-1'
},
{
  id: 'rs-1-3',
  title: 'Delhi Venue Permit',
  progress: 0,
  startDate: '2027-01-12T09:00:00',
  endDate: '2027-01-20T17:00:00',
  type: 'task',
  predecessors: ['rs-1-2'],
  parentId: 'rs-1'
},
{
  id: 'rs-1-4',
  title: 'Hyderabad Venue Permit',
  progress: 0,
  startDate: '2027-01-15T09:00:00',
  endDate: '2027-01-25T17:00:00',
  type: 'task',
  predecessors: ['rs-1-3'],
  parentId: 'rs-1'
},
{
  id: 'm-permits',
  title: 'All Permits Approved',
  progress: 0,
  startDate: '2027-01-25T17:00:00',
  endDate: '2027-01-25T17:00:00',
  type: 'milestone',
  predecessors: ['rs-1'],
  parentId: 'ev-2'
},
{
  id: 'rs-2',
  title: 'Local Partner Onboarding',
  assignee: 'Partnerships',
  progress: 0,
  startDate: '2027-01-20T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['m-permits'],
  parentId: 'ev-2'
},
{
  id: 'rs-2-1',
  title: 'Partner Contract Negotiation',
  progress: 0,
  startDate: '2027-01-20T09:00:00',
  endDate: '2027-01-30T17:00:00',
  type: 'task',
  parentId: 'rs-2'
},
{
  id: 'rs-2-2',
  title: 'Partner Training Sessions',
  progress: 0,
  startDate: '2027-02-01T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['rs-2-1'],
  parentId: 'rs-2'
},
{
  id: 'rs-3',
  title: 'Marketing Rollout Per City',
  assignee: 'Regional Marketing',
  progress: 0,
  startDate: '2027-02-05T09:00:00',
  endDate: '2027-03-15T17:00:00',
  type: 'task',
  predecessors: ['rs-2'],
  parentId: 'ev-2'
},
{
  id: 'rs-3-1',
  title: 'Bangalore Campaign Live',
  progress: 0,
  startDate: '2027-02-05T09:00:00',
  endDate: '2027-02-20T17:00:00',
  type: 'task',
  parentId: 'rs-3'
},
{
  id: 'rs-3-2',
  title: 'Mumbai Campaign Live',
  progress: 0,
  startDate: '2027-02-10T09:00:00',
  endDate: '2027-02-25T17:00:00',
  type: 'task',
  predecessors: ['rs-3-1'],
  parentId: 'rs-3'
},
{
  id: 'rs-3-3',
  title: 'Delhi Campaign Live',
  progress: 0,
  startDate: '2027-02-15T09:00:00',
  endDate: '2027-03-05T17:00:00',
  type: 'task',
  predecessors: ['rs-3-2'],
  parentId: 'rs-3'
},
{
  id: 'rs-3-4',
  title: 'Hyderabad Campaign Live',
  progress: 0,
  startDate: '2027-02-20T09:00:00',
  endDate: '2027-03-15T17:00:00',
  type: 'task',
  predecessors: ['rs-3-3'],
  parentId: 'rs-3'
},
{
  id: 'm-campaigns',
  title: 'All Cities Live',
  progress: 0,
  startDate: '2027-03-15T17:00:00',
  endDate: '2027-03-15T17:00:00',
  type: 'milestone',
  predecessors: ['rs-3'],
  parentId: 'ev-2'
},
{
  id: 'rs-4',
  title: 'Executive Travel & Lodging',
  assignee: 'Admin',
  progress: 0,
  startDate: '2027-03-01T09:00:00',
  endDate: '2027-03-25T17:00:00',
  type: 'task',
  predecessors: ['m-campaigns'],
  parentId: 'ev-2'
},
];
