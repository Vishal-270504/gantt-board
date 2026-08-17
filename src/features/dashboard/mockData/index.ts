import type { Task } from '../types';

export const mockTasks: Task[] = [
  //Construction / Event Planning
  {
  id: 'ev-1',
  title: 'Annual Tech Conference 2026',
  progress: 0,
  startDate: '2026-08-01T09:00:00',
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

  {
    id: 'proj-1',
    title: 'AI Chatbot Platform Development',
    progress: 0,
    startDate: '2026-08-17T09:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-1-1',
    title: 'Requirements & Use Case Analysis',
    assignee: 'Product Team',
    progress: 0,
    startDate: '2026-08-17T09:00:00',
    endDate: '2026-08-28T17:00:00',
    type: 'task',
    parentId: 'proj-1'
  },
  {
    id: 'task-1-1-1',
    title: 'Stakeholder Interviews',
    progress: 0,
    startDate: '2026-08-17T09:00:00',
    endDate: '2026-08-21T17:00:00',
    type: 'task',
    parentId: 'task-1-1'
  },
  {
    id: 'task-1-1-2',
    title: 'User Persona Development',
    progress: 0,
    startDate: '2026-08-22T09:00:00',
    endDate: '2026-08-25T17:00:00',
    type: 'task',
    predecessors: ['task-1-1-1'],
    parentId: 'task-1-1'
  },
  {
    id: 'task-1-1-3',
    title: 'Use Case Documentation',
    progress: 0,
    startDate: '2026-08-26T09:00:00',
    endDate: '2026-08-28T17:00:00',
    type: 'task',
    predecessors: ['task-1-1-2'],
    parentId: 'task-1-1'
  },
  {
    id: 'milestone-1-1',
    title: 'Requirements Approved',
    progress: 0,
    startDate: '2026-08-28T17:00:00',
    endDate: '2026-08-28T17:00:00',
    type: 'milestone',
    predecessors: ['task-1-1'],
    parentId: 'proj-1'
  },
  {
    id: 'task-1-2',
    title: 'AI Model Selection & Training',
    assignee: 'Data Science',
    progress: 0,
    startDate: '2026-08-29T09:00:00',
    endDate: '2026-09-25T17:00:00',
    type: 'task',
    predecessors: ['milestone-1-1'],
    parentId: 'proj-1'
  },
  {
    id: 'task-1-2-1',
    title: 'Model Architecture Design',
    progress: 0,
    startDate: '2026-08-29T09:00:00',
    endDate: '2026-09-04T17:00:00',
    type: 'task',
    parentId: 'task-1-2'
  },
  {
    id: 'task-1-2-2',
    title: 'Training Data Collection & Cleaning',
    progress: 0,
    startDate: '2026-09-05T09:00:00',
    endDate: '2026-09-12T17:00:00',
    type: 'task',
    predecessors: ['task-1-2-1'],
    parentId: 'task-1-2'
  },
  {
    id: 'task-1-2-3',
    title: 'Model Training & Tuning',
    progress: 0,
    startDate: '2026-09-13T09:00:00',
    endDate: '2026-09-20T17:00:00',
    type: 'task',
    predecessors: ['task-1-2-2'],
    parentId: 'task-1-2'
  },
  {
    id: 'task-1-2-4',
    title: 'Model Validation & Testing',
    progress: 0,
    startDate: '2026-09-21T09:00:00',
    endDate: '2026-09-25T17:00:00',
    type: 'task',
    predecessors: ['task-1-2-3'],
    parentId: 'task-1-2'
  },
  {
    id: 'milestone-1-2',
    title: 'AI Model Ready',
    progress: 0,
    startDate: '2026-09-25T17:00:00',
    endDate: '2026-09-25T17:00:00',
    type: 'milestone',
    predecessors: ['task-1-2'],
    parentId: 'proj-1'
  },
  {
    id: 'task-1-3',
    title: 'Backend API Development',
    assignee: 'Backend Engineering',
    progress: 0,
    startDate: '2026-09-26T09:00:00',
    endDate: '2026-10-20T17:00:00',
    type: 'task',
    predecessors: ['milestone-1-2'],
    parentId: 'proj-1'
  },
  {
    id: 'task-1-3-1',
    title: 'API Architecture Design',
    progress: 0,
    startDate: '2026-09-26T09:00:00',
    endDate: '2026-10-01T17:00:00',
    type: 'task',
    parentId: 'task-1-3'
  },
  {
    id: 'task-1-3-2',
    title: 'Core API Endpoints',
    progress: 0,
    startDate: '2026-10-02T09:00:00',
    endDate: '2026-10-10T17:00:00',
    type: 'task',
    predecessors: ['task-1-3-1'],
    parentId: 'task-1-3'
  },
  {
    id: 'task-1-3-3',
    title: 'Model Integration Layer',
    progress: 0,
    startDate: '2026-10-11T09:00:00',
    endDate: '2026-10-17T17:00:00',
    type: 'task',
    predecessors: ['task-1-3-2'],
    parentId: 'task-1-3'
  },
  {
    id: 'task-1-3-4',
    title: 'API Security & Authentication',
    progress: 0,
    startDate: '2026-10-18T09:00:00',
    endDate: '2026-10-20T17:00:00',
    type: 'task',
    predecessors: ['task-1-3-3'],
    parentId: 'task-1-3'
  },
  {
    id: 'task-1-4',
    title: 'Frontend Application',
    assignee: 'Frontend Engineering',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'task',
    predecessors: ['milestone-1-2'],
    parentId: 'proj-1'
  },
  {
    id: 'task-1-4-1',
    title: 'UI/UX Design',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-10-08T17:00:00',
    type: 'task',
    parentId: 'task-1-4'
  },
  {
    id: 'task-1-4-2',
    title: 'Component Library Development',
    progress: 0,
    startDate: '2026-10-09T09:00:00',
    endDate: '2026-10-16T17:00:00',
    type: 'task',
    predecessors: ['task-1-4-1'],
    parentId: 'task-1-4'
  },
  {
    id: 'task-1-4-3',
    title: 'Chat Interface Implementation',
    progress: 0,
    startDate: '2026-10-17T09:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'task',
    predecessors: ['task-1-4-2'],
    parentId: 'task-1-4'
  },
  {
    id: 'task-1-4-4',
    title: 'API Integration & Testing',
    progress: 0,
    startDate: '2026-10-26T09:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'task',
    predecessors: ['task-1-4-3'],
    parentId: 'task-1-4'
  },
  {
    id: 'task-1-5',
    title: 'Integration & Testing',
    assignee: 'QA Team',
    progress: 0,
    startDate: '2026-10-21T09:00:00',
    endDate: '2026-11-15T17:00:00',
    type: 'task',
    predecessors: ['task-1-3-4', 'task-1-4-4'],
    parentId: 'proj-1'
  },
  {
    id: 'task-1-5-1',
    title: 'Integration Testing',
    progress: 0,
    startDate: '2026-10-21T09:00:00',
    endDate: '2026-10-28T17:00:00',
    type: 'task',
    parentId: 'task-1-5'
  },
  {
    id: 'task-1-5-2',
    title: 'Performance Testing',
    progress: 0,
    startDate: '2026-10-29T09:00:00',
    endDate: '2026-11-04T17:00:00',
    type: 'task',
    predecessors: ['task-1-5-1'],
    parentId: 'task-1-5'
  },
  {
    id: 'task-1-5-3',
    title: 'User Acceptance Testing',
    progress: 0,
    startDate: '2026-11-05T09:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'task',
    predecessors: ['task-1-5-2'],
    parentId: 'task-1-5'
  },
  {
    id: 'task-1-5-4',
    title: 'Bug Fixes & Refinements',
    progress: 0,
    startDate: '2026-11-11T09:00:00',
    endDate: '2026-11-15T17:00:00',
    type: 'task',
    predecessors: ['task-1-5-3'],
    parentId: 'task-1-5'
  },
  {
    id: 'milestone-1-3',
    title: 'Testing Complete',
    progress: 0,
    startDate: '2026-11-15T17:00:00',
    endDate: '2026-11-15T17:00:00',
    type: 'milestone',
    predecessors: ['task-1-5'],
    parentId: 'proj-1'
  },
  {
    id: 'task-1-6',
    title: 'Deployment & Launch',
    assignee: 'DevOps',
    progress: 0,
    startDate: '2026-11-16T09:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'task',
    predecessors: ['milestone-1-3'],
    parentId: 'proj-1'
  },
  {
    id: 'task-1-6-1',
    title: 'Production Environment Setup',
    progress: 0,
    startDate: '2026-11-16T09:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'task',
    parentId: 'task-1-6'
  },
  {
    id: 'task-1-6-2',
    title: 'Deployment Automation',
    progress: 0,
    startDate: '2026-11-21T09:00:00',
    endDate: '2026-11-24T17:00:00',
    type: 'task',
    predecessors: ['task-1-6-1'],
    parentId: 'task-1-6'
  },
  {
    id: 'task-1-6-3',
    title: 'Production Deployment',
    progress: 0,
    startDate: '2026-11-25T09:00:00',
    endDate: '2026-11-27T17:00:00',
    type: 'task',
    predecessors: ['task-1-6-2'],
    parentId: 'task-1-6'
  },
  {
    id: 'task-1-6-4',
    title: 'Post-Launch Monitoring',
    progress: 0,
    startDate: '2026-11-28T09:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'task',
    predecessors: ['task-1-6-3'],
    parentId: 'task-1-6'
  },
  {
    id: 'milestone-1-final',
    title: 'Project Launch Successful',
    progress: 0,
    startDate: '2026-11-30T17:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'milestone',
    predecessors: ['task-1-6'],
    parentId: 'proj-1'
  },

  // Project 2: E-Commerce Mobile App
  {
    id: 'proj-2',
    title: 'E-Commerce Mobile App 2.0',
    progress: 0,
    startDate: '2026-08-20T09:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-2-1',
    title: 'App Architecture Planning',
    assignee: 'Mobile Engineering',
    progress: 0,
    startDate: '2026-08-20T09:00:00',
    endDate: '2026-09-05T17:00:00',
    type: 'task',
    parentId: 'proj-2'
  },
  {
    id: 'task-2-1-1',
    title: 'Tech Stack Evaluation',
    progress: 0,
    startDate: '2026-08-20T09:00:00',
    endDate: '2026-08-25T17:00:00',
    type: 'task',
    parentId: 'task-2-1'
  },
  {
    id: 'task-2-1-2',
    title: 'App Architecture Design',
    progress: 0,
    startDate: '2026-08-26T09:00:00',
    endDate: '2026-09-01T17:00:00',
    type: 'task',
    predecessors: ['task-2-1-1'],
    parentId: 'task-2-1'
  },
  {
    id: 'task-2-1-3',
    title: 'Technical Specification Document',
    progress: 0,
    startDate: '2026-09-02T09:00:00',
    endDate: '2026-09-05T17:00:00',
    type: 'task',
    predecessors: ['task-2-1-2'],
    parentId: 'task-2-1'
  },
  {
    id: 'milestone-2-1',
    title: 'Architecture Approved',
    progress: 0,
    startDate: '2026-09-05T17:00:00',
    endDate: '2026-09-05T17:00:00',
    type: 'milestone',
    predecessors: ['task-2-1'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-2',
    title: 'User Authentication Module',
    assignee: 'Mobile Engineering',
    progress: 0,
    startDate: '2026-09-06T09:00:00',
    endDate: '2026-09-25T17:00:00',
    type: 'task',
    predecessors: ['milestone-2-1'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-2-1',
    title: 'Login/Signup UI',
    progress: 0,
    startDate: '2026-09-06T09:00:00',
    endDate: '2026-09-11T17:00:00',
    type: 'task',
    parentId: 'task-2-2'
  },
  {
    id: 'task-2-2-2',
    title: 'Biometric Authentication',
    progress: 0,
    startDate: '2026-09-12T09:00:00',
    endDate: '2026-09-18T17:00:00',
    type: 'task',
    predecessors: ['task-2-2-1'],
    parentId: 'task-2-2'
  },
  {
    id: 'task-2-2-3',
    title: 'Social Login Integration',
    progress: 0,
    startDate: '2026-09-19T09:00:00',
    endDate: '2026-09-22T17:00:00',
    type: 'task',
    predecessors: ['task-2-2-2'],
    parentId: 'task-2-2'
  },
  {
    id: 'task-2-2-4',
    title: 'Security Testing',
    progress: 0,
    startDate: '2026-09-23T09:00:00',
    endDate: '2026-09-25T17:00:00',
    type: 'task',
    predecessors: ['task-2-2-3'],
    parentId: 'task-2-2'
  },
  {
    id: 'task-2-3',
    title: 'Product Catalog & Search',
    assignee: 'Backend Engineering',
    progress: 0,
    startDate: '2026-09-06T09:00:00',
    endDate: '2026-10-10T17:00:00',
    type: 'task',
    predecessors: ['milestone-2-1'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-3-1',
    title: 'Product Database Design',
    progress: 0,
    startDate: '2026-09-06T09:00:00',
    endDate: '2026-09-12T17:00:00',
    type: 'task',
    parentId: 'task-2-3'
  },
  {
    id: 'task-2-3-2',
    title: 'Search API Development',
    progress: 0,
    startDate: '2026-09-13T09:00:00',
    endDate: '2026-09-20T17:00:00',
    type: 'task',
    predecessors: ['task-2-3-1'],
    parentId: 'task-2-3'
  },
  {
    id: 'task-2-3-3',
    title: 'Product Catalog UI',
    progress: 0,
    startDate: '2026-09-21T09:00:00',
    endDate: '2026-09-28T17:00:00',
    type: 'task',
    predecessors: ['task-2-3-2'],
    parentId: 'task-2-3'
  },
  {
    id: 'task-2-3-4',
    title: 'Advanced Search Filters',
    progress: 0,
    startDate: '2026-09-29T09:00:00',
    endDate: '2026-10-04T17:00:00',
    type: 'task',
    predecessors: ['task-2-3-3'],
    parentId: 'task-2-3'
  },
  {
    id: 'task-2-3-5',
    title: 'Search Performance Optimization',
    progress: 0,
    startDate: '2026-10-05T09:00:00',
    endDate: '2026-10-10T17:00:00',
    type: 'task',
    predecessors: ['task-2-3-4'],
    parentId: 'task-2-3'
  },
  {
    id: 'task-2-4',
    title: 'Shopping Cart & Checkout',
    assignee: 'Mobile Engineering',
    progress: 0,
    startDate: '2026-09-15T09:00:00',
    endDate: '2026-10-20T17:00:00',
    type: 'task',
    predecessors: ['task-2-2', 'task-2-3'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-4-1',
    title: 'Cart UI Development',
    progress: 0,
    startDate: '2026-09-15T09:00:00',
    endDate: '2026-09-22T17:00:00',
    type: 'task',
    parentId: 'task-2-4'
  },
  {
    id: 'task-2-4-2',
    title: 'Cart Backend Logic',
    progress: 0,
    startDate: '2026-09-23T09:00:00',
    endDate: '2026-09-30T17:00:00',
    type: 'task',
    predecessors: ['task-2-4-1'],
    parentId: 'task-2-4'
  },
  {
    id: 'task-2-4-3',
    title: 'Payment Gateway Integration',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-10-10T17:00:00',
    type: 'task',
    predecessors: ['task-2-4-2'],
    parentId: 'task-2-4'
  },
  {
    id: 'task-2-4-4',
    title: 'Order Confirmation & History',
    progress: 0,
    startDate: '2026-10-11T09:00:00',
    endDate: '2026-10-17T17:00:00',
    type: 'task',
    predecessors: ['task-2-4-3'],
    parentId: 'task-2-4'
  },
  {
    id: 'task-2-4-5',
    title: 'Checkout Flow Testing',
    progress: 0,
    startDate: '2026-10-18T09:00:00',
    endDate: '2026-10-20T17:00:00',
    type: 'task',
    predecessors: ['task-2-4-4'],
    parentId: 'task-2-4'
  },
  {
    id: 'milestone-2-2',
    title: 'Core Features Complete',
    progress: 0,
    startDate: '2026-10-20T17:00:00',
    endDate: '2026-10-20T17:00:00',
    type: 'milestone',
    predecessors: ['task-2-4'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-5',
    title: 'Push Notifications & Engagement',
    assignee: 'Backend Engineering',
    progress: 0,
    startDate: '2026-10-21T09:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'task',
    predecessors: ['milestone-2-2'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-5-1',
    title: 'Push Notification Service',
    progress: 0,
    startDate: '2026-10-21T09:00:00',
    endDate: '2026-10-27T17:00:00',
    type: 'task',
    parentId: 'task-2-5'
  },
  {
    id: 'task-2-5-2',
    title: 'User Engagement Analytics',
    progress: 0,
    startDate: '2026-10-28T09:00:00',
    endDate: '2026-11-03T17:00:00',
    type: 'task',
    predecessors: ['task-2-5-1'],
    parentId: 'task-2-5'
  },
  {
    id: 'task-2-5-3',
    title: 'Personalized Recommendations',
    progress: 0,
    startDate: '2026-11-04T09:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'task',
    predecessors: ['task-2-5-2'],
    parentId: 'task-2-5'
  },
  {
    id: 'task-2-6',
    title: 'Testing & Quality Assurance',
    assignee: 'QA Team',
    progress: 0,
    startDate: '2026-11-11T09:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'task',
    predecessors: ['task-2-5'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-6-1',
    title: 'Functional Testing',
    progress: 0,
    startDate: '2026-11-11T09:00:00',
    endDate: '2026-11-17T17:00:00',
    type: 'task',
    parentId: 'task-2-6'
  },
  {
    id: 'task-2-6-2',
    title: 'Performance & Load Testing',
    progress: 0,
    startDate: '2026-11-18T09:00:00',
    endDate: '2026-11-23T17:00:00',
    type: 'task',
    predecessors: ['task-2-6-1'],
    parentId: 'task-2-6'
  },
  {
    id: 'task-2-6-3',
    title: 'Security & Penetration Testing',
    progress: 0,
    startDate: '2026-11-24T09:00:00',
    endDate: '2026-11-28T17:00:00',
    type: 'task',
    predecessors: ['task-2-6-2'],
    parentId: 'task-2-6'
  },
  {
    id: 'task-2-6-4',
    title: 'Bug Fixing & Refinement',
    progress: 0,
    startDate: '2026-11-29T09:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'task',
    predecessors: ['task-2-6-3'],
    parentId: 'task-2-6'
  },
  {
    id: 'milestone-2-3',
    title: 'QA Signoff Complete',
    progress: 0,
    startDate: '2026-12-01T17:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'milestone',
    predecessors: ['task-2-6'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-7',
    title: 'App Store Submission',
    assignee: 'Product Team',
    progress: 0,
    startDate: '2026-12-02T09:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'task',
    predecessors: ['milestone-2-3'],
    parentId: 'proj-2'
  },
  {
    id: 'task-2-7-1',
    title: 'App Store Assets Creation',
    progress: 0,
    startDate: '2026-12-02T09:00:00',
    endDate: '2026-12-05T17:00:00',
    type: 'task',
    parentId: 'task-2-7'
  },
  {
    id: 'task-2-7-2',
    title: 'App Store Listing Optimization',
    progress: 0,
    startDate: '2026-12-06T09:00:00',
    endDate: '2026-12-10T17:00:00',
    type: 'task',
    predecessors: ['task-2-7-1'],
    parentId: 'task-2-7'
  },
  {
    id: 'task-2-7-3',
    title: 'App Store Review Process',
    progress: 0,
    startDate: '2026-12-11T09:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'task',
    predecessors: ['task-2-7-2'],
    parentId: 'task-2-7'
  },
  {
    id: 'milestone-2-final',
    title: 'App Available on Stores',
    progress: 0,
    startDate: '2026-12-15T17:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'milestone',
    predecessors: ['task-2-7'],
    parentId: 'proj-2'
  },

  // Project 3: Data Analytics Dashboard
  {
    id: 'proj-3',
    title: 'Enterprise Analytics Dashboard',
    progress: 0,
    startDate: '2026-08-25T09:00:00',
    endDate: '2026-12-10T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-3-1',
    title: 'Data Pipeline Setup',
    assignee: 'Data Engineering',
    progress: 0,
    startDate: '2026-08-25T09:00:00',
    endDate: '2026-09-18T17:00:00',
    type: 'task',
    parentId: 'proj-3'
  },
  {
    id: 'task-3-1-1',
    title: 'Data Source Integration',
    progress: 0,
    startDate: '2026-08-25T09:00:00',
    endDate: '2026-09-01T17:00:00',
    type: 'task',
    parentId: 'task-3-1'
  },
  {
    id: 'task-3-1-2',
    title: 'ETL Process Design',
    progress: 0,
    startDate: '2026-09-02T09:00:00',
    endDate: '2026-09-08T17:00:00',
    type: 'task',
    predecessors: ['task-3-1-1'],
    parentId: 'task-3-1'
  },
  {
    id: 'task-3-1-3',
    title: 'Data Warehousing',
    progress: 0,
    startDate: '2026-09-09T09:00:00',
    endDate: '2026-09-15T17:00:00',
    type: 'task',
    predecessors: ['task-3-1-2'],
    parentId: 'task-3-1'
  },
  {
    id: 'task-3-1-4',
    title: 'Data Quality Validation',
    progress: 0,
    startDate: '2026-09-16T09:00:00',
    endDate: '2026-09-18T17:00:00',
    type: 'task',
    predecessors: ['task-3-1-3'],
    parentId: 'task-3-1'
  },
  {
    id: 'milestone-3-1',
    title: 'Data Pipeline Complete',
    progress: 0,
    startDate: '2026-09-18T17:00:00',
    endDate: '2026-09-18T17:00:00',
    type: 'milestone',
    predecessors: ['task-3-1'],
    parentId: 'proj-3'
  },
  {
    id: 'task-3-2',
    title: 'Dashboard UI/UX Design',
    assignee: 'Design Team',
    progress: 0,
    startDate: '2026-09-01T09:00:00',
    endDate: '2026-09-25T17:00:00',
    type: 'task',
    parentId: 'proj-3'
  },
  {
    id: 'task-3-2-1',
    title: 'User Research & Wireframing',
    progress: 0,
    startDate: '2026-09-01T09:00:00',
    endDate: '2026-09-08T17:00:00',
    type: 'task',
    parentId: 'task-3-2'
  },
  {
    id: 'task-3-2-2',
    title: 'Visual Design System',
    progress: 0,
    startDate: '2026-09-09T09:00:00',
    endDate: '2026-09-16T17:00:00',
    type: 'task',
    predecessors: ['task-3-2-1'],
    parentId: 'task-3-2'
  },
  {
    id: 'task-3-2-3',
    title: 'Dashboard Layout Design',
    progress: 0,
    startDate: '2026-09-17T09:00:00',
    endDate: '2026-09-22T17:00:00',
    type: 'task',
    predecessors: ['task-3-2-2'],
    parentId: 'task-3-2'
  },
  {
    id: 'task-3-2-4',
    title: 'Design Review & Approval',
    progress: 0,
    startDate: '2026-09-23T09:00:00',
    endDate: '2026-09-25T17:00:00',
    type: 'task',
    predecessors: ['task-3-2-3'],
    parentId: 'task-3-2'
  },
  {
    id: 'task-3-3',
    title: 'Analytics API Development',
    assignee: 'Backend Engineering',
    progress: 0,
    startDate: '2026-09-19T09:00:00',
    endDate: '2026-10-15T17:00:00',
    type: 'task',
    predecessors: ['milestone-3-1'],
    parentId: 'proj-3'
  },
  {
    id: 'task-3-3-1',
    title: 'API Architecture & Design',
    progress: 0,
    startDate: '2026-09-19T09:00:00',
    endDate: '2026-09-24T17:00:00',
    type: 'task',
    parentId: 'task-3-3'
  },
  {
    id: 'task-3-3-2',
    title: 'Core Analytics Endpoints',
    progress: 0,
    startDate: '2026-09-25T09:00:00',
    endDate: '2026-10-02T17:00:00',
    type: 'task',
    predecessors: ['task-3-3-1'],
    parentId: 'task-3-3'
  },
  {
    id: 'task-3-3-3',
    title: 'Query Optimization',
    progress: 0,
    startDate: '2026-10-03T09:00:00',
    endDate: '2026-10-08T17:00:00',
    type: 'task',
    predecessors: ['task-3-3-2'],
    parentId: 'task-3-3'
  },
  {
    id: 'task-3-3-4',
    title: 'API Security & Authentication',
    progress: 0,
    startDate: '2026-10-09T09:00:00',
    endDate: '2026-10-12T17:00:00',
    type: 'task',
    predecessors: ['task-3-3-3'],
    parentId: 'task-3-3'
  },
  {
    id: 'task-3-3-5',
    title: 'API Documentation',
    progress: 0,
    startDate: '2026-10-13T09:00:00',
    endDate: '2026-10-15T17:00:00',
    type: 'task',
    predecessors: ['task-3-3-4'],
    parentId: 'task-3-3'
  },
  {
    id: 'task-3-4',
    title: 'Frontend Dashboard Implementation',
    assignee: 'Frontend Engineering',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'task',
    predecessors: ['task-3-2-4', 'task-3-3'],
    parentId: 'proj-3'
  },
  {
    id: 'task-3-4-1',
    title: 'Dashboard Component Setup',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-10-08T17:00:00',
    type: 'task',
    parentId: 'task-3-4'
  },
  {
    id: 'task-3-4-2',
    title: 'Data Visualization Charts',
    progress: 0,
    startDate: '2026-10-09T09:00:00',
    endDate: '2026-10-20T17:00:00',
    type: 'task',
    predecessors: ['task-3-4-1'],
    parentId: 'task-3-4'
  },
  {
    id: 'task-3-4-3',
    title: 'Dashboard Filters & Interactivity',
    progress: 0,
    startDate: '2026-10-21T09:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'task',
    predecessors: ['task-3-4-2'],
    parentId: 'task-3-4'
  },
  {
    id: 'task-3-4-4',
    title: 'API Integration',
    progress: 0,
    startDate: '2026-10-31T09:00:00',
    endDate: '2026-11-05T17:00:00',
    type: 'task',
    predecessors: ['task-3-4-3'],
    parentId: 'task-3-4'
  },
  {
    id: 'task-3-4-5',
    title: 'Performance Optimization',
    progress: 0,
    startDate: '2026-11-06T09:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'task',
    predecessors: ['task-3-4-4'],
    parentId: 'task-3-4'
  },
  {
    id: 'milestone-3-2',
    title: 'Dashboard Functional',
    progress: 0,
    startDate: '2026-11-10T17:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'milestone',
    predecessors: ['task-3-4'],
    parentId: 'proj-3'
  },
  {
    id: 'task-3-5',
    title: 'User Access & Permissions',
    assignee: 'Security Team',
    progress: 0,
    startDate: '2026-11-11T09:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'task',
    predecessors: ['milestone-3-2'],
    parentId: 'proj-3'
  },
  {
    id: 'task-3-5-1',
    title: 'Role-Based Access Control',
    progress: 0,
    startDate: '2026-11-11T09:00:00',
    endDate: '2026-11-18T17:00:00',
    type: 'task',
    parentId: 'task-3-5'
  },
  {
    id: 'task-3-5-2',
    title: 'User Management Interface',
    progress: 0,
    startDate: '2026-11-19T09:00:00',
    endDate: '2026-11-24T17:00:00',
    type: 'task',
    predecessors: ['task-3-5-1'],
    parentId: 'task-3-5'
  },
  {
    id: 'task-3-5-3',
    title: 'Data Security Compliance',
    progress: 0,
    startDate: '2026-11-25T09:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'task',
    predecessors: ['task-3-5-2'],
    parentId: 'task-3-5'
  },
  {
    id: 'task-3-6',
    title: 'Testing & User Training',
    assignee: 'Product Team',
    progress: 0,
    startDate: '2026-12-01T09:00:00',
    endDate: '2026-12-10T17:00:00',
    type: 'task',
    predecessors: ['task-3-5'],
    parentId: 'proj-3'
  },
  {
    id: 'task-3-6-1',
    title: 'User Acceptance Testing',
    progress: 0,
    startDate: '2026-12-01T09:00:00',
    endDate: '2026-12-04T17:00:00',
    type: 'task',
    parentId: 'task-3-6'
  },
  {
    id: 'task-3-6-2',
    title: 'Training Materials Creation',
    progress: 0,
    startDate: '2026-12-05T09:00:00',
    endDate: '2026-12-08T17:00:00',
    type: 'task',
    predecessors: ['task-3-6-1'],
    parentId: 'task-3-6'
  },
  {
    id: 'task-3-6-3',
    title: 'User Training Sessions',
    progress: 0,
    startDate: '2026-12-09T09:00:00',
    endDate: '2026-12-10T17:00:00',
    type: 'task',
    predecessors: ['task-3-6-2'],
    parentId: 'task-3-6'
  },
  {
    id: 'milestone-3-final',
    title: 'Dashboard Live',
    progress: 0,
    startDate: '2026-12-10T17:00:00',
    endDate: '2026-12-10T17:00:00',
    type: 'milestone',
    predecessors: ['task-3-6'],
    parentId: 'proj-3'
  },

  // Project 4: Marketing Automation Platform
  {
    id: 'proj-4',
    title: 'Marketing Automation Platform',
    progress: 0,
    startDate: '2026-09-01T09:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-4-1',
    title: 'Platform Strategy & Roadmap',
    assignee: 'Product Management',
    progress: 0,
    startDate: '2026-09-01T09:00:00',
    endDate: '2026-09-20T17:00:00',
    type: 'task',
    parentId: 'proj-4'
  },
  {
    id: 'task-4-1-1',
    title: 'Market Research',
    progress: 0,
    startDate: '2026-09-01T09:00:00',
    endDate: '2026-09-08T17:00:00',
    type: 'task',
    parentId: 'task-4-1'
  },
  {
    id: 'task-4-1-2',
    title: 'Competitive Analysis',
    progress: 0,
    startDate: '2026-09-09T09:00:00',
    endDate: '2026-09-14T17:00:00',
    type: 'task',
    predecessors: ['task-4-1-1'],
    parentId: 'task-4-1'
  },
  {
    id: 'task-4-1-3',
    title: 'Feature Prioritization',
    progress: 0,
    startDate: '2026-09-15T09:00:00',
    endDate: '2026-09-18T17:00:00',
    type: 'task',
    predecessors: ['task-4-1-2'],
    parentId: 'task-4-1'
  },
  {
    id: 'task-4-1-4',
    title: 'Product Roadmap Creation',
    progress: 0,
    startDate: '2026-09-19T09:00:00',
    endDate: '2026-09-20T17:00:00',
    type: 'task',
    predecessors: ['task-4-1-3'],
    parentId: 'task-4-1'
  },
  {
    id: 'task-4-2',
    title: 'Email Marketing Module',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2026-09-21T09:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'task',
    predecessors: ['task-4-1-4'],
    parentId: 'proj-4'
  },
  {
    id: 'task-4-2-1',
    title: 'Email Template Builder',
    progress: 0,
    startDate: '2026-09-21T09:00:00',
    endDate: '2026-09-30T17:00:00',
    type: 'task',
    parentId: 'task-4-2'
  },
  {
    id: 'task-4-2-2',
    title: 'Email Campaign Management',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-10-10T17:00:00',
    type: 'task',
    predecessors: ['task-4-2-1'],
    parentId: 'task-4-2'
  },
  {
    id: 'task-4-2-3',
    title: 'Email Deliverability Optimization',
    progress: 0,
    startDate: '2026-10-11T09:00:00',
    endDate: '2026-10-18T17:00:00',
    type: 'task',
    predecessors: ['task-4-2-2'],
    parentId: 'task-4-2'
  },
  {
    id: 'task-4-2-4',
    title: 'Analytics & Reporting',
    progress: 0,
    startDate: '2026-10-19T09:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'task',
    predecessors: ['task-4-2-3'],
    parentId: 'task-4-2'
  },
  {
    id: 'milestone-4-1',
    title: 'Email Module Complete',
    progress: 0,
    startDate: '2026-10-25T17:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'milestone',
    predecessors: ['task-4-2'],
    parentId: 'proj-4'
  },
  {
    id: 'task-4-3',
    title: 'Social Media Management',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-11-15T17:00:00',
    type: 'task',
    predecessors: ['task-4-1-4'],
    parentId: 'proj-4'
  },
  {
    id: 'task-4-3-1',
    title: 'Social API Integration',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-10-12T17:00:00',
    type: 'task',
    parentId: 'task-4-3'
  },
  {
    id: 'task-4-3-2',
    title: 'Content Scheduling Engine',
    progress: 0,
    startDate: '2026-10-13T09:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'task',
    predecessors: ['task-4-3-1'],
    parentId: 'task-4-3'
  },
  {
    id: 'task-4-3-3',
    title: 'Social Analytics Dashboard',
    progress: 0,
    startDate: '2026-10-26T09:00:00',
    endDate: '2026-11-05T17:00:00',
    type: 'task',
    predecessors: ['task-4-3-2'],
    parentId: 'task-4-3'
  },
  {
    id: 'task-4-3-4',
    title: 'Engagement Tracking',
    progress: 0,
    startDate: '2026-11-06T09:00:00',
    endDate: '2026-11-15T17:00:00',
    type: 'task',
    predecessors: ['task-4-3-3'],
    parentId: 'task-4-3'
  },
  {
    id: 'task-4-4',
    title: 'CRM Integration',
    assignee: 'Backend Engineering',
    progress: 0,
    startDate: '2026-10-26T09:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'task',
    predecessors: ['milestone-4-1'],
    parentId: 'proj-4'
  },
  {
    id: 'task-4-4-1',
    title: 'CRM API Design',
    progress: 0,
    startDate: '2026-10-26T09:00:00',
    endDate: '2026-11-02T17:00:00',
    type: 'task',
    parentId: 'task-4-4'
  },
  {
    id: 'task-4-4-2',
    title: 'Data Sync Implementation',
    progress: 0,
    startDate: '2026-11-03T09:00:00',
    endDate: '2026-11-12T17:00:00',
    type: 'task',
    predecessors: ['task-4-4-1'],
    parentId: 'task-4-4'
  },
  {
    id: 'task-4-4-3',
    title: 'Contact Management',
    progress: 0,
    startDate: '2026-11-13T09:00:00',
    endDate: '2026-11-22T17:00:00',
    type: 'task',
    predecessors: ['task-4-4-2'],
    parentId: 'task-4-4'
  },
  {
    id: 'task-4-4-4',
    title: 'Integration Testing',
    progress: 0,
    startDate: '2026-11-23T09:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'task',
    predecessors: ['task-4-4-3'],
    parentId: 'task-4-4'
  },
  {
    id: 'milestone-4-2',
    title: 'CRM Integration Complete',
    progress: 0,
    startDate: '2026-11-30T17:00:00',
    endDate: '2026-11-30T17:00:00',
    type: 'milestone',
    predecessors: ['task-4-4'],
    parentId: 'proj-4'
  },
  {
    id: 'task-4-5',
    title: 'Automation Workflow Engine',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2026-12-01T09:00:00',
    endDate: '2027-01-10T17:00:00',
    type: 'task',
    predecessors: ['milestone-4-2'],
    parentId: 'proj-4'
  },
  {
    id: 'task-4-5-1',
    title: 'Workflow Builder UI',
    progress: 0,
    startDate: '2026-12-01T09:00:00',
    endDate: '2026-12-12T17:00:00',
    type: 'task',
    parentId: 'task-4-5'
  },
  {
    id: 'task-4-5-2',
    title: 'Trigger & Action Logic',
    progress: 0,
    startDate: '2026-12-13T09:00:00',
    endDate: '2026-12-23T17:00:00',
    type: 'task',
    predecessors: ['task-4-5-1'],
    parentId: 'task-4-5'
  },
  {
    id: 'task-4-5-3',
    title: 'Conditional Logic Engine',
    progress: 0,
    startDate: '2026-12-24T09:00:00',
    endDate: '2027-01-03T17:00:00',
    type: 'task',
    predecessors: ['task-4-5-2'],
    parentId: 'task-4-5'
  },
  {
    id: 'task-4-5-4',
    title: 'Workflow Testing & Debugging',
    progress: 0,
    startDate: '2027-01-04T09:00:00',
    endDate: '2027-01-10T17:00:00',
    type: 'task',
    predecessors: ['task-4-5-3'],
    parentId: 'task-4-5'
  },
  {
    id: 'task-4-6',
    title: 'Analytics & Reporting Dashboard',
    assignee: 'Data Science',
    progress: 0,
    startDate: '2027-01-11T09:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'task',
    predecessors: ['task-4-5'],
    parentId: 'proj-4'
  },
  {
    id: 'task-4-6-1',
    title: 'Campaign Performance Metrics',
    progress: 0,
    startDate: '2027-01-11T09:00:00',
    endDate: '2027-01-14T17:00:00',
    type: 'task',
    parentId: 'task-4-6'
  },
  {
    id: 'task-4-6-2',
    title: 'ROI Analysis Dashboard',
    progress: 0,
    startDate: '2027-01-15T09:00:00',
    endDate: '2027-01-18T17:00:00',
    type: 'task',
    predecessors: ['task-4-6-1'],
    parentId: 'task-4-6'
  },
  {
    id: 'task-4-6-3',
    title: 'Export & Share Features',
    progress: 0,
    startDate: '2027-01-19T09:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'task',
    predecessors: ['task-4-6-2'],
    parentId: 'task-4-6'
  },
  {
    id: 'milestone-4-final',
    title: 'Platform Launch Ready',
    progress: 0,
    startDate: '2027-01-20T17:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'milestone',
    predecessors: ['task-4-6'],
    parentId: 'proj-4'
  },

  // Project 5: HR Management System
  {
    id: 'proj-5',
    title: 'HR Management System',
    progress: 0,
    startDate: '2026-09-10T09:00:00',
    endDate: '2027-02-15T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-5-1',
    title: 'HR Requirements & Compliance',
    assignee: 'HR Team',
    progress: 0,
    startDate: '2026-09-10T09:00:00',
    endDate: '2026-10-01T17:00:00',
    type: 'task',
    parentId: 'proj-5'
  },
  {
    id: 'task-5-1-1',
    title: 'Legal Compliance Review',
    progress: 0,
    startDate: '2026-09-10T09:00:00',
    endDate: '2026-09-18T17:00:00',
    type: 'task',
    parentId: 'task-5-1'
  },
  {
    id: 'task-5-1-2',
    title: 'HR Process Mapping',
    progress: 0,
    startDate: '2026-09-19T09:00:00',
    endDate: '2026-09-25T17:00:00',
    type: 'task',
    predecessors: ['task-5-1-1'],
    parentId: 'task-5-1'
  },
  {
    id: 'task-5-1-3',
    title: 'Feature Requirements Document',
    progress: 0,
    startDate: '2026-09-26T09:00:00',
    endDate: '2026-10-01T17:00:00',
    type: 'task',
    predecessors: ['task-5-1-2'],
    parentId: 'task-5-1'
  },
  {
    id: 'milestone-5-1',
    title: 'Requirements Finalized',
    progress: 0,
    startDate: '2026-10-01T17:00:00',
    endDate: '2026-10-01T17:00:00',
    type: 'milestone',
    predecessors: ['task-5-1'],
    parentId: 'proj-5'
  },
  {
    id: 'task-5-2',
    title: 'Employee Database & Records',
    assignee: 'Backend Engineering',
    progress: 0,
    startDate: '2026-10-02T09:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'task',
    predecessors: ['milestone-5-1'],
    parentId: 'proj-5'
  },
  {
    id: 'task-5-2-1',
    title: 'Database Schema Design',
    progress: 0,
    startDate: '2026-10-02T09:00:00',
    endDate: '2026-10-09T17:00:00',
    type: 'task',
    parentId: 'task-5-2'
  },
  {
    id: 'task-5-2-2',
    title: 'Employee Data Import',
    progress: 0,
    startDate: '2026-10-10T09:00:00',
    endDate: '2026-10-17T17:00:00',
    type: 'task',
    predecessors: ['task-5-2-1'],
    parentId: 'task-5-2'
  },
  {
    id: 'task-5-2-3',
    title: 'Employee Self-Service Portal',
    progress: 0,
    startDate: '2026-10-18T09:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'task',
    predecessors: ['task-5-2-2'],
    parentId: 'task-5-2'
  },
  {
    id: 'task-5-2-4',
    title: 'Data Security & Privacy',
    progress: 0,
    startDate: '2026-10-26T09:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'task',
    predecessors: ['task-5-2-3'],
    parentId: 'task-5-2'
  },
  {
    id: 'task-5-3',
    title: 'Attendance & Leave Management',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2026-10-02T09:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'task',
    predecessors: ['milestone-5-1'],
    parentId: 'proj-5'
  },
  {
    id: 'task-5-3-1',
    title: 'Attendance Tracking System',
    progress: 0,
    startDate: '2026-10-02T09:00:00',
    endDate: '2026-10-15T17:00:00',
    type: 'task',
    parentId: 'task-5-3'
  },
  {
    id: 'task-5-3-2',
    title: 'Leave Request Workflow',
    progress: 0,
    startDate: '2026-10-16T09:00:00',
    endDate: '2026-10-28T17:00:00',
    type: 'task',
    predecessors: ['task-5-3-1'],
    parentId: 'task-5-3'
  },
  {
    id: 'task-5-3-3',
    title: 'Approval System Integration',
    progress: 0,
    startDate: '2026-10-29T09:00:00',
    endDate: '2026-11-08T17:00:00',
    type: 'task',
    predecessors: ['task-5-3-2'],
    parentId: 'task-5-3'
  },
  {
    id: 'task-5-3-4',
    title: 'Leave Balance Dashboard',
    progress: 0,
    startDate: '2026-11-09T09:00:00',
    endDate: '2026-11-15T17:00:00',
    type: 'task',
    predecessors: ['task-5-3-3'],
    parentId: 'task-5-3'
  },
  {
    id: 'task-5-3-5',
    title: 'Holiday Calendar Management',
    progress: 0,
    startDate: '2026-11-16T09:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'task',
    predecessors: ['task-5-3-4'],
    parentId: 'task-5-3'
  },
  {
    id: 'milestone-5-2',
    title: 'Attendance & Leave Module Ready',
    progress: 0,
    startDate: '2026-11-20T17:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'milestone',
    predecessors: ['task-5-3'],
    parentId: 'proj-5'
  },
  {
    id: 'task-5-4',
    title: 'Performance Management',
    assignee: 'HR Team',
    progress: 0,
    startDate: '2026-11-21T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['milestone-5-2'],
    parentId: 'proj-5'
  },
  {
    id: 'task-5-4-1',
    title: 'Goal Setting & Tracking',
    progress: 0,
    startDate: '2026-11-21T09:00:00',
    endDate: '2026-12-02T17:00:00',
    type: 'task',
    parentId: 'task-5-4'
  },
  {
    id: 'task-5-4-2',
    title: 'Performance Review Cycle',
    progress: 0,
    startDate: '2026-12-03T09:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'task',
    predecessors: ['task-5-4-1'],
    parentId: 'task-5-4'
  },
  {
    id: 'task-5-4-3',
    title: 'Feedback & 360 Review System',
    progress: 0,
    startDate: '2026-12-16T09:00:00',
    endDate: '2026-12-28T17:00:00',
    type: 'task',
    predecessors: ['task-5-4-2'],
    parentId: 'task-5-4'
  },
  {
    id: 'task-5-4-4',
    title: 'Performance Analytics',
    progress: 0,
    startDate: '2026-12-29T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['task-5-4-3'],
    parentId: 'task-5-4'
  },
  {
    id: 'task-5-5',
    title: 'Payroll & Benefits Integration',
    assignee: 'Finance Team',
    progress: 0,
    startDate: '2026-12-01T09:00:00',
    endDate: '2027-01-25T17:00:00',
    type: 'task',
    predecessors: ['task-5-2', 'task-5-3'],
    parentId: 'proj-5'
  },
  {
    id: 'task-5-5-1',
    title: 'Payroll System Integration',
    progress: 0,
    startDate: '2026-12-01T09:00:00',
    endDate: '2026-12-12T17:00:00',
    type: 'task',
    parentId: 'task-5-5'
  },
  {
    id: 'task-5-5-2',
    title: 'Benefits Management Module',
    progress: 0,
    startDate: '2026-12-13T09:00:00',
    endDate: '2026-12-24T17:00:00',
    type: 'task',
    predecessors: ['task-5-5-1'],
    parentId: 'task-5-5'
  },
  {
    id: 'task-5-5-3',
    title: 'Tax Compliance Setup',
    progress: 0,
    startDate: '2026-12-25T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['task-5-5-2'],
    parentId: 'task-5-5'
  },
  {
    id: 'task-5-5-4',
    title: 'Payroll Processing Automation',
    progress: 0,
    startDate: '2027-01-06T09:00:00',
    endDate: '2027-01-18T17:00:00',
    type: 'task',
    predecessors: ['task-5-5-3'],
    parentId: 'task-5-5'
  },
  {
    id: 'task-5-5-5',
    title: 'End-to-End Testing',
    progress: 0,
    startDate: '2027-01-19T09:00:00',
    endDate: '2027-01-25T17:00:00',
    type: 'task',
    predecessors: ['task-5-5-4'],
    parentId: 'task-5-5'
  },
  {
    id: 'milestone-5-3',
    title: 'HR System Complete',
    progress: 0,
    startDate: '2027-01-25T17:00:00',
    endDate: '2027-01-25T17:00:00',
    type: 'milestone',
    predecessors: ['task-5-5'],
    parentId: 'proj-5'
  },
  {
    id: 'task-5-6',
    title: 'Training & Onboarding',
    assignee: 'HR Team',
    progress: 0,
    startDate: '2027-01-26T09:00:00',
    endDate: '2027-02-15T17:00:00',
    type: 'task',
    predecessors: ['milestone-5-3'],
    parentId: 'proj-5'
  },
  {
    id: 'task-5-6-1',
    title: 'User Manual Creation',
    progress: 0,
    startDate: '2027-01-26T09:00:00',
    endDate: '2027-02-01T17:00:00',
    type: 'task',
    parentId: 'task-5-6'
  },
  {
    id: 'task-5-6-2',
    title: 'HR Staff Training',
    progress: 0,
    startDate: '2027-02-02T09:00:00',
    endDate: '2027-02-08T17:00:00',
    type: 'task',
    predecessors: ['task-5-6-1'],
    parentId: 'task-5-6'
  },
  {
    id: 'task-5-6-3',
    title: 'Pilot Phase & Feedback',
    progress: 0,
    startDate: '2027-02-09T09:00:00',
    endDate: '2027-02-13T17:00:00',
    type: 'task',
    predecessors: ['task-5-6-2'],
    parentId: 'task-5-6'
  },
  {
    id: 'task-5-6-4',
    title: 'System Launch & Rollout',
    progress: 0,
    startDate: '2027-02-14T09:00:00',
    endDate: '2027-02-15T17:00:00',
    type: 'task',
    predecessors: ['task-5-6-3'],
    parentId: 'task-5-6'
  },
    {
    id: 'milestone-5-final',
    title: 'HR System Live',
    progress: 0,
    startDate: '2027-02-15T17:00:00',
    endDate: '2027-02-15T17:00:00',
    type: 'milestone',
    predecessors: ['task-5-6'],
    parentId: 'proj-5'
  },

  // Project 6: Cloud Infrastructure Migration
  {
    id: 'proj-6',
    title: 'Cloud Infrastructure Migration',
    progress: 0,
    startDate: '2026-09-15T09:00:00',
    endDate: '2027-01-30T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-6-1',
    title: 'Infrastructure Assessment',
    assignee: 'DevOps Team',
    progress: 0,
    startDate: '2026-09-15T09:00:00',
    endDate: '2026-10-05T17:00:00',
    type: 'task',
    parentId: 'proj-6'
  },
  {
    id: 'task-6-1-1',
    title: 'Current Infrastructure Audit',
    progress: 0,
    startDate: '2026-09-15T09:00:00',
    endDate: '2026-09-22T17:00:00',
    type: 'task',
    parentId: 'task-6-1'
  },
  {
    id: 'task-6-1-2',
    title: 'Cloud Provider Evaluation',
    progress: 0,
    startDate: '2026-09-23T09:00:00',
    endDate: '2026-09-29T17:00:00',
    type: 'task',
    predecessors: ['task-6-1-1'],
    parentId: 'task-6-1'
  },
  {
    id: 'task-6-1-3',
    title: 'Migration Strategy Document',
    progress: 0,
    startDate: '2026-09-30T09:00:00',
    endDate: '2026-10-05T17:00:00',
    type: 'task',
    predecessors: ['task-6-1-2'],
    parentId: 'task-6-1'
  },
  {
    id: 'milestone-6-1',
    title: 'Migration Plan Approved',
    progress: 0,
    startDate: '2026-10-05T17:00:00',
    endDate: '2026-10-05T17:00:00',
    type: 'milestone',
    predecessors: ['task-6-1'],
    parentId: 'proj-6'
  },
  {
    id: 'task-6-2',
    title: 'Cloud Environment Setup',
    assignee: 'DevOps Team',
    progress: 0,
    startDate: '2026-10-06T09:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'task',
    predecessors: ['milestone-6-1'],
    parentId: 'proj-6'
  },
  {
    id: 'task-6-2-1',
    title: 'Cloud Account & VPC Setup',
    progress: 0,
    startDate: '2026-10-06T09:00:00',
    endDate: '2026-10-12T17:00:00',
    type: 'task',
    parentId: 'task-6-2'
  },
  {
    id: 'task-6-2-2',
    title: 'Network & Security Configuration',
    progress: 0,
    startDate: '2026-10-13T09:00:00',
    endDate: '2026-10-20T17:00:00',
    type: 'task',
    predecessors: ['task-6-2-1'],
    parentId: 'task-6-2'
  },
  {
    id: 'task-6-2-3',
    title: 'Storage & Database Setup',
    progress: 0,
    startDate: '2026-10-21T09:00:00',
    endDate: '2026-10-27T17:00:00',
    type: 'task',
    predecessors: ['task-6-2-2'],
    parentId: 'task-6-2'
  },
  {
    id: 'task-6-2-4',
    title: 'Monitoring & Logging Setup',
    progress: 0,
    startDate: '2026-10-28T09:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'task',
    predecessors: ['task-6-2-3'],
    parentId: 'task-6-2'
  },
  {
    id: 'milestone-6-2',
    title: 'Cloud Environment Ready',
    progress: 0,
    startDate: '2026-10-30T17:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'milestone',
    predecessors: ['task-6-2'],
    parentId: 'proj-6'
  },
  {
    id: 'task-6-3',
    title: 'Application Migration',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2026-10-31T09:00:00',
    endDate: '2026-12-10T17:00:00',
    type: 'task',
    predecessors: ['milestone-6-2'],
    parentId: 'proj-6'
  },
  {
    id: 'task-6-3-1',
    title: 'App Containerization',
    progress: 0,
    startDate: '2026-10-31T09:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'task',
    parentId: 'task-6-3'
  },
  {
    id: 'task-6-3-2',
    title: 'Database Migration',
    progress: 0,
    startDate: '2026-11-11T09:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'task',
    predecessors: ['task-6-3-1'],
    parentId: 'task-6-3'
  },
  {
    id: 'task-6-3-3',
    title: 'Application Deployment',
    progress: 0,
    startDate: '2026-11-21T09:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'task',
    predecessors: ['task-6-3-2'],
    parentId: 'task-6-3'
  },
  {
    id: 'task-6-3-4',
    title: 'Testing & Validation',
    progress: 0,
    startDate: '2026-12-02T09:00:00',
    endDate: '2026-12-10T17:00:00',
    type: 'task',
    predecessors: ['task-6-3-3'],
    parentId: 'task-6-3'
  },
  {
    id: 'milestone-6-3',
    title: 'Application Migration Complete',
    progress: 0,
    startDate: '2026-12-10T17:00:00',
    endDate: '2026-12-10T17:00:00',
    type: 'milestone',
    predecessors: ['task-6-3'],
    parentId: 'proj-6'
  },
  {
    id: 'task-6-4',
    title: 'Data Migration & Sync',
    assignee: 'Data Engineering',
    progress: 0,
    startDate: '2026-11-15T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['task-6-3-2'],
    parentId: 'proj-6'
  },
  {
    id: 'task-6-4-1',
    title: 'Data Backup & Validation',
    progress: 0,
    startDate: '2026-11-15T09:00:00',
    endDate: '2026-11-25T17:00:00',
    type: 'task',
    parentId: 'task-6-4'
  },
  {
    id: 'task-6-4-2',
    title: 'Data Transfer & Sync',
    progress: 0,
    startDate: '2026-11-26T09:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'task',
    predecessors: ['task-6-4-1'],
    parentId: 'task-6-4'
  },
  {
    id: 'task-6-4-3',
    title: 'Data Validation & Integrity Check',
    progress: 0,
    startDate: '2026-12-16T09:00:00',
    endDate: '2026-12-28T17:00:00',
    type: 'task',
    predecessors: ['task-6-4-2'],
    parentId: 'task-6-4'
  },
  {
    id: 'task-6-4-4',
    title: 'Data Cleanup & Optimization',
    progress: 0,
    startDate: '2026-12-29T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['task-6-4-3'],
    parentId: 'task-6-4'
  },
  {
    id: 'milestone-6-4',
    title: 'Data Migration Complete',
    progress: 0,
    startDate: '2027-01-05T17:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'milestone',
    predecessors: ['task-6-4'],
    parentId: 'proj-6'
  },
  {
    id: 'task-6-5',
    title: 'Security & Compliance',
    assignee: 'Security Team',
    progress: 0,
    startDate: '2027-01-06T09:00:00',
    endDate: '2027-01-30T17:00:00',
    type: 'task',
    predecessors: ['milestone-6-4'],
    parentId: 'proj-6'
  },
  {
    id: 'task-6-5-1',
    title: 'Security Audit',
    progress: 0,
    startDate: '2027-01-06T09:00:00',
    endDate: '2027-01-12T17:00:00',
    type: 'task',
    parentId: 'task-6-5'
  },
  {
    id: 'task-6-5-2',
    title: 'Compliance Documentation',
    progress: 0,
    startDate: '2027-01-13T09:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'task',
    predecessors: ['task-6-5-1'],
    parentId: 'task-6-5'
  },
  {
    id: 'task-6-5-3',
    title: 'Security Hardening',
    progress: 0,
    startDate: '2027-01-21T09:00:00',
    endDate: '2027-01-27T17:00:00',
    type: 'task',
    predecessors: ['task-6-5-2'],
    parentId: 'task-6-5'
  },
  {
    id: 'task-6-5-4',
    title: 'Final Security Signoff',
    progress: 0,
    startDate: '2027-01-28T09:00:00',
    endDate: '2027-01-30T17:00:00',
    type: 'task',
    predecessors: ['task-6-5-3'],
    parentId: 'task-6-5'
  },
  {
    id: 'milestone-6-final',
    title: 'Cloud Migration Complete',
    progress: 0,
    startDate: '2027-01-30T17:00:00',
    endDate: '2027-01-30T17:00:00',
    type: 'milestone',
    predecessors: ['task-6-5'],
    parentId: 'proj-6'
  },

  // Project 7: Customer Support Platform
  {
    id: 'proj-7',
    title: 'Customer Support Platform',
    progress: 0,
    startDate: '2026-09-20T09:00:00',
    endDate: '2027-02-28T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-7-1',
    title: 'Support Platform Planning',
    assignee: 'Product Team',
    progress: 0,
    startDate: '2026-09-20T09:00:00',
    endDate: '2026-10-10T17:00:00',
    type: 'task',
    parentId: 'proj-7'
  },
  {
    id: 'task-7-1-1',
    title: 'Support Process Mapping',
    progress: 0,
    startDate: '2026-09-20T09:00:00',
    endDate: '2026-09-27T17:00:00',
    type: 'task',
    parentId: 'task-7-1'
  },
  {
    id: 'task-7-1-2',
    title: 'Feature Requirements',
    progress: 0,
    startDate: '2026-09-28T09:00:00',
    endDate: '2026-10-05T17:00:00',
    type: 'task',
    predecessors: ['task-7-1-1'],
    parentId: 'task-7-1'
  },
  {
    id: 'task-7-1-3',
    title: 'Platform Architecture Design',
    progress: 0,
    startDate: '2026-10-06T09:00:00',
    endDate: '2026-10-10T17:00:00',
    type: 'task',
    predecessors: ['task-7-1-2'],
    parentId: 'task-7-1'
  },
  {
    id: 'milestone-7-1',
    title: 'Platform Design Approved',
    progress: 0,
    startDate: '2026-10-10T17:00:00',
    endDate: '2026-10-10T17:00:00',
    type: 'milestone',
    predecessors: ['task-7-1'],
    parentId: 'proj-7'
  },
  {
    id: 'task-7-2',
    title: 'Ticket Management System',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2026-10-11T09:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'task',
    predecessors: ['milestone-7-1'],
    parentId: 'proj-7'
  },
  {
    id: 'task-7-2-1',
    title: 'Ticket Creation & Tracking',
    progress: 0,
    startDate: '2026-10-11T09:00:00',
    endDate: '2026-10-22T17:00:00',
    type: 'task',
    parentId: 'task-7-2'
  },
  {
    id: 'task-7-2-2',
    title: 'Ticket Assignment & Routing',
    progress: 0,
    startDate: '2026-10-23T09:00:00',
    endDate: '2026-11-02T17:00:00',
    type: 'task',
    predecessors: ['task-7-2-1'],
    parentId: 'task-7-2'
  },
  {
    id: 'task-7-2-3',
    title: 'Ticket Status & Priority Management',
    progress: 0,
    startDate: '2026-11-03T09:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'task',
    predecessors: ['task-7-2-2'],
    parentId: 'task-7-2'
  },
  {
    id: 'task-7-2-4',
    title: 'Ticket History & Audit Log',
    progress: 0,
    startDate: '2026-11-11T09:00:00',
    endDate: '2026-11-18T17:00:00',
    type: 'task',
    predecessors: ['task-7-2-3'],
    parentId: 'task-7-2'
  },
  {
    id: 'task-7-2-5',
    title: 'Ticket Analytics Dashboard',
    progress: 0,
    startDate: '2026-11-19T09:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'task',
    predecessors: ['task-7-2-4'],
    parentId: 'task-7-2'
  },
  {
    id: 'milestone-7-2',
    title: 'Ticket System Functional',
    progress: 0,
    startDate: '2026-11-20T17:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'milestone',
    predecessors: ['task-7-2'],
    parentId: 'proj-7'
  },
  {
    id: 'task-7-3',
    title: 'Knowledge Base & Self-Service',
    assignee: 'Content Team',
    progress: 0,
    startDate: '2026-11-01T09:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'task',
    predecessors: ['milestone-7-1'],
    parentId: 'proj-7'
  },
  {
    id: 'task-7-3-1',
    title: 'Knowledge Base Structure',
    progress: 0,
    startDate: '2026-11-01T09:00:00',
    endDate: '2026-11-10T17:00:00',
    type: 'task',
    parentId: 'task-7-3'
  },
  {
    id: 'task-7-3-2',
    title: 'Article Creation & Management',
    progress: 0,
    startDate: '2026-11-11T09:00:00',
    endDate: '2026-11-25T17:00:00',
    type: 'task',
    predecessors: ['task-7-3-1'],
    parentId: 'task-7-3'
  },
  {
    id: 'task-7-3-3',
    title: 'Self-Service Portal',
    progress: 0,
    startDate: '2026-11-26T09:00:00',
    endDate: '2026-12-05T17:00:00',
    type: 'task',
    predecessors: ['task-7-3-2'],
    parentId: 'task-7-3'
  },
  {
    id: 'task-7-3-4',
    title: 'AI-Powered Chatbot Integration',
    progress: 0,
    startDate: '2026-12-06T09:00:00',
    endDate: '2026-12-12T17:00:00',
    type: 'task',
    predecessors: ['task-7-3-3'],
    parentId: 'task-7-3'
  },
  {
    id: 'task-7-3-5',
    title: 'Content Migration & Testing',
    progress: 0,
    startDate: '2026-12-13T09:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'task',
    predecessors: ['task-7-3-4'],
    parentId: 'task-7-3'
  },
  {
    id: 'task-7-4',
    title: 'Live Chat & Communication',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2026-11-21T09:00:00',
    endDate: '2027-01-10T17:00:00',
    type: 'task',
    predecessors: ['milestone-7-2'],
    parentId: 'proj-7'
  },
  {
    id: 'task-7-4-1',
    title: 'Real-Time Chat System',
    progress: 0,
    startDate: '2026-11-21T09:00:00',
    endDate: '2026-12-03T17:00:00',
    type: 'task',
    parentId: 'task-7-4'
  },
  {
    id: 'task-7-4-2',
    title: 'Agent Dashboard',
    progress: 0,
    startDate: '2026-12-04T09:00:00',
    endDate: '2026-12-15T17:00:00',
    type: 'task',
    predecessors: ['task-7-4-1'],
    parentId: 'task-7-4'
  },
  {
    id: 'task-7-4-3',
    title: 'Chat History & Recording',
    progress: 0,
    startDate: '2026-12-16T09:00:00',
    endDate: '2026-12-24T17:00:00',
    type: 'task',
    predecessors: ['task-7-4-2'],
    parentId: 'task-7-4'
  },
  {
    id: 'task-7-4-4',
    title: 'Omnichannel Integration',
    progress: 0,
    startDate: '2026-12-25T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['task-7-4-3'],
    parentId: 'task-7-4'
  },
  {
    id: 'task-7-4-5',
    title: 'Chat Analytics & Reporting',
    progress: 0,
    startDate: '2027-01-06T09:00:00',
    endDate: '2027-01-10T17:00:00',
    type: 'task',
    predecessors: ['task-7-4-4'],
    parentId: 'task-7-4'
  },
  {
    id: 'milestone-7-3',
    title: 'Communication Module Complete',
    progress: 0,
    startDate: '2027-01-10T17:00:00',
    endDate: '2027-01-10T17:00:00',
    type: 'milestone',
    predecessors: ['task-7-4'],
    parentId: 'proj-7'
  },
  {
    id: 'task-7-5',
    title: 'Reporting & Analytics',
    assignee: 'Data Science',
    progress: 0,
    startDate: '2027-01-11T09:00:00',
    endDate: '2027-02-05T17:00:00',
    type: 'task',
    predecessors: ['milestone-7-3'],
    parentId: 'proj-7'
  },
  {
    id: 'task-7-5-1',
    title: 'Support Metrics Dashboard',
    progress: 0,
    startDate: '2027-01-11T09:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'task',
    parentId: 'task-7-5'
  },
  {
    id: 'task-7-5-2',
    title: 'Customer Satisfaction Tracking',
    progress: 0,
    startDate: '2027-01-21T09:00:00',
    endDate: '2027-01-28T17:00:00',
    type: 'task',
    predecessors: ['task-7-5-1'],
    parentId: 'task-7-5'
  },
  {
    id: 'task-7-5-3',
    title: 'Agent Performance Analytics',
    progress: 0,
    startDate: '2027-01-29T09:00:00',
    endDate: '2027-02-02T17:00:00',
    type: 'task',
    predecessors: ['task-7-5-2'],
    parentId: 'task-7-5'
  },
  {
    id: 'task-7-5-4',
    title: 'Report Generation & Export',
    progress: 0,
    startDate: '2027-02-03T09:00:00',
    endDate: '2027-02-05T17:00:00',
    type: 'task',
    predecessors: ['task-7-5-3'],
    parentId: 'task-7-5'
  },
  {
    id: 'task-7-6',
    title: 'Integration & Deployment',
    assignee: 'DevOps Team',
    progress: 0,
    startDate: '2027-02-06T09:00:00',
    endDate: '2027-02-28T17:00:00',
    type: 'task',
    predecessors: ['task-7-5'],
    parentId: 'proj-7'
  },
  {
    id: 'task-7-6-1',
    title: 'Integration Testing',
    progress: 0,
    startDate: '2027-02-06T09:00:00',
    endDate: '2027-02-13T17:00:00',
    type: 'task',
    parentId: 'task-7-6'
  },
  {
    id: 'task-7-6-2',
    title: 'Production Deployment',
    progress: 0,
    startDate: '2027-02-14T09:00:00',
    endDate: '2027-02-20T17:00:00',
    type: 'task',
    predecessors: ['task-7-6-1'],
    parentId: 'task-7-6'
  },
  {
    id: 'task-7-6-3',
    title: 'Support Team Training',
    progress: 0,
    startDate: '2027-02-21T09:00:00',
    endDate: '2027-02-25T17:00:00',
    type: 'task',
    predecessors: ['task-7-6-2'],
    parentId: 'task-7-6'
  },
  {
    id: 'task-7-6-4',
    title: 'Post-Launch Support',
    progress: 0,
    startDate: '2027-02-26T09:00:00',
    endDate: '2027-02-28T17:00:00',
    type: 'task',
    predecessors: ['task-7-6-3'],
    parentId: 'task-7-6'
  },
  {
    id: 'milestone-7-final',
    title: 'Support Platform Live',
    progress: 0,
    startDate: '2027-02-28T17:00:00',
    endDate: '2027-02-28T17:00:00',
    type: 'milestone',
    predecessors: ['task-7-6'],
    parentId: 'proj-7'
  },

  // Project 8: Digital Transformation Initiative
  {
    id: 'proj-8',
    title: 'Digital Transformation Initiative',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2027-03-15T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-8-1',
    title: 'Digital Strategy Development',
    assignee: 'Strategy Team',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'task',
    parentId: 'proj-8'
  },
  {
    id: 'task-8-1-1',
    title: 'Current State Assessment',
    progress: 0,
    startDate: '2026-10-01T09:00:00',
    endDate: '2026-10-09T17:00:00',
    type: 'task',
    parentId: 'task-8-1'
  },
  {
    id: 'task-8-1-2',
    title: 'Digital Maturity Assessment',
    progress: 0,
    startDate: '2026-10-10T09:00:00',
    endDate: '2026-10-16T17:00:00',
    type: 'task',
    predecessors: ['task-8-1-1'],
    parentId: 'task-8-1'
  },
  {
    id: 'task-8-1-3',
    title: 'Digital Roadmap Creation',
    progress: 0,
    startDate: '2026-10-17T09:00:00',
    endDate: '2026-10-22T17:00:00',
    type: 'task',
    predecessors: ['task-8-1-2'],
    parentId: 'task-8-1'
  },
  {
    id: 'task-8-1-4',
    title: 'Executive Presentation & Approval',
    progress: 0,
    startDate: '2026-10-23T09:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'task',
    predecessors: ['task-8-1-3'],
    parentId: 'task-8-1'
  },
  {
    id: 'milestone-8-1',
    title: 'Strategy Approved',
    progress: 0,
    startDate: '2026-10-25T17:00:00',
    endDate: '2026-10-25T17:00:00',
    type: 'milestone',
    predecessors: ['task-8-1'],
    parentId: 'proj-8'
  },
  {
    id: 'task-8-2',
    title: 'Process Automation',
    assignee: 'Operations Team',
    progress: 0,
    startDate: '2026-10-26T09:00:00',
    endDate: '2026-12-20T17:00:00',
    type: 'task',
    predecessors: ['milestone-8-1'],
    parentId: 'proj-8'
  },
  {
    id: 'task-8-2-1',
    title: 'Process Mapping & Analysis',
    progress: 0,
    startDate: '2026-10-26T09:00:00',
    endDate: '2026-11-04T17:00:00',
    type: 'task',
    parentId: 'task-8-2'
  },
  {
    id: 'task-8-2-2',
    title: 'Automation Identification',
    progress: 0,
    startDate: '2026-11-05T09:00:00',
    endDate: '2026-11-13T17:00:00',
    type: 'task',
    predecessors: ['task-8-2-1'],
    parentId: 'task-8-2'
  },
  {
    id: 'task-8-2-3',
    title: 'RPA Implementation',
    progress: 0,
    startDate: '2026-11-14T09:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'task',
    predecessors: ['task-8-2-2'],
    parentId: 'task-8-2'
  },
  {
    id: 'task-8-2-4',
    title: 'Testing & Optimization',
    progress: 0,
    startDate: '2026-12-02T09:00:00',
    endDate: '2026-12-12T17:00:00',
    type: 'task',
    predecessors: ['task-8-2-3'],
    parentId: 'task-8-2'
  },
  {
    id: 'task-8-2-5',
    title: 'Change Management',
    progress: 0,
    startDate: '2026-12-13T09:00:00',
    endDate: '2026-12-20T17:00:00',
    type: 'task',
    predecessors: ['task-8-2-4'],
    parentId: 'task-8-2'
  },
  {
    id: 'milestone-8-2',
    title: 'Process Automation Complete',
    progress: 0,
    startDate: '2026-12-20T17:00:00',
    endDate: '2026-12-20T17:00:00',
    type: 'milestone',
    predecessors: ['task-8-2'],
    parentId: 'proj-8'
  },
  {
    id: 'task-8-3',
    title: 'Legacy System Modernization',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2026-11-01T09:00:00',
    endDate: '2027-01-25T17:00:00',
    type: 'task',
    predecessors: ['milestone-8-1'],
    parentId: 'proj-8'
  },
  {
    id: 'task-8-3-1',
    title: 'Legacy System Audit',
    progress: 0,
    startDate: '2026-11-01T09:00:00',
    endDate: '2026-11-12T17:00:00',
    type: 'task',
    parentId: 'task-8-3'
  },
  {
    id: 'task-8-3-2',
    title: 'Modern Architecture Design',
    progress: 0,
    startDate: '2026-11-13T09:00:00',
    endDate: '2026-11-25T17:00:00',
    type: 'task',
    predecessors: ['task-8-3-1'],
    parentId: 'task-8-3'
  },
  {
    id: 'task-8-3-3',
    title: 'Data Migration & Integration',
    progress: 0,
    startDate: '2026-11-26T09:00:00',
    endDate: '2026-12-18T17:00:00',
    type: 'task',
    predecessors: ['task-8-3-2'],
    parentId: 'task-8-3'
  },
  {
    id: 'task-8-3-4',
    title: 'New System Development',
    progress: 0,
    startDate: '2026-12-19T09:00:00',
    endDate: '2027-01-15T17:00:00',
    type: 'task',
    predecessors: ['task-8-3-3'],
    parentId: 'task-8-3'
  },
  {
    id: 'task-8-3-5',
    title: 'Testing & Cutover',
    progress: 0,
    startDate: '2027-01-16T09:00:00',
    endDate: '2027-01-25T17:00:00',
    type: 'task',
    predecessors: ['task-8-3-4'],
    parentId: 'task-8-3'
  },
  {
    id: 'milestone-8-3',
    title: 'Modernization Complete',
    progress: 0,
    startDate: '2027-01-25T17:00:00',
    endDate: '2027-01-25T17:00:00',
    type: 'milestone',
    predecessors: ['task-8-3'],
    parentId: 'proj-8'
  },
  {
    id: 'task-8-4',
    title: 'Digital Skills Training',
    assignee: 'HR Team',
    progress: 0,
    startDate: '2027-01-01T09:00:00',
    endDate: '2027-02-15T17:00:00',
    type: 'task',
    predecessors: ['milestone-8-2', 'milestone-8-3'],
    parentId: 'proj-8'
  },
  {
    id: 'task-8-4-1',
    title: 'Training Needs Assessment',
    progress: 0,
    startDate: '2027-01-01T09:00:00',
    endDate: '2027-01-08T17:00:00',
    type: 'task',
    parentId: 'task-8-4'
  },
  {
    id: 'task-8-4-2',
    title: 'Training Program Development',
    progress: 0,
    startDate: '2027-01-09T09:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'task',
    predecessors: ['task-8-4-1'],
    parentId: 'task-8-4'
  },
  {
    id: 'task-8-4-3',
    title: 'Employee Training Sessions',
    progress: 0,
    startDate: '2027-01-21T09:00:00',
    endDate: '2027-02-05T17:00:00',
    type: 'task',
    predecessors: ['task-8-4-2'],
    parentId: 'task-8-4'
  },
  {
    id: 'task-8-4-4',
    title: 'Training Evaluation & Feedback',
    progress: 0,
    startDate: '2027-02-06T09:00:00',
    endDate: '2027-02-12T17:00:00',
    type: 'task',
    predecessors: ['task-8-4-3'],
    parentId: 'task-8-4'
  },
  {
    id: 'task-8-4-5',
    title: 'Continuous Learning Program',
    progress: 0,
    startDate: '2027-02-13T09:00:00',
    endDate: '2027-02-15T17:00:00',
    type: 'task',
    predecessors: ['task-8-4-4'],
    parentId: 'task-8-4'
  },
  {
    id: 'task-8-5',
    title: 'Adoption & Change Management',
    assignee: 'Change Management Team',
    progress: 0,
    startDate: '2027-02-16T09:00:00',
    endDate: '2027-03-15T17:00:00',
    type: 'task',
    predecessors: ['task-8-4'],
    parentId: 'proj-8'
  },
  {
    id: 'task-8-5-1',
    title: 'Communications Strategy',
    progress: 0,
    startDate: '2027-02-16T09:00:00',
    endDate: '2027-02-22T17:00:00',
    type: 'task',
    parentId: 'task-8-5'
  },
  {
    id: 'task-8-5-2',
    title: 'Stakeholder Engagement',
    progress: 0,
    startDate: '2027-02-23T09:00:00',
    endDate: '2027-03-01T17:00:00',
    type: 'task',
    predecessors: ['task-8-5-1'],
    parentId: 'task-8-5'
  },
  {
    id: 'task-8-5-3',
    title: 'User Adoption Metrics',
    progress: 0,
    startDate: '2027-03-02T09:00:00',
    endDate: '2027-03-08T17:00:00',
    type: 'task',
    predecessors: ['task-8-5-2'],
    parentId: 'task-8-5'
  },
  {
    id: 'task-8-5-4',
    title: 'Feedback & Iteration',
    progress: 0,
    startDate: '2027-03-09T09:00:00',
    endDate: '2027-03-15T17:00:00',
    type: 'task',
    predecessors: ['task-8-5-3'],
    parentId: 'task-8-5'
  },
  {
    id: 'milestone-8-final',
    title: 'Digital Transformation Complete',
    progress: 0,
    startDate: '2027-03-15T17:00:00',
    endDate: '2027-03-15T17:00:00',
    type: 'milestone',
    predecessors: ['task-8-5'],
    parentId: 'proj-8'
  },

  // Project 9: Product Design System
  {
    id: 'proj-9',
    title: 'Product Design System',
    progress: 0,
    startDate: '2026-10-15T09:00:00',
    endDate: '2027-02-10T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-9-1',
    title: 'Design System Audit',
    assignee: 'Design Team',
    progress: 0,
    startDate: '2026-10-15T09:00:00',
    endDate: '2026-11-05T17:00:00',
    type: 'task',
    parentId: 'proj-9'
  },
  {
    id: 'task-9-1-1',
    title: 'Current UI Inventory',
    progress: 0,
    startDate: '2026-10-15T09:00:00',
    endDate: '2026-10-22T17:00:00',
    type: 'task',
    parentId: 'task-9-1'
  },
  {
    id: 'task-9-1-2',
    title: 'Pattern Library Analysis',
    progress: 0,
    startDate: '2026-10-23T09:00:00',
    endDate: '2026-10-30T17:00:00',
    type: 'task',
    predecessors: ['task-9-1-1'],
    parentId: 'task-9-1'
  },
  {
    id: 'task-9-1-3',
    title: 'Gap Analysis & Recommendations',
    progress: 0,
    startDate: '2026-10-31T09:00:00',
    endDate: '2026-11-05T17:00:00',
    type: 'task',
    predecessors: ['task-9-1-2'],
    parentId: 'task-9-1'
  },
  {
    id: 'milestone-9-1',
    title: 'Design Audit Complete',
    progress: 0,
    startDate: '2026-11-05T17:00:00',
    endDate: '2026-11-05T17:00:00',
    type: 'milestone',
    predecessors: ['task-9-1'],
    parentId: 'proj-9'
  },
  {
    id: 'task-9-2',
    title: 'Design Tokens & Guidelines',
    assignee: 'Design Team',
    progress: 0,
    startDate: '2026-11-06T09:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'task',
    predecessors: ['milestone-9-1'],
    parentId: 'proj-9'
  },
  {
    id: 'task-9-2-1',
    title: 'Color System Definition',
    progress: 0,
    startDate: '2026-11-06T09:00:00',
    endDate: '2026-11-13T17:00:00',
    type: 'task',
    parentId: 'task-9-2'
  },
  {
    id: 'task-9-2-2',
    title: 'Typography System',
    progress: 0,
    startDate: '2026-11-14T09:00:00',
    endDate: '2026-11-19T17:00:00',
    type: 'task',
    predecessors: ['task-9-2-1'],
    parentId: 'task-9-2'
  },
  {
    id: 'task-9-2-3',
    title: 'Spacing & Layout Rules',
    progress: 0,
    startDate: '2026-11-20T09:00:00',
    endDate: '2026-11-25T17:00:00',
    type: 'task',
    predecessors: ['task-9-2-2'],
    parentId: 'task-9-2'
  },
  {
    id: 'task-9-2-4',
    title: 'Component Documentation',
    progress: 0,
    startDate: '2026-11-26T09:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'task',
    predecessors: ['task-9-2-3'],
    parentId: 'task-9-2'
  },
  {
    id: 'milestone-9-2',
    title: 'Design Tokens Ready',
    progress: 0,
    startDate: '2026-12-01T17:00:00',
    endDate: '2026-12-01T17:00:00',
    type: 'milestone',
    predecessors: ['task-9-2'],
    parentId: 'proj-9'
  },
  {
    id: 'task-9-3',
    title: 'Component Library Development',
    assignee: 'Frontend Engineering',
    progress: 0,
    startDate: '2026-12-02T09:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'task',
    predecessors: ['milestone-9-2'],
    parentId: 'proj-9'
  },
  {
    id: 'task-9-3-1',
    title: 'Core Components (Buttons, Inputs)',
    progress: 0,
    startDate: '2026-12-02T09:00:00',
    endDate: '2026-12-12T17:00:00',
    type: 'task',
    parentId: 'task-9-3'
  },
  {
    id: 'task-9-3-2',
    title: 'Navigation Components',
    progress: 0,
    startDate: '2026-12-13T09:00:00',
    endDate: '2026-12-22T17:00:00',
    type: 'task',
    predecessors: ['task-9-3-1'],
    parentId: 'task-9-3'
  },
  {
    id: 'task-9-3-3',
    title: 'Data Display Components',
    progress: 0,
    startDate: '2026-12-23T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['task-9-3-2'],
    parentId: 'task-9-3'
  },
  {
    id: 'task-9-3-4',
    title: 'Feedback & Overlay Components',
    progress: 0,
    startDate: '2027-01-06T09:00:00',
    endDate: '2027-01-13T17:00:00',
    type: 'task',
    predecessors: ['task-9-3-3'],
    parentId: 'task-9-3'
  },
  {
    id: 'task-9-3-5',
    title: 'Component Testing & Documentation',
    progress: 0,
    startDate: '2027-01-14T09:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'task',
    predecessors: ['task-9-3-4'],
    parentId: 'task-9-3'
  },
  {
    id: 'milestone-9-3',
    title: 'Component Library Complete',
    progress: 0,
    startDate: '2027-01-20T17:00:00',
    endDate: '2027-01-20T17:00:00',
    type: 'milestone',
    predecessors: ['task-9-3'],
    parentId: 'proj-9'
  },
  {
    id: 'task-9-4',
    title: 'Design System Adoption',
    assignee: 'Engineering & Design',
    progress: 0,
    startDate: '2027-01-21T09:00:00',
    endDate: '2027-02-10T17:00:00',
    type: 'task',
    predecessors: ['milestone-9-3'],
    parentId: 'proj-9'
  },
  {
    id: 'task-9-4-1',
    title: 'Migration Strategy',
    progress: 0,
    startDate: '2027-01-21T09:00:00',
    endDate: '2027-01-26T17:00:00',
    type: 'task',
    parentId: 'task-9-4'
  },
  {
    id: 'task-9-4-2',
    title: 'Team Training & Workshops',
    progress: 0,
    startDate: '2027-01-27T09:00:00',
    endDate: '2027-02-02T17:00:00',
    type: 'task',
    predecessors: ['task-9-4-1'],
    parentId: 'task-9-4'
  },
  {
    id: 'task-9-4-3',
    title: 'Design System Migration',
    progress: 0,
    startDate: '2027-02-03T09:00:00',
    endDate: '2027-02-08T17:00:00',
    type: 'task',
    predecessors: ['task-9-4-2'],
    parentId: 'task-9-4'
  },
  {
    id: 'task-9-4-4',
    title: 'Post-Migration Validation',
    progress: 0,
    startDate: '2027-02-09T09:00:00',
    endDate: '2027-02-10T17:00:00',
    type: 'task',
    predecessors: ['task-9-4-3'],
    parentId: 'task-9-4'
  },
  {
    id: 'milestone-9-final',
    title: 'Design System Live',
    progress: 0,
    startDate: '2027-02-10T17:00:00',
    endDate: '2027-02-10T17:00:00',
    type: 'milestone',
    predecessors: ['task-9-4'],
    parentId: 'proj-9'
  },

  // Project 10: API Gateway & Microservices
  {
    id: 'proj-10',
    title: 'API Gateway & Microservices Architecture',
    progress: 0,
    startDate: '2026-11-01T09:00:00',
    endDate: '2027-03-30T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 'task-10-1',
    title: 'Architecture Planning',
    assignee: 'Architecture Team',
    progress: 0,
    startDate: '2026-11-01T09:00:00',
    endDate: '2026-11-25T17:00:00',
    type: 'task',
    parentId: 'proj-10'
  },
  {
    id: 'task-10-1-1',
    title: 'Microservices Assessment',
    progress: 0,
    startDate: '2026-11-01T09:00:00',
    endDate: '2026-11-08T17:00:00',
    type: 'task',
    parentId: 'task-10-1'
  },
  {
    id: 'task-10-1-2',
    title: 'API Gateway Selection',
    progress: 0,
    startDate: '2026-11-09T09:00:00',
    endDate: '2026-11-15T17:00:00',
    type: 'task',
    predecessors: ['task-10-1-1'],
    parentId: 'task-10-1'
  },
  {
    id: 'task-10-1-3',
    title: 'Service Decomposition Strategy',
    progress: 0,
    startDate: '2026-11-16T09:00:00',
    endDate: '2026-11-20T17:00:00',
    type: 'task',
    predecessors: ['task-10-1-2'],
    parentId: 'task-10-1'
  },
  {
    id: 'task-10-1-4',
    title: 'Architecture Review & Approval',
    progress: 0,
    startDate: '2026-11-21T09:00:00',
    endDate: '2026-11-25T17:00:00',
    type: 'task',
    predecessors: ['task-10-1-3'],
    parentId: 'task-10-1'
  },
  {
    id: 'milestone-10-1',
    title: 'Architecture Approved',
    progress: 0,
    startDate: '2026-11-25T17:00:00',
    endDate: '2026-11-25T17:00:00',
    type: 'milestone',
    predecessors: ['task-10-1'],
    parentId: 'proj-10'
  },
  {
    id: 'task-10-2',
    title: 'API Gateway Implementation',
    assignee: 'Backend Engineering',
    progress: 0,
    startDate: '2026-11-26T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['milestone-10-1'],
    parentId: 'proj-10'
  },
  {
    id: 'task-10-2-1',
    title: 'Gateway Setup & Configuration',
    progress: 0,
    startDate: '2026-11-26T09:00:00',
    endDate: '2026-12-04T17:00:00',
    type: 'task',
    parentId: 'task-10-2'
  },
  {
    id: 'task-10-2-2',
    title: 'Routing & Load Balancing',
    progress: 0,
    startDate: '2026-12-05T09:00:00',
    endDate: '2026-12-14T17:00:00',
    type: 'task',
    predecessors: ['task-10-2-1'],
    parentId: 'task-10-2'
  },
  {
    id: 'task-10-2-3',
    title: 'Authentication & Authorization',
    progress: 0,
    startDate: '2026-12-15T09:00:00',
    endDate: '2026-12-22T17:00:00',
    type: 'task',
    predecessors: ['task-10-2-2'],
    parentId: 'task-10-2'
  },
  {
    id: 'task-10-2-4',
    title: 'Rate Limiting & Caching',
    progress: 0,
    startDate: '2026-12-23T09:00:00',
    endDate: '2026-12-30T17:00:00',
    type: 'task',
    predecessors: ['task-10-2-3'],
    parentId: 'task-10-2'
  },
  {
    id: 'task-10-2-5',
    title: 'Gateway Testing & Optimization',
    progress: 0,
    startDate: '2026-12-31T09:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'task',
    predecessors: ['task-10-2-4'],
    parentId: 'task-10-2'
  },
  {
    id: 'milestone-10-2',
    title: 'API Gateway Ready',
    progress: 0,
    startDate: '2027-01-05T17:00:00',
    endDate: '2027-01-05T17:00:00',
    type: 'milestone',
    predecessors: ['task-10-2'],
    parentId: 'proj-10'
  },
  {
    id: 'task-10-3',
    title: 'Microservices Development',
    assignee: 'Engineering Team',
    progress: 0,
    startDate: '2027-01-06T09:00:00',
    endDate: '2027-02-25T17:00:00',
    type: 'task',
    predecessors: ['milestone-10-2'],
    parentId: 'proj-10'
  },
  {
    id: 'task-10-3-1',
    title: 'User Service',
    progress: 0,
    startDate: '2027-01-06T09:00:00',
    endDate: '2027-01-18T17:00:00',
    type: 'task',
    parentId: 'task-10-3'
  },
  {
    id: 'task-10-3-2',
    title: 'Product Service',
    progress: 0,
    startDate: '2027-01-19T09:00:00',
    endDate: '2027-01-28T17:00:00',
    type: 'task',
    predecessors: ['task-10-3-1'],
    parentId: 'task-10-3'
  },
  {
    id: 'task-10-3-3',
    title: 'Order Service',
    progress: 0,
    startDate: '2027-01-29T09:00:00',
    endDate: '2027-02-08T17:00:00',
    type: 'task',
    predecessors: ['task-10-3-2'],
    parentId: 'task-10-3'
  },
  {
    id: 'task-10-3-4',
    title: 'Payment Service',
    progress: 0,
    startDate: '2027-02-09T09:00:00',
    endDate: '2027-02-18T17:00:00',
    type: 'task',
    predecessors: ['task-10-3-3'],
    parentId: 'task-10-3'
  },
  {
    id: 'task-10-3-5',
    title: 'Notification Service',
    progress: 0,
    startDate: '2027-02-19T09:00:00',
    endDate: '2027-02-25T17:00:00',
    type: 'task',
    predecessors: ['task-10-3-4'],
    parentId: 'task-10-3'
  },
  {
    id: 'task-10-4',
    title: 'Service Discovery & Orchestration',
    assignee: 'DevOps Team',
    progress: 0,
    startDate: '2027-02-01T09:00:00',
    endDate: '2027-03-05T17:00:00',
    type: 'task',
    predecessors: ['milestone-10-2'],
    parentId: 'proj-10'
  },
  {
    id: 'task-10-4-1',
    title: 'Service Registry Setup',
    progress: 0,
    startDate: '2027-02-01T09:00:00',
    endDate: '2027-02-08T17:00:00',
    type: 'task',
    parentId: 'task-10-4'
  },
  {
    id: 'task-10-4-2',
    title: 'Container Orchestration',
    progress: 0,
    startDate: '2027-02-09T09:00:00',
    endDate: '2027-02-18T17:00:00',
    type: 'task',
    predecessors: ['task-10-4-1'],
    parentId: 'task-10-4'
  },
  {
    id: 'task-10-4-3',
    title: 'Service Mesh Implementation',
    progress: 0,
    startDate: '2027-02-19T09:00:00',
    endDate: '2027-02-28T17:00:00',
    type: 'task',
    predecessors: ['task-10-4-2'],
    parentId: 'task-10-4'
  },
  {
    id: 'task-10-4-4',
    title: 'End-to-End Testing',
    progress: 0,
    startDate: '2027-03-01T09:00:00',
    endDate: '2027-03-05T17:00:00',
    type: 'task',
    predecessors: ['task-10-4-3'],
    parentId: 'task-10-4'
  },
  {
    id: 'milestone-10-3',
    title: 'Microservices Live',
    progress: 0,
    startDate: '2027-03-05T17:00:00',
    endDate: '2027-03-05T17:00:00',
    type: 'milestone',
    predecessors: ['task-10-4'],
    parentId: 'proj-10'
  },
  {
    id: 'task-10-5',
    title: 'Monitoring & Observability',
    assignee: 'DevOps Team',
    progress: 0,
    startDate: '2027-03-06T09:00:00',
    endDate: '2027-03-30T17:00:00',
    type: 'task',
    predecessors: ['milestone-10-3'],
    parentId: 'proj-10'
  },
  {
    id: 'task-10-5-1',
    title: 'Metrics & Alerting Setup',
    progress: 0,
    startDate: '2027-03-06T09:00:00',
    endDate: '2027-03-13T17:00:00',
    type: 'task',
    parentId: 'task-10-5'
  },
  {
    id: 'task-10-5-2',
    title: 'Distributed Tracing',
    progress: 0,
    startDate: '2027-03-14T09:00:00',
    endDate: '2027-03-20T17:00:00',
    type: 'task',
    predecessors: ['task-10-5-1'],
    parentId: 'task-10-5'
  },
  {
    id: 'task-10-5-3',
    title: 'Log Aggregation & Analysis',
    progress: 0,
    startDate: '2027-03-21T09:00:00',
    endDate: '2027-03-27T17:00:00',
    type: 'task',
    predecessors: ['task-10-5-2'],
    parentId: 'task-10-5'
  },
  {
    id: 'task-10-5-4',
    title: 'Dashboard & Reporting',
    progress: 0,
    startDate: '2027-03-28T09:00:00',
    endDate: '2027-03-30T17:00:00',
    type: 'task',
    predecessors: ['task-10-5-3'],
    parentId: 'task-10-5'
  },
  {
    id: 'milestone-10-final',
    title: 'API Gateway & Microservices Complete',
    progress: 0,
    startDate: '2027-03-30T17:00:00',
    endDate: '2027-03-30T17:00:00',
    type: 'milestone',
    predecessors: ['task-10-5'],
    parentId: 'proj-10'
  },
  // First 500 rows
{
  id: 'proj-11',
  title: 'Blockchain Supply Chain Platform',
  progress: 0,
  startDate: '2026-08-18T09:00:00',
  endDate: '2026-12-20T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-11-1',
  title: 'Blockchain Architecture Design',
  assignee: 'Blockchain Team',
  progress: 0,
  startDate: '2026-08-18T09:00:00',
  endDate: '2026-09-10T17:00:00',
  type: 'task',
  parentId: 'proj-11'
},
{
  id: 'task-11-1-1',
  title: 'Consensus Mechanism Selection',
  progress: 0,
  startDate: '2026-08-18T09:00:00',
  endDate: '2026-08-25T17:00:00',
  type: 'task',
  parentId: 'task-11-1'
},
{
  id: 'task-11-1-2',
  title: 'Smart Contract Design',
  progress: 0,
  startDate: '2026-08-26T09:00:00',
  endDate: '2026-09-02T17:00:00',
  type: 'task',
  predecessors: ['task-11-1-1'],
  parentId: 'task-11-1'
},
{
  id: 'task-11-1-3',
  title: 'Network Architecture Planning',
  progress: 0,
  startDate: '2026-09-03T09:00:00',
  endDate: '2026-09-10T17:00:00',
  type: 'task',
  predecessors: ['task-11-1-2'],
  parentId: 'task-11-1'
},
{
  id: 'milestone-11-1',
  title: 'Architecture Finalized',
  progress: 0,
  startDate: '2026-09-10T17:00:00',
  endDate: '2026-09-10T17:00:00',
  type: 'milestone',
  predecessors: ['task-11-1'],
  parentId: 'proj-11'
},
{
  id: 'task-11-2',
  title: 'Smart Contract Development',
  assignee: 'Blockchain Team',
  progress: 0,
  startDate: '2026-09-11T09:00:00',
  endDate: '2026-10-20T17:00:00',
  type: 'task',
  predecessors: ['milestone-11-1'],
  parentId: 'proj-11'
},
{
  id: 'task-11-2-1',
  title: 'Product Tracking Contract',
  progress: 0,
  startDate: '2026-09-11T09:00:00',
  endDate: '2026-09-22T17:00:00',
  type: 'task',
  parentId: 'task-11-2'
},
{
  id: 'task-11-2-2',
  title: 'Supplier Verification Contract',
  progress: 0,
  startDate: '2026-09-23T09:00:00',
  endDate: '2026-10-04T17:00:00',
  type: 'task',
  predecessors: ['task-11-2-1'],
  parentId: 'task-11-2'
},
{
  id: 'task-11-2-3',
  title: 'Quality Assurance Contract',
  progress: 0,
  startDate: '2026-10-05T09:00:00',
  endDate: '2026-10-13T17:00:00',
  type: 'task',
  predecessors: ['task-11-2-2'],
  parentId: 'task-11-2'
},
{
  id: 'task-11-2-4',
  title: 'Contract Testing & Audit',
  progress: 0,
  startDate: '2026-10-14T09:00:00',
  endDate: '2026-10-20T17:00:00',
  type: 'task',
  predecessors: ['task-11-2-3'],
  parentId: 'task-11-2'
},
{
  id: 'milestone-11-2',
  title: 'Smart Contracts Ready',
  progress: 0,
  startDate: '2026-10-20T17:00:00',
  endDate: '2026-10-20T17:00:00',
  type: 'milestone',
  predecessors: ['task-11-2'],
  parentId: 'proj-11'
},
{
  id: 'task-11-3',
  title: 'Supply Chain Integration',
  assignee: 'Integration Team',
  progress: 0,
  startDate: '2026-10-21T09:00:00',
  endDate: '2026-12-05T17:00:00',
  type: 'task',
  predecessors: ['milestone-11-2'],
  parentId: 'proj-11'
},
{
  id: 'task-11-3-1',
  title: 'Supplier System Integration',
  progress: 0,
  startDate: '2026-10-21T09:00:00',
  endDate: '2026-10-31T17:00:00',
  type: 'task',
  parentId: 'task-11-3'
},
{
  id: 'task-11-3-2',
  title: 'Logistics Partner Integration',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2026-11-12T17:00:00',
  type: 'task',
  predecessors: ['task-11-3-1'],
  parentId: 'task-11-3'
},
{
  id: 'task-11-3-3',
  title: 'Retailer Integration',
  progress: 0,
  startDate: '2026-11-13T09:00:00',
  endDate: '2026-11-24T17:00:00',
  type: 'task',
  predecessors: ['task-11-3-2'],
  parentId: 'task-11-3'
},
{
  id: 'task-11-3-4',
  title: 'End-to-End Testing',
  progress: 0,
  startDate: '2026-11-25T09:00:00',
  endDate: '2026-12-05T17:00:00',
  type: 'task',
  predecessors: ['task-11-3-3'],
  parentId: 'task-11-3'
},
{
  id: 'milestone-11-3',
  title: 'Integration Complete',
  progress: 0,
  startDate: '2026-12-05T17:00:00',
  endDate: '2026-12-05T17:00:00',
  type: 'milestone',
  predecessors: ['task-11-3'],
  parentId: 'proj-11'
},
{
  id: 'task-11-4',
  title: 'Platform UI & Dashboard',
  assignee: 'Frontend Team',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-11-2'],
  parentId: 'proj-11'
},
{
  id: 'task-11-4-1',
  title: 'Dashboard Design',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2026-11-09T17:00:00',
  type: 'task',
  parentId: 'task-11-4'
},
{
  id: 'task-11-4-2',
  title: 'User Interface Development',
  progress: 0,
  startDate: '2026-11-10T09:00:00',
  endDate: '2026-11-23T17:00:00',
  type: 'task',
  predecessors: ['task-11-4-1'],
  parentId: 'task-11-4'
},
{
  id: 'task-11-4-3',
  title: 'Blockchain Data Visualization',
  progress: 0,
  startDate: '2026-11-24T09:00:00',
  endDate: '2026-12-05T17:00:00',
  type: 'task',
  predecessors: ['task-11-4-2'],
  parentId: 'task-11-4'
},
{
  id: 'task-11-4-4',
  title: 'API Integration',
  progress: 0,
  startDate: '2026-12-06T09:00:00',
  endDate: '2026-12-12T17:00:00',
  type: 'task',
  predecessors: ['task-11-4-3'],
  parentId: 'task-11-4'
},
{
  id: 'task-11-4-5',
  title: 'User Testing & Refinement',
  progress: 0,
  startDate: '2026-12-13T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'task',
  predecessors: ['task-11-4-4'],
  parentId: 'task-11-4'
},
{
  id: 'milestone-11-final',
  title: 'Blockchain Platform Live',
  progress: 0,
  startDate: '2026-12-20T17:00:00',
  endDate: '2026-12-20T17:00:00',
  type: 'milestone',
  predecessors: ['task-11-4'],
  parentId: 'proj-11'
},

// Project 12: AI-Powered Recruitment System
{
  id: 'proj-12',
  title: 'AI-Powered Recruitment System',
  progress: 0,
  startDate: '2026-08-19T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-12-1',
  title: 'Recruitment Process Analysis',
  assignee: 'HR Team',
  progress: 0,
  startDate: '2026-08-19T09:00:00',
  endDate: '2026-09-05T17:00:00',
  type: 'task',
  parentId: 'proj-12'
},
{
  id: 'task-12-1-1',
  title: 'Current Process Mapping',
  progress: 0,
  startDate: '2026-08-19T09:00:00',
  endDate: '2026-08-25T17:00:00',
  type: 'task',
  parentId: 'task-12-1'
},
{
  id: 'task-12-1-2',
  title: 'Pain Point Identification',
  progress: 0,
  startDate: '2026-08-26T09:00:00',
  endDate: '2026-09-01T17:00:00',
  type: 'task',
  predecessors: ['task-12-1-1'],
  parentId: 'task-12-1'
},
{
  id: 'task-12-1-3',
  title: 'AI Application Areas',
  progress: 0,
  startDate: '2026-09-02T09:00:00',
  endDate: '2026-09-05T17:00:00',
  type: 'task',
  predecessors: ['task-12-1-2'],
  parentId: 'task-12-1'
},
{
  id: 'milestone-12-1',
  title: 'Requirements Finalized',
  progress: 0,
  startDate: '2026-09-05T17:00:00',
  endDate: '2026-09-05T17:00:00',
  type: 'milestone',
  predecessors: ['task-12-1'],
  parentId: 'proj-12'
},
{
  id: 'task-12-2',
  title: 'AI Model Development',
  assignee: 'AI/ML Team',
  progress: 0,
  startDate: '2026-09-06T09:00:00',
  endDate: '2026-10-25T17:00:00',
  type: 'task',
  predecessors: ['milestone-12-1'],
  parentId: 'proj-12'
},
{
  id: 'task-12-2-1',
  title: 'Resume Parsing Model',
  progress: 0,
  startDate: '2026-09-06T09:00:00',
  endDate: '2026-09-18T17:00:00',
  type: 'task',
  parentId: 'task-12-2'
},
{
  id: 'task-12-2-2',
  title: 'Candidate Matching Algorithm',
  progress: 0,
  startDate: '2026-09-19T09:00:00',
  endDate: '2026-10-02T17:00:00',
  type: 'task',
  predecessors: ['task-12-2-1'],
  parentId: 'task-12-2'
},
{
  id: 'task-12-2-3',
  title: 'Interview Scheduling AI',
  progress: 0,
  startDate: '2026-10-03T09:00:00',
  endDate: '2026-10-14T17:00:00',
  type: 'task',
  predecessors: ['task-12-2-2'],
  parentId: 'task-12-2'
},
{
  id: 'task-12-2-4',
  title: 'Model Training & Validation',
  progress: 0,
  startDate: '2026-10-15T09:00:00',
  endDate: '2026-10-22T17:00:00',
  type: 'task',
  predecessors: ['task-12-2-3'],
  parentId: 'task-12-2'
},
{
  id: 'task-12-2-5',
  title: 'Model Performance Testing',
  progress: 0,
  startDate: '2026-10-23T09:00:00',
  endDate: '2026-10-25T17:00:00',
  type: 'task',
  predecessors: ['task-12-2-4'],
  parentId: 'task-12-2'
},
{
  id: 'milestone-12-2',
  title: 'AI Models Ready',
  progress: 0,
  startDate: '2026-10-25T17:00:00',
  endDate: '2026-10-25T17:00:00',
  type: 'milestone',
  predecessors: ['task-12-2'],
  parentId: 'proj-12'
},
{
  id: 'task-12-3',
  title: 'Recruitment Platform Development',
  assignee: 'Engineering Team',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['milestone-12-1'],
  parentId: 'proj-12'
},
{
  id: 'task-12-3-1',
  title: 'Job Posting Module',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-12T17:00:00',
  type: 'task',
  parentId: 'task-12-3'
},
{
  id: 'task-12-3-2',
  title: 'Application Management',
  progress: 0,
  startDate: '2026-10-13T09:00:00',
  endDate: '2026-10-25T17:00:00',
  type: 'task',
  predecessors: ['task-12-3-1'],
  parentId: 'task-12-3'
},
{
  id: 'task-12-3-3',
  title: 'Candidate Portal',
  progress: 0,
  startDate: '2026-10-26T09:00:00',
  endDate: '2026-11-08T17:00:00',
  type: 'task',
  predecessors: ['task-12-3-2'],
  parentId: 'task-12-3'
},
{
  id: 'task-12-3-4',
  title: 'Recruiter Dashboard',
  progress: 0,
  startDate: '2026-11-09T09:00:00',
  endDate: '2026-11-20T17:00:00',
  type: 'task',
  predecessors: ['task-12-3-3'],
  parentId: 'task-12-3'
},
{
  id: 'task-12-3-5',
  title: 'Integration & Testing',
  progress: 0,
  startDate: '2026-11-21T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['task-12-3-4'],
  parentId: 'task-12-3'
},
{
  id: 'milestone-12-3',
  title: 'Platform Complete',
  progress: 0,
  startDate: '2026-11-30T17:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'milestone',
  predecessors: ['task-12-3'],
  parentId: 'proj-12'
},
{
  id: 'task-12-4',
  title: 'AI Integration & Testing',
  assignee: 'AI/ML Team',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['milestone-12-2', 'milestone-12-3'],
  parentId: 'proj-12'
},
{
  id: 'task-12-4-1',
  title: 'AI Integration',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2026-12-12T17:00:00',
  type: 'task',
  parentId: 'task-12-4'
},
{
  id: 'task-12-4-2',
  title: 'End-to-End Testing',
  progress: 0,
  startDate: '2026-12-13T09:00:00',
  endDate: '2026-12-22T17:00:00',
  type: 'task',
  predecessors: ['task-12-4-1'],
  parentId: 'task-12-4'
},
{
  id: 'task-12-4-3',
  title: 'Performance Optimization',
  progress: 0,
  startDate: '2026-12-23T09:00:00',
  endDate: '2026-12-30T17:00:00',
  type: 'task',
  predecessors: ['task-12-4-2'],
  parentId: 'task-12-4'
},
{
  id: 'task-12-4-4',
  title: 'User Acceptance Testing',
  progress: 0,
  startDate: '2026-12-31T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['task-12-4-3'],
  parentId: 'task-12-4'
},
{
  id: 'task-12-5',
  title: 'Deployment & Training',
  assignee: 'DevOps Team',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['task-12-4'],
  parentId: 'proj-12'
},
{
  id: 'task-12-5-1',
  title: 'Production Deployment',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-01-09T17:00:00',
  type: 'task',
  parentId: 'task-12-5'
},
{
  id: 'task-12-5-2',
  title: 'HR Team Training',
  progress: 0,
  startDate: '2027-01-10T09:00:00',
  endDate: '2027-01-13T17:00:00',
  type: 'task',
  predecessors: ['task-12-5-1'],
  parentId: 'task-12-5'
},
{
  id: 'task-12-5-3',
  title: 'Go-Live & Monitoring',
  progress: 0,
  startDate: '2027-01-14T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['task-12-5-2'],
  parentId: 'task-12-5'
},
{
  id: 'milestone-12-final',
  title: 'Recruitment System Live',
  progress: 0,
  startDate: '2027-01-15T17:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-12-5'],
  parentId: 'proj-12'
},

// Project 13: IoT Device Management Platform
{
  id: 'proj-13',
  title: 'IoT Device Management Platform',
  progress: 0,
  startDate: '2026-08-21T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-13-1',
  title: 'IoT Platform Architecture',
  assignee: 'IoT Engineering',
  progress: 0,
  startDate: '2026-08-21T09:00:00',
  endDate: '2026-09-18T17:00:00',
  type: 'task',
  parentId: 'proj-13'
},
{
  id: 'task-13-1-1',
  title: 'Device Communication Protocol',
  progress: 0,
  startDate: '2026-08-21T09:00:00',
  endDate: '2026-08-29T17:00:00',
  type: 'task',
  parentId: 'task-13-1'
},
{
  id: 'task-13-1-2',
  title: 'Data Ingestion Pipeline',
  progress: 0,
  startDate: '2026-08-30T09:00:00',
  endDate: '2026-09-07T17:00:00',
  type: 'task',
  predecessors: ['task-13-1-1'],
  parentId: 'task-13-1'
},
{
  id: 'task-13-1-3',
  title: 'Device Registry Design',
  progress: 0,
  startDate: '2026-09-08T09:00:00',
  endDate: '2026-09-14T17:00:00',
  type: 'task',
  predecessors: ['task-13-1-2'],
  parentId: 'task-13-1'
},
{
  id: 'task-13-1-4',
  title: 'Security Architecture',
  progress: 0,
  startDate: '2026-09-15T09:00:00',
  endDate: '2026-09-18T17:00:00',
  type: 'task',
  predecessors: ['task-13-1-3'],
  parentId: 'task-13-1'
},
{
  id: 'milestone-13-1',
  title: 'Architecture Approved',
  progress: 0,
  startDate: '2026-09-18T17:00:00',
  endDate: '2026-09-18T17:00:00',
  type: 'milestone',
  predecessors: ['task-13-1'],
  parentId: 'proj-13'
},
{
  id: 'task-13-2',
  title: 'Device Connectivity Layer',
  assignee: 'Backend Engineering',
  progress: 0,
  startDate: '2026-09-19T09:00:00',
  endDate: '2026-10-30T17:00:00',
  type: 'task',
  predecessors: ['milestone-13-1'],
  parentId: 'proj-13'
},
{
  id: 'task-13-2-1',
  title: 'MQTT Broker Setup',
  progress: 0,
  startDate: '2026-09-19T09:00:00',
  endDate: '2026-09-27T17:00:00',
  type: 'task',
  parentId: 'task-13-2'
},
{
  id: 'task-13-2-2',
  title: 'Device Authentication',
  progress: 0,
  startDate: '2026-09-28T09:00:00',
  endDate: '2026-10-07T17:00:00',
  type: 'task',
  predecessors: ['task-13-2-1'],
  parentId: 'task-13-2'
},
{
  id: 'task-13-2-3',
  title: 'Data Processing & Storage',
  progress: 0,
  startDate: '2026-10-08T09:00:00',
  endDate: '2026-10-18T17:00:00',
  type: 'task',
  predecessors: ['task-13-2-2'],
  parentId: 'task-13-2'
},
{
  id: 'task-13-2-4',
  title: 'Device Command & Control',
  progress: 0,
  startDate: '2026-10-19T09:00:00',
  endDate: '2026-10-28T17:00:00',
  type: 'task',
  predecessors: ['task-13-2-3'],
  parentId: 'task-13-2'
},
{
  id: 'task-13-2-5',
  title: 'Connectivity Testing',
  progress: 0,
  startDate: '2026-10-29T09:00:00',
  endDate: '2026-10-30T17:00:00',
  type: 'task',
  predecessors: ['task-13-2-4'],
  parentId: 'task-13-2'
},
{
  id: 'milestone-13-2',
  title: 'Connectivity Layer Ready',
  progress: 0,
  startDate: '2026-10-30T17:00:00',
  endDate: '2026-10-30T17:00:00',
  type: 'milestone',
  predecessors: ['task-13-2'],
  parentId: 'proj-13'
},
{
  id: 'task-13-3',
  title: 'Device Management Features',
  assignee: 'Frontend Engineering',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['milestone-13-1'],
  parentId: 'proj-13'
},
{
  id: 'task-13-3-1',
  title: 'Device Onboarding UI',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-12T17:00:00',
  type: 'task',
  parentId: 'task-13-3'
},
{
  id: 'task-13-3-2',
  title: 'Device Dashboard',
  progress: 0,
  startDate: '2026-10-13T09:00:00',
  endDate: '2026-10-25T17:00:00',
  type: 'task',
  predecessors: ['task-13-3-1'],
  parentId: 'task-13-3'
},
{
  id: 'task-13-3-3',
  title: 'Device Analytics View',
  progress: 0,
  startDate: '2026-10-26T09:00:00',
  endDate: '2026-11-08T17:00:00',
  type: 'task',
  predecessors: ['task-13-3-2'],
  parentId: 'task-13-3'
},
{
  id: 'task-13-3-4',
  title: 'Alert & Notification System',
  progress: 0,
  startDate: '2026-11-09T09:00:00',
  endDate: '2026-11-20T17:00:00',
  type: 'task',
  predecessors: ['task-13-3-3'],
  parentId: 'task-13-3'
},
{
  id: 'task-13-3-5',
  title: 'UI Testing & Refinement',
  progress: 0,
  startDate: '2026-11-21T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['task-13-3-4'],
  parentId: 'task-13-3'
},
{
  id: 'milestone-13-3',
  title: 'Management Features Complete',
  progress: 0,
  startDate: '2026-11-30T17:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'milestone',
  predecessors: ['task-13-3'],
  parentId: 'proj-13'
},
{
  id: 'task-13-4',
  title: 'Edge Computing Integration',
  assignee: 'IoT Engineering',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['milestone-13-2'],
  parentId: 'proj-13'
},
{
  id: 'task-13-4-1',
  title: 'Edge Agent Development',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2026-11-15T17:00:00',
  type: 'task',
  parentId: 'task-13-4'
},
{
  id: 'task-13-4-2',
  title: 'Edge-to-Cloud Sync',
  progress: 0,
  startDate: '2026-11-16T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['task-13-4-1'],
  parentId: 'task-13-4'
},
{
  id: 'task-13-4-3',
  title: 'Edge Analytics Engine',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2026-12-18T17:00:00',
  type: 'task',
  predecessors: ['task-13-4-2'],
  parentId: 'task-13-4'
},
{
  id: 'task-13-4-4',
  title: 'Edge Security Implementation',
  progress: 0,
  startDate: '2026-12-19T09:00:00',
  endDate: '2026-12-30T17:00:00',
  type: 'task',
  predecessors: ['task-13-4-3'],
  parentId: 'task-13-4'
},
{
  id: 'task-13-4-5',
  title: 'Edge Integration Testing',
  progress: 0,
  startDate: '2026-12-31T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['task-13-4-4'],
  parentId: 'task-13-4'
},
{
  id: 'milestone-13-4',
  title: 'Edge Integration Complete',
  progress: 0,
  startDate: '2027-01-05T17:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'milestone',
  predecessors: ['task-13-4'],
  parentId: 'proj-13'
},
{
  id: 'task-13-5',
  title: 'Data Analytics & Insights',
  assignee: 'Data Science',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-13-4'],
  parentId: 'proj-13'
},
{
  id: 'task-13-5-1',
  title: 'Data Lake Implementation',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-01-18T17:00:00',
  type: 'task',
  parentId: 'task-13-5'
},
{
  id: 'task-13-5-2',
  title: 'Analytics Pipeline',
  progress: 0,
  startDate: '2027-01-19T09:00:00',
  endDate: '2027-01-30T17:00:00',
  type: 'task',
  predecessors: ['task-13-5-1'],
  parentId: 'task-13-5'
},
{
  id: 'task-13-5-3',
  title: 'Predictive Maintenance Models',
  progress: 0,
  startDate: '2027-01-31T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['task-13-5-2'],
  parentId: 'task-13-5'
},
{
  id: 'task-13-5-4',
  title: 'Insights Dashboard',
  progress: 0,
  startDate: '2027-02-11T09:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'task',
  predecessors: ['task-13-5-3'],
  parentId: 'task-13-5'
},
{
  id: 'task-13-6',
  title: 'Security & Compliance',
  assignee: 'Security Team',
  progress: 0,
  startDate: '2027-02-16T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'task',
  predecessors: ['task-13-5'],
  parentId: 'proj-13'
},
{
  id: 'task-13-6-1',
  title: 'Security Audit',
  progress: 0,
  startDate: '2027-02-16T09:00:00',
  endDate: '2027-02-20T17:00:00',
  type: 'task',
  parentId: 'task-13-6'
},
{
  id: 'task-13-6-2',
  title: 'Compliance Documentation',
  progress: 0,
  startDate: '2027-02-21T09:00:00',
  endDate: '2027-02-24T17:00:00',
  type: 'task',
  predecessors: ['task-13-6-1'],
  parentId: 'task-13-6'
},
{
  id: 'task-13-6-3',
  title: 'Security Hardening',
  progress: 0,
  startDate: '2027-02-25T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'task',
  predecessors: ['task-13-6-2'],
  parentId: 'task-13-6'
},
{
  id: 'milestone-13-final',
  title: 'IoT Platform Complete',
  progress: 0,
  startDate: '2027-02-28T17:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'milestone',
  predecessors: ['task-13-6'],
  parentId: 'proj-13'
},

// Project 14: FinTech Payment Gateway
{
  id: 'proj-14',
  title: 'FinTech Payment Gateway',
  progress: 0,
  startDate: '2026-08-23T09:00:00',
  endDate: '2027-03-10T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-14-1',
  title: 'Payment Gateway Design',
  assignee: 'FinTech Team',
  progress: 0,
  startDate: '2026-08-23T09:00:00',
  endDate: '2026-09-20T17:00:00',
  type: 'task',
  parentId: 'proj-14'
},
{
  id: 'task-14-1-1',
  title: 'Payment Flow Design',
  progress: 0,
  startDate: '2026-08-23T09:00:00',
  endDate: '2026-08-31T17:00:00',
  type: 'task',
  parentId: 'task-14-1'
},
{
  id: 'task-14-1-2',
  title: 'Security Architecture',
  progress: 0,
  startDate: '2026-09-01T09:00:00',
  endDate: '2026-09-08T17:00:00',
  type: 'task',
  predecessors: ['task-14-1-1'],
  parentId: 'task-14-1'
},
{
  id: 'task-14-1-3',
  title: 'PCI Compliance Planning',
  progress: 0,
  startDate: '2026-09-09T09:00:00',
  endDate: '2026-09-15T17:00:00',
  type: 'task',
  predecessors: ['task-14-1-2'],
  parentId: 'task-14-1'
},
{
  id: 'task-14-1-4',
  title: 'API Design & Documentation',
  progress: 0,
  startDate: '2026-09-16T09:00:00',
  endDate: '2026-09-20T17:00:00',
  type: 'task',
  predecessors: ['task-14-1-3'],
  parentId: 'task-14-1'
},
{
  id: 'milestone-14-1',
  title: 'Gateway Design Approved',
  progress: 0,
  startDate: '2026-09-20T17:00:00',
  endDate: '2026-09-20T17:00:00',
  type: 'milestone',
  predecessors: ['task-14-1'],
  parentId: 'proj-14'
},
{
  id: 'task-14-2',
  title: 'Core Payment Processing',
  assignee: 'Backend Engineering',
  progress: 0,
  startDate: '2026-09-21T09:00:00',
  endDate: '2026-11-05T17:00:00',
  type: 'task',
  predecessors: ['milestone-14-1'],
  parentId: 'proj-14'
},
{
  id: 'task-14-2-1',
  title: 'Payment Authorization Engine',
  progress: 0,
  startDate: '2026-09-21T09:00:00',
  endDate: '2026-10-02T17:00:00',
  type: 'task',
  parentId: 'task-14-2'
},
{
  id: 'task-14-2-2',
  title: 'Settlement & Reconciliation',
  progress: 0,
  startDate: '2026-10-03T09:00:00',
  endDate: '2026-10-16T17:00:00',
  type: 'task',
  predecessors: ['task-14-2-1'],
  parentId: 'task-14-2'
},
{
  id: 'task-14-2-3',
  title: 'Payment Routing Engine',
  progress: 0,
  startDate: '2026-10-17T09:00:00',
  endDate: '2026-10-28T17:00:00',
  type: 'task',
  predecessors: ['task-14-2-2'],
  parentId: 'task-14-2'
},
{
  id: 'task-14-2-4',
  title: 'Transaction Logging & Audit',
  progress: 0,
  startDate: '2026-10-29T09:00:00',
  endDate: '2026-11-02T17:00:00',
  type: 'task',
  predecessors: ['task-14-2-3'],
  parentId: 'task-14-2'
},
{
  id: 'task-14-2-5',
  title: 'Error Handling & Retry',
  progress: 0,
  startDate: '2026-11-03T09:00:00',
  endDate: '2026-11-05T17:00:00',
  type: 'task',
  predecessors: ['task-14-2-4'],
  parentId: 'task-14-2'
},
{
  id: 'milestone-14-2',
  title: 'Core Processing Ready',
  progress: 0,
  startDate: '2026-11-05T17:00:00',
  endDate: '2026-11-05T17:00:00',
  type: 'milestone',
  predecessors: ['task-14-2'],
  parentId: 'proj-14'
},
{
  id: 'task-14-3',
  title: 'Payment Method Integration',
  assignee: 'Engineering Team',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-12-01T17:00:00',
  type: 'task',
  predecessors: ['milestone-14-1'],
  parentId: 'proj-14'
},
{
  id: 'task-14-3-1',
  title: 'Credit Card Processing',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-15T17:00:00',
  type: 'task',
  parentId: 'task-14-3'
},
{
  id: 'task-14-3-2',
  title: 'Digital Wallet Integration',
  progress: 0,
  startDate: '2026-10-16T09:00:00',
  endDate: '2026-10-30T17:00:00',
  type: 'task',
  predecessors: ['task-14-3-1'],
  parentId: 'task-14-3'
},
{
  id: 'task-14-3-3',
  title: 'Bank Transfer Integration',
  progress: 0,
  startDate: '2026-10-31T09:00:00',
  endDate: '2026-11-13T17:00:00',
  type: 'task',
  predecessors: ['task-14-3-2'],
  parentId: 'task-14-3'
},
{
  id: 'task-14-3-4',
  title: 'Cryptocurrency Integration',
  progress: 0,
  startDate: '2026-11-14T09:00:00',
  endDate: '2026-11-25T17:00:00',
  type: 'task',
  predecessors: ['task-14-3-3'],
  parentId: 'task-14-3'
},
{
  id: 'task-14-3-5',
  title: 'Method Testing & Validation',
  progress: 0,
  startDate: '2026-11-26T09:00:00',
  endDate: '2026-12-01T17:00:00',
  type: 'task',
  predecessors: ['task-14-3-4'],
  parentId: 'task-14-3'
},
{
  id: 'milestone-14-3',
  title: 'Payment Methods Ready',
  progress: 0,
  startDate: '2026-12-01T17:00:00',
  endDate: '2026-12-01T17:00:00',
  type: 'milestone',
  predecessors: ['task-14-3'],
  parentId: 'proj-14'
},
{
  id: 'task-14-4',
  title: 'Security & Compliance',
  assignee: 'Security Team',
  progress: 0,
  startDate: '2026-11-06T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-14-2'],
  parentId: 'proj-14'
},
{
  id: 'task-14-4-1',
  title: 'PCI DSS Implementation',
  progress: 0,
  startDate: '2026-11-06T09:00:00',
  endDate: '2026-11-20T17:00:00',
  type: 'task',
  parentId: 'task-14-4'
},
{
  id: 'task-14-4-2',
  title: 'Data Encryption Implementation',
  progress: 0,
  startDate: '2026-11-21T09:00:00',
  endDate: '2026-12-04T17:00:00',
  type: 'task',
  predecessors: ['task-14-4-1'],
  parentId: 'task-14-4'
},
{
  id: 'task-14-4-3',
  title: 'Fraud Detection System',
  progress: 0,
  startDate: '2026-12-05T09:00:00',
  endDate: '2026-12-20T17:00:00',
  type: 'task',
  predecessors: ['task-14-4-2'],
  parentId: 'task-14-4'
},
{
  id: 'task-14-4-4',
  title: 'Security Testing & Audit',
  progress: 0,
  startDate: '2026-12-21T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['task-14-4-3'],
  parentId: 'task-14-4'
},
{
  id: 'task-14-4-5',
  title: 'Compliance Documentation',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['task-14-4-4'],
  parentId: 'task-14-4'
},
{
  id: 'milestone-14-4',
  title: 'Security & Compliance Complete',
  progress: 0,
  startDate: '2027-01-15T17:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-14-4'],
  parentId: 'proj-14'
},
{
  id: 'task-14-5',
  title: 'Merchant Dashboard',
  assignee: 'Frontend Engineering',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['milestone-14-3'],
  parentId: 'proj-14'
},
{
  id: 'task-14-5-1',
  title: 'Dashboard UI Design',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2026-12-10T17:00:00',
  type: 'task',
  parentId: 'task-14-5'
},
{
  id: 'task-14-5-2',
  title: 'Transaction Monitoring',
  progress: 0,
  startDate: '2026-12-11T09:00:00',
  endDate: '2026-12-22T17:00:00',
  type: 'task',
  predecessors: ['task-14-5-1'],
  parentId: 'task-14-5'
},
{
  id: 'task-14-5-3',
  title: 'Reports & Analytics',
  progress: 0,
  startDate: '2026-12-23T09:00:00',
  endDate: '2027-01-08T17:00:00',
  type: 'task',
  predecessors: ['task-14-5-2'],
  parentId: 'task-14-5'
},
{
  id: 'task-14-5-4',
  title: 'Merchant Configuration',
  progress: 0,
  startDate: '2027-01-09T09:00:00',
  endDate: '2027-01-22T17:00:00',
  type: 'task',
  predecessors: ['task-14-5-3'],
  parentId: 'task-14-5'
},
{
  id: 'task-14-5-5',
  title: 'Dashboard Testing',
  progress: 0,
  startDate: '2027-01-23T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['task-14-5-4'],
  parentId: 'task-14-5'
},
{
  id: 'milestone-14-5',
  title: 'Dashboard Complete',
  progress: 0,
  startDate: '2027-02-10T17:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'milestone',
  predecessors: ['task-14-5'],
  parentId: 'proj-14'
},
{
  id: 'task-14-6',
  title: 'Go-Live & Integration',
  assignee: 'DevOps Team',
  progress: 0,
  startDate: '2027-02-11T09:00:00',
  endDate: '2027-03-10T17:00:00',
  type: 'task',
  predecessors: ['milestone-14-4', 'milestone-14-5'],
  parentId: 'proj-14'
},
{
  id: 'task-14-6-1',
  title: 'Production Deployment',
  progress: 0,
  startDate: '2027-02-11T09:00:00',
  endDate: '2027-02-20T17:00:00',
  type: 'task',
  parentId: 'task-14-6'
},
{
  id: 'task-14-6-2',
  title: 'Integration Testing',
  progress: 0,
  startDate: '2027-02-21T09:00:00',
  endDate: '2027-03-01T17:00:00',
  type: 'task',
  predecessors: ['task-14-6-1'],
  parentId: 'task-14-6'
},
{
  id: 'task-14-6-3',
  title: 'Merchant Onboarding',
  progress: 0,
  startDate: '2027-03-02T09:00:00',
  endDate: '2027-03-06T17:00:00',
  type: 'task',
  predecessors: ['task-14-6-2'],
  parentId: 'task-14-6'
},
{
  id: 'task-14-6-4',
  title: 'Go-Live & Monitoring',
  progress: 0,
  startDate: '2027-03-07T09:00:00',
  endDate: '2027-03-10T17:00:00',
  type: 'task',
  predecessors: ['task-14-6-3'],
  parentId: 'task-14-6'
},
{
  id: 'milestone-14-final',
  title: 'Payment Gateway Live',
  progress: 0,
  startDate: '2027-03-10T17:00:00',
  endDate: '2027-03-10T17:00:00',
  type: 'milestone',
  predecessors: ['task-14-6'],
  parentId: 'proj-14'
},

// Project 15: Healthcare Appointment System
{
  id: 'proj-15',
  title: 'Healthcare Appointment System',
  progress: 0,
  startDate: '2026-08-25T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-15-1',
  title: 'Healthcare Requirements',
  assignee: 'Healthcare Team',
  progress: 0,
  startDate: '2026-08-25T09:00:00',
  endDate: '2026-09-15T17:00:00',
  type: 'task',
  parentId: 'proj-15'
},
{
  id: 'task-15-1-1',
  title: 'HIPAA Compliance Review',
  progress: 0,
  startDate: '2026-08-25T09:00:00',
  endDate: '2026-09-02T17:00:00',
  type: 'task',
  parentId: 'task-15-1'
},
{
  id: 'task-15-1-2',
  title: 'Appointment Flow Design',
  progress: 0,
  startDate: '2026-09-03T09:00:00',
  endDate: '2026-09-09T17:00:00',
  type: 'task',
  predecessors: ['task-15-1-1'],
  parentId: 'task-15-1'
},
{
  id: 'task-15-1-3',
  title: 'Feature Requirements',
  progress: 0,
  startDate: '2026-09-10T09:00:00',
  endDate: '2026-09-15T17:00:00',
  type: 'task',
  predecessors: ['task-15-1-2'],
  parentId: 'task-15-1'
},
{
  id: 'milestone-15-1',
  title: 'Requirements Approved',
  progress: 0,
  startDate: '2026-09-15T17:00:00',
  endDate: '2026-09-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-15-1'],
  parentId: 'proj-15'
},
{
  id: 'task-15-2',
  title: 'Patient Portal',
  assignee: 'Frontend Engineering',
  progress: 0,
  startDate: '2026-09-16T09:00:00',
  endDate: '2026-11-01T17:00:00',
  type: 'task',
  predecessors: ['milestone-15-1'],
  parentId: 'proj-15'
},
{
  id: 'task-15-2-1',
  title: 'Patient Registration & Profile',
  progress: 0,
  startDate: '2026-09-16T09:00:00',
  endDate: '2026-09-26T17:00:00',
  type: 'task',
  parentId: 'task-15-2'
},
{
  id: 'task-15-2-2',
  title: 'Appointment Booking Interface',
  progress: 0,
  startDate: '2026-09-27T09:00:00',
  endDate: '2026-10-08T17:00:00',
  type: 'task',
  predecessors: ['task-15-2-1'],
  parentId: 'task-15-2'
},
{
  id: 'task-15-2-3',
  title: 'Medical History Management',
  progress: 0,
  startDate: '2026-10-09T09:00:00',
  endDate: '2026-10-18T17:00:00',
  type: 'task',
  predecessors: ['task-15-2-2'],
  parentId: 'task-15-2'
},
{
  id: 'task-15-2-4',
  title: 'Prescription Management',
  progress: 0,
  startDate: '2026-10-19T09:00:00',
  endDate: '2026-10-28T17:00:00',
  type: 'task',
  predecessors: ['task-15-2-3'],
  parentId: 'task-15-2'
},
{
  id: 'task-15-2-5',
  title: 'Patient Dashboard & Testing',
  progress: 0,
  startDate: '2026-10-29T09:00:00',
  endDate: '2026-11-01T17:00:00',
  type: 'task',
  predecessors: ['task-15-2-4'],
  parentId: 'task-15-2'
},
{
  id: 'milestone-15-2',
  title: 'Patient Portal Complete',
  progress: 0,
  startDate: '2026-11-01T17:00:00',
  endDate: '2026-11-01T17:00:00',
  type: 'milestone',
  predecessors: ['task-15-2'],
  parentId: 'proj-15'
},
{
  id: 'task-15-3',
  title: 'Doctor Dashboard & Scheduling',
  assignee: 'Backend Engineering',
  progress: 0,
  startDate: '2026-09-16T09:00:00',
  endDate: '2026-11-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-15-1'],
  parentId: 'proj-15'
},
{
  id: 'task-15-3-1',
  title: 'Doctor Profile Management',
  progress: 0,
  startDate: '2026-09-16T09:00:00',
  endDate: '2026-09-25T17:00:00',
  type: 'task',
  parentId: 'task-15-3'
},
{
  id: 'task-15-3-2',
  title: 'Schedule Management',
  progress: 0,
  startDate: '2026-09-26T09:00:00',
  endDate: '2026-10-07T17:00:00',
  type: 'task',
  predecessors: ['task-15-3-1'],
  parentId: 'task-15-3'
},
{
  id: 'task-15-3-3',
  title: 'Appointment Calendar',
  progress: 0,
  startDate: '2026-10-08T09:00:00',
  endDate: '2026-10-19T17:00:00',
  type: 'task',
  predecessors: ['task-15-3-2'],
  parentId: 'task-15-3'
},
{
  id: 'task-15-3-4',
  title: 'Patient Records Access',
  progress: 0,
  startDate: '2026-10-20T09:00:00',
  endDate: '2026-10-30T17:00:00',
  type: 'task',
  predecessors: ['task-15-3-3'],
  parentId: 'task-15-3'
},
{
  id: 'task-15-3-5',
  title: 'Medical Notes & Prescriptions',
  progress: 0,
  startDate: '2026-10-31T09:00:00',
  endDate: '2026-11-10T17:00:00',
  type: 'task',
  predecessors: ['task-15-3-4'],
  parentId: 'task-15-3'
},
{
  id: 'task-15-3-6',
  title: 'Doctor Dashboard Testing',
  progress: 0,
  startDate: '2026-11-11T09:00:00',
  endDate: '2026-11-15T17:00:00',
  type: 'task',
  predecessors: ['task-15-3-5'],
  parentId: 'task-15-3'
},
{
  id: 'milestone-15-3',
  title: 'Doctor Dashboard Complete',
  progress: 0,
  startDate: '2026-11-15T17:00:00',
  endDate: '2026-11-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-15-3'],
  parentId: 'proj-15'
},
{
  id: 'task-15-4',
  title: 'Appointment Management System',
  assignee: 'Engineering Team',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['milestone-15-2', 'milestone-15-3'],
  parentId: 'proj-15'
},
{
  id: 'task-15-4-1',
  title: 'Appointment Engine',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2026-11-12T17:00:00',
  type: 'task',
  parentId: 'task-15-4'
},
{
  id: 'task-15-4-2',
  title: 'Notification & Reminders',
  progress: 0,
  startDate: '2026-11-13T09:00:00',
  endDate: '2026-11-25T17:00:00',
  type: 'task',
  predecessors: ['task-15-4-1'],
  parentId: 'task-15-4'
},
{
  id: 'task-15-4-3',
  title: 'Waiting List Management',
  progress: 0,
  startDate: '2026-11-26T09:00:00',
  endDate: '2026-12-07T17:00:00',
  type: 'task',
  predecessors: ['task-15-4-2'],
  parentId: 'task-15-4'
},
{
  id: 'task-15-4-4',
  title: 'Telemedicine Integration',
  progress: 0,
  startDate: '2026-12-08T09:00:00',
  endDate: '2026-12-20T17:00:00',
  type: 'task',
  predecessors: ['task-15-4-3'],
  parentId: 'task-15-4'
},
{
  id: 'task-15-4-5',
  title: 'System Testing & Optimization',
  progress: 0,
  startDate: '2026-12-21T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['task-15-4-4'],
  parentId: 'task-15-4'
},
{
  id: 'milestone-15-4',
  title: 'Appointment System Complete',
  progress: 0,
  startDate: '2027-01-05T17:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'milestone',
  predecessors: ['task-15-4'],
  parentId: 'proj-15'
},
{
  id: 'task-15-5',
  title: 'Admin Dashboard & Reporting',
  assignee: 'Data Science',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-15-4'],
  parentId: 'proj-15'
},
{
  id: 'task-15-5-1',
  title: 'Admin Dashboard Design',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-01-14T17:00:00',
  type: 'task',
  parentId: 'task-15-5'
},
{
  id: 'task-15-5-2',
  title: 'Analytics & Insights',
  progress: 0,
  startDate: '2027-01-15T09:00:00',
  endDate: '2027-01-26T17:00:00',
  type: 'task',
  predecessors: ['task-15-5-1'],
  parentId: 'task-15-5'
},
{
  id: 'task-15-5-3',
  title: 'Reporting Features',
  progress: 0,
  startDate: '2027-01-27T09:00:00',
  endDate: '2027-02-05T17:00:00',
  type: 'task',
  predecessors: ['task-15-5-2'],
  parentId: 'task-15-5'
},
{
  id: 'task-15-5-4',
  title: 'User Management',
  progress: 0,
  startDate: '2027-02-06T09:00:00',
  endDate: '2027-02-12T17:00:00',
  type: 'task',
  predecessors: ['task-15-5-3'],
  parentId: 'task-15-5'
},
{
  id: 'task-15-5-5',
  title: 'Dashboard Testing & Refinement',
  progress: 0,
  startDate: '2027-02-13T09:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'task',
  predecessors: ['task-15-5-4'],
  parentId: 'task-15-5'
},
{
  id: 'task-15-6',
  title: 'Security & Deployment',
  assignee: 'DevOps Team',
  progress: 0,
  startDate: '2027-02-16T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'task',
  predecessors: ['task-15-5'],
  parentId: 'proj-15'
},
{
  id: 'task-15-6-1',
  title: 'Security Audit',
  progress: 0,
  startDate: '2027-02-16T09:00:00',
  endDate: '2027-02-20T17:00:00',
  type: 'task',
  parentId: 'task-15-6'
},
{
  id: 'task-15-6-2',
  title: 'Data Privacy Compliance',
  progress: 0,
  startDate: '2027-02-21T09:00:00',
  endDate: '2027-02-23T17:00:00',
  type: 'task',
  predecessors: ['task-15-6-1'],
  parentId: 'task-15-6'
},
{
  id: 'task-15-6-3',
  title: 'Production Deployment',
  progress: 0,
  startDate: '2027-02-24T09:00:00',
  endDate: '2027-02-26T17:00:00',
  type: 'task',
  predecessors: ['task-15-6-2'],
  parentId: 'task-15-6'
},
{
  id: 'task-15-6-4',
  title: 'Staff Training & Go-Live',
  progress: 0,
  startDate: '2027-02-27T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'task',
  predecessors: ['task-15-6-3'],
  parentId: 'task-15-6'
},
{
  id: 'milestone-15-final',
  title: 'Healthcare System Live',
  progress: 0,
  startDate: '2027-02-28T17:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'milestone',
  predecessors: ['task-15-6'],
  parentId: 'proj-15'
},

// Project 16: Smart Building Management
{
  id: 'proj-16',
  title: 'Smart Building Management System',
  progress: 0,
  startDate: '2026-08-27T09:00:00',
  endDate: '2027-03-15T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-16-1',
  title: 'Building Automation Requirements',
  assignee: 'Smart Building Team',
  progress: 0,
  startDate: '2026-08-27T09:00:00',
  endDate: '2026-09-20T17:00:00',
  type: 'task',
  parentId: 'proj-16'
},
{
  id: 'task-16-1-1',
  title: 'Building Systems Assessment',
  progress: 0,
  startDate: '2026-08-27T09:00:00',
  endDate: '2026-09-04T17:00:00',
  type: 'task',
  parentId: 'task-16-1'
},
{
  id: 'task-16-1-2',
  title: 'IoT Sensor Requirements',
  progress: 0,
  startDate: '2026-09-05T09:00:00',
  endDate: '2026-09-12T17:00:00',
  type: 'task',
  predecessors: ['task-16-1-1'],
  parentId: 'task-16-1'
},
{
  id: 'task-16-1-3',
  title: 'Automation Strategy',
  progress: 0,
  startDate: '2026-09-13T09:00:00',
  endDate: '2026-09-18T17:00:00',
  type: 'task',
  predecessors: ['task-16-1-2'],
  parentId: 'task-16-1'
},
{
  id: 'task-16-1-4',
  title: 'Requirements Document',
  progress: 0,
  startDate: '2026-09-19T09:00:00',
  endDate: '2026-09-20T17:00:00',
  type: 'task',
  predecessors: ['task-16-1-3'],
  parentId: 'task-16-1'
},
{
  id: 'milestone-16-1',
  title: 'Requirements Complete',
  progress: 0,
  startDate: '2026-09-20T17:00:00',
  endDate: '2026-09-20T17:00:00',
  type: 'milestone',
  predecessors: ['task-16-1'],
  parentId: 'proj-16'
},
{
  id: 'task-16-2',
  title: 'IoT Sensor Network',
  assignee: 'IoT Engineering',
  progress: 0,
  startDate: '2026-09-21T09:00:00',
  endDate: '2026-11-01T17:00:00',
  type: 'task',
  predecessors: ['milestone-16-1'],
  parentId: 'proj-16'
},
{
  id: 'task-16-2-1',
  title: 'Sensor Selection & Procurement',
  progress: 0,
  startDate: '2026-09-21T09:00:00',
  endDate: '2026-09-29T17:00:00',
  type: 'task',
  parentId: 'task-16-2'
},
{
  id: 'task-16-2-2',
  title: 'Sensor Installation Plan',
  progress: 0,
  startDate: '2026-09-30T09:00:00',
  endDate: '2026-10-07T17:00:00',
  type: 'task',
  predecessors: ['task-16-2-1'],
  parentId: 'task-16-2'
},
{
  id: 'task-16-2-3',
  title: 'Network Configuration',
  progress: 0,
  startDate: '2026-10-08T09:00:00',
  endDate: '2026-10-17T17:00:00',
  type: 'task',
  predecessors: ['task-16-2-2'],
  parentId: 'task-16-2'
},
{
  id: 'task-16-2-4',
  title: 'Sensor Data Collection',
  progress: 0,
  startDate: '2026-10-18T09:00:00',
  endDate: '2026-10-28T17:00:00',
  type: 'task',
  predecessors: ['task-16-2-3'],
  parentId: 'task-16-2'
},
{
  id: 'task-16-2-5',
  title: 'Sensor Testing & Calibration',
  progress: 0,
  startDate: '2026-10-29T09:00:00',
  endDate: '2026-11-01T17:00:00',
  type: 'task',
  predecessors: ['task-16-2-4'],
  parentId: 'task-16-2'
},
{
  id: 'milestone-16-2',
  title: 'Sensor Network Ready',
  progress: 0,
  startDate: '2026-11-01T17:00:00',
  endDate: '2026-11-01T17:00:00',
  type: 'milestone',
  predecessors: ['task-16-2'],
  parentId: 'proj-16'
},
{
  id: 'task-16-3',
  title: 'Building Automation Engine',
  assignee: 'Backend Engineering',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['milestone-16-1'],
  parentId: 'proj-16'
},
{
  id: 'task-16-3-1',
  title: 'Automation Logic Design',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-12T17:00:00',
  type: 'task',
  parentId: 'task-16-3'
},
{
  id: 'task-16-3-2',
  title: 'Rule Engine Development',
  progress: 0,
  startDate: '2026-10-13T09:00:00',
  endDate: '2026-10-24T17:00:00',
  type: 'task',
  predecessors: ['task-16-3-1'],
  parentId: 'task-16-3'
},
{
  id: 'task-16-3-3',
  title: 'HVAC Automation',
  progress: 0,
  startDate: '2026-10-25T09:00:00',
  endDate: '2026-11-05T17:00:00',
  type: 'task',
  predecessors: ['task-16-3-2'],
  parentId: 'task-16-3'
},
{
  id: 'task-16-3-4',
  title: 'Lighting & Security Automation',
  progress: 0,
  startDate: '2026-11-06T09:00:00',
  endDate: '2026-11-17T17:00:00',
  type: 'task',
  predecessors: ['task-16-3-3'],
  parentId: 'task-16-3'
},
{
  id: 'task-16-3-5',
  title: 'Energy Optimization Algorithms',
  progress: 0,
  startDate: '2026-11-18T09:00:00',
  endDate: '2026-11-26T17:00:00',
  type: 'task',
  predecessors: ['task-16-3-4'],
  parentId: 'task-16-3'
},
{
  id: 'task-16-3-6',
  title: 'Automation Testing',
  progress: 0,
  startDate: '2026-11-27T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['task-16-3-5'],
  parentId: 'task-16-3'
},
{
  id: 'milestone-16-3',
  title: 'Automation Engine Ready',
  progress: 0,
  startDate: '2026-11-30T17:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'milestone',
  predecessors: ['task-16-3'],
  parentId: 'proj-16'
},
{
  id: 'task-16-4',
  title: 'Building Management Dashboard',
  assignee: 'Frontend Engineering',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2027-01-10T17:00:00',
  type: 'task',
  predecessors: ['milestone-16-2', 'milestone-16-3'],
  parentId: 'proj-16'
},
{
  id: 'task-16-4-1',
  title: 'Dashboard UI Design',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2026-11-10T17:00:00',
  type: 'task',
  parentId: 'task-16-4'
},
{
  id: 'task-16-4-2',
  title: 'Real-Time Monitoring',
  progress: 0,
  startDate: '2026-11-11T09:00:00',
  endDate: '2026-11-22T17:00:00',
  type: 'task',
  predecessors: ['task-16-4-1'],
  parentId: 'task-16-4'
},
{
  id: 'task-16-4-3',
  title: 'Energy Usage Analytics',
  progress: 0,
  startDate: '2026-11-23T09:00:00',
  endDate: '2026-12-04T17:00:00',
  type: 'task',
  predecessors: ['task-16-4-2'],
  parentId: 'task-16-4'
},
{
  id: 'task-16-4-4',
  title: 'Alert & Notification System',
  progress: 0,
  startDate: '2026-12-05T09:00:00',
  endDate: '2026-12-16T17:00:00',
  type: 'task',
  predecessors: ['task-16-4-3'],
  parentId: 'task-16-4'
},
{
  id: 'task-16-4-5',
  title: 'Reporting & Export',
  progress: 0,
  startDate: '2026-12-17T09:00:00',
  endDate: '2026-12-30T17:00:00',
  type: 'task',
  predecessors: ['task-16-4-4'],
  parentId: 'task-16-4'
},
{
  id: 'task-16-4-6',
  title: 'Dashboard Testing & Refinement',
  progress: 0,
  startDate: '2026-12-31T09:00:00',
  endDate: '2027-01-10T17:00:00',
  type: 'task',
  predecessors: ['task-16-4-5'],
  parentId: 'task-16-4'
},
{
  id: 'milestone-16-4',
  title: 'Dashboard Complete',
  progress: 0,
  startDate: '2027-01-10T17:00:00',
  endDate: '2027-01-10T17:00:00',
  type: 'milestone',
  predecessors: ['task-16-4'],
  parentId: 'proj-16'
},
{
  id: 'task-16-5',
  title: 'Mobile App Development',
  assignee: 'Mobile Engineering',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['milestone-16-4'],
  parentId: 'proj-16'
},
{
  id: 'task-16-5-1',
  title: 'Mobile App Design',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2026-12-10T17:00:00',
  type: 'task',
  parentId: 'task-16-5'
},
{
  id: 'task-16-5-2',
  title: 'App Development - iOS',
  progress: 0,
  startDate: '2026-12-11T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['task-16-5-1'],
  parentId: 'task-16-5'
},
{
  id: 'task-16-5-3',
  title: 'App Development - Android',
  progress: 0,
  startDate: '2026-12-11T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['task-16-5-1'],
  parentId: 'task-16-5'
},
{
  id: 'task-16-5-4',
  title: 'Mobile API Integration',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-01-20T17:00:00',
  type: 'task',
  predecessors: ['task-16-5-2', 'task-16-5-3'],
  parentId: 'task-16-5'
},
{
  id: 'task-16-5-5',
  title: 'Mobile Testing & Deployment',
  progress: 0,
  startDate: '2027-01-21T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['task-16-5-4'],
  parentId: 'task-16-5'
},
{
  id: 'milestone-16-5',
  title: 'Mobile App Ready',
  progress: 0,
  startDate: '2027-02-10T17:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'milestone',
  predecessors: ['task-16-5'],
  parentId: 'proj-16'
},
{
  id: 'task-16-6',
  title: 'Integration & Deployment',
  assignee: 'DevOps Team',
  progress: 0,
  startDate: '2027-02-11T09:00:00',
  endDate: '2027-03-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-16-5'],
  parentId: 'proj-16'
},
{
  id: 'task-16-6-1',
  title: 'System Integration Testing',
  progress: 0,
  startDate: '2027-02-11T09:00:00',
  endDate: '2027-02-20T17:00:00',
  type: 'task',
  parentId: 'task-16-6'
},
{
  id: 'task-16-6-2',
  title: 'Performance Testing',
  progress: 0,
  startDate: '2027-02-21T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'task',
  predecessors: ['task-16-6-1'],
  parentId: 'task-16-6'
},
{
  id: 'task-16-6-3',
  title: 'Security Testing',
  progress: 0,
  startDate: '2027-03-01T09:00:00',
  endDate: '2027-03-05T17:00:00',
  type: 'task',
  predecessors: ['task-16-6-2'],
  parentId: 'task-16-6'
},
{
  id: 'task-16-6-4',
  title: 'Production Deployment',
  progress: 0,
  startDate: '2027-03-06T09:00:00',
  endDate: '2027-03-10T17:00:00',
  type: 'task',
  predecessors: ['task-16-6-3'],
  parentId: 'task-16-6'
},
{
  id: 'task-16-6-5',
  title: 'Building Staff Training',
  progress: 0,
  startDate: '2027-03-11T09:00:00',
  endDate: '2027-03-14T17:00:00',
  type: 'task',
  predecessors: ['task-16-6-4'],
  parentId: 'task-16-6'
},
{
  id: 'task-16-6-6',
  title: 'Go-Live & Monitoring',
  progress: 0,
  startDate: '2027-03-15T09:00:00',
  endDate: '2027-03-15T17:00:00',
  type: 'task',
  predecessors: ['task-16-6-5'],
  parentId: 'task-16-6'
},
{
  id: 'milestone-16-final',
  title: 'Smart Building Complete',
  progress: 0,
  startDate: '2027-03-15T17:00:00',
  endDate: '2027-03-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-16-6'],
  parentId: 'proj-16'
},

// Project 17: AI Content Generation Platform
{
  id: 'proj-17',
  title: 'AI Content Generation Platform',
  progress: 0,
  startDate: '2026-08-29T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-17-1',
  title: 'Content AI Architecture',
  assignee: 'AI/ML Team',
  progress: 0,
  startDate: '2026-08-29T09:00:00',
  endDate: '2026-09-25T17:00:00',
  type: 'task',
  parentId: 'proj-17'
},
{
  id: 'task-17-1-1',
  title: 'AI Model Selection',
  progress: 0,
  startDate: '2026-08-29T09:00:00',
  endDate: '2026-09-07T17:00:00',
  type: 'task',
  parentId: 'task-17-1'
},
{
  id: 'task-17-1-2',
  title: 'Training Data Collection',
  progress: 0,
  startDate: '2026-09-08T09:00:00',
  endDate: '2026-09-15T17:00:00',
  type: 'task',
  predecessors: ['task-17-1-1'],
  parentId: 'task-17-1'
},
{
  id: 'task-17-1-3',
  title: 'Content Generation Pipeline',
  progress: 0,
  startDate: '2026-09-16T09:00:00',
  endDate: '2026-09-22T17:00:00',
  type: 'task',
  predecessors: ['task-17-1-2'],
  parentId: 'task-17-1'
},
{
  id: 'task-17-1-4',
  title: 'Architecture Design',
  progress: 0,
  startDate: '2026-09-23T09:00:00',
  endDate: '2026-09-25T17:00:00',
  type: 'task',
  predecessors: ['task-17-1-3'],
  parentId: 'task-17-1'
},
{
  id: 'milestone-17-1',
  title: 'Architecture Finalized',
  progress: 0,
  startDate: '2026-09-25T17:00:00',
  endDate: '2026-09-25T17:00:00',
  type: 'milestone',
  predecessors: ['task-17-1'],
  parentId: 'proj-17'
},
{
  id: 'task-17-2',
  title: 'AI Model Training',
  assignee: 'AI/ML Team',
  progress: 0,
  startDate: '2026-09-26T09:00:00',
  endDate: '2026-11-10T17:00:00',
  type: 'task',
  predecessors: ['milestone-17-1'],
  parentId: 'proj-17'
},
{
  id: 'task-17-2-1',
  title: 'Model Fine-Tuning',
  progress: 0,
  startDate: '2026-09-26T09:00:00',
  endDate: '2026-10-08T17:00:00',
  type: 'task',
  parentId: 'task-17-2'
},
{
  id: 'task-17-2-2',
  title: 'Content Quality Training',
  progress: 0,
  startDate: '2026-10-09T09:00:00',
  endDate: '2026-10-22T17:00:00',
  type: 'task',
  predecessors: ['task-17-2-1'],
  parentId: 'task-17-2'
},
{
  id: 'task-17-2-3',
  title: 'Style & Tone Customization',
  progress: 0,
  startDate: '2026-10-23T09:00:00',
  endDate: '2026-11-02T17:00:00',
  type: 'task',
  predecessors: ['task-17-2-2'],
  parentId: 'task-17-2'
},
{
  id: 'task-17-2-4',
  title: 'Model Validation & Testing',
  progress: 0,
  startDate: '2026-11-03T09:00:00',
  endDate: '2026-11-10T17:00:00',
  type: 'task',
  predecessors: ['task-17-2-3'],
  parentId: 'task-17-2'
},
{
  id: 'milestone-17-2',
  title: 'AI Model Ready',
  progress: 0,
  startDate: '2026-11-10T17:00:00',
  endDate: '2026-11-10T17:00:00',
  type: 'milestone',
  predecessors: ['task-17-2'],
  parentId: 'proj-17'
},
{
  id: 'task-17-3',
  title: 'Content Platform Development',
  assignee: 'Engineering Team',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-17-1'],
  parentId: 'proj-17'
},
{
  id: 'task-17-3-1',
  title: 'Content Editor Interface',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-12T17:00:00',
  type: 'task',
  parentId: 'task-17-3'
},
{
  id: 'task-17-3-2',
  title: 'Content Generation Workflow',
  progress: 0,
  startDate: '2026-10-13T09:00:00',
  endDate: '2026-10-26T17:00:00',
  type: 'task',
  predecessors: ['task-17-3-1'],
  parentId: 'task-17-3'
},
{
  id: 'task-17-3-3',
  title: 'Content Management System',
  progress: 0,
  startDate: '2026-10-27T09:00:00',
  endDate: '2026-11-08T17:00:00',
  type: 'task',
  predecessors: ['task-17-3-2'],
  parentId: 'task-17-3'
},
{
  id: 'task-17-3-4',
  title: 'SEO Optimization Features',
  progress: 0,
  startDate: '2026-11-09T09:00:00',
  endDate: '2026-11-22T17:00:00',
  type: 'task',
  predecessors: ['task-17-3-3'],
  parentId: 'task-17-3'
},
{
  id: 'task-17-3-5',
  title: 'Multi-Format Export',
  progress: 0,
  startDate: '2026-11-23T09:00:00',
  endDate: '2026-12-05T17:00:00',
  type: 'task',
  predecessors: ['task-17-3-4'],
  parentId: 'task-17-3'
},
{
  id: 'task-17-3-6',
  title: 'Platform Testing',
  progress: 0,
  startDate: '2026-12-06T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'task',
  predecessors: ['task-17-3-5'],
  parentId: 'task-17-3'
},
{
  id: 'milestone-17-3',
  title: 'Platform Complete',
  progress: 0,
  startDate: '2026-12-15T17:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-17-3'],
  parentId: 'proj-17'
},
{
  id: 'task-17-4',
  title: 'AI Integration & Optimization',
  assignee: 'AI/ML Team',
  progress: 0,
  startDate: '2026-11-11T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-17-2'],
  parentId: 'proj-17'
},
{
  id: 'task-17-4-1',
  title: 'AI API Development',
  progress: 0,
  startDate: '2026-11-11T09:00:00',
  endDate: '2026-11-25T17:00:00',
  type: 'task',
  parentId: 'task-17-4'
},
{
  id: 'task-17-4-2',
  title: 'Platform Integration',
  progress: 0,
  startDate: '2026-11-26T09:00:00',
  endDate: '2026-12-10T17:00:00',
  type: 'task',
  predecessors: ['task-17-4-1'],
  parentId: 'task-17-4'
},
{
  id: 'task-17-4-3',
  title: 'Performance Optimization',
  progress: 0,
  startDate: '2026-12-11T09:00:00',
  endDate: '2026-12-24T17:00:00',
  type: 'task',
  predecessors: ['task-17-4-2'],
  parentId: 'task-17-4'
},
{
  id: 'task-17-4-4',
  title: 'User Feedback Integration',
  progress: 0,
  startDate: '2026-12-25T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['task-17-4-3'],
  parentId: 'task-17-4'
},
{
  id: 'task-17-4-5',
  title: 'Model Fine-Tuning',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['task-17-4-4'],
  parentId: 'task-17-4'
},
{
  id: 'milestone-17-4',
  title: 'AI Integration Complete',
  progress: 0,
  startDate: '2027-01-15T17:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-17-4'],
  parentId: 'proj-17'
},
{
  id: 'task-17-5',
  title: 'Deployment & Go-Live',
  assignee: 'DevOps Team',
  progress: 0,
  startDate: '2027-01-16T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'task',
  predecessors: ['milestone-17-3', 'milestone-17-4'],
  parentId: 'proj-17'
},
{
  id: 'task-17-5-1',
  title: 'Production Setup',
  progress: 0,
  startDate: '2027-01-16T09:00:00',
  endDate: '2027-01-25T17:00:00',
  type: 'task',
  parentId: 'task-17-5'
},
{
  id: 'task-17-5-2',
  title: 'Integration Testing',
  progress: 0,
  startDate: '2027-01-26T09:00:00',
  endDate: '2027-02-05T17:00:00',
  type: 'task',
  predecessors: ['task-17-5-1'],
  parentId: 'task-17-5'
},
{
  id: 'task-17-5-3',
  title: 'User Acceptance Testing',
  progress: 0,
  startDate: '2027-02-06T09:00:00',
  endDate: '2027-02-14T17:00:00',
  type: 'task',
  predecessors: ['task-17-5-2'],
  parentId: 'task-17-5'
},
{
  id: 'task-17-5-4',
  title: 'Content Team Training',
  progress: 0,
  startDate: '2027-02-15T09:00:00',
  endDate: '2027-02-20T17:00:00',
  type: 'task',
  predecessors: ['task-17-5-3'],
  parentId: 'task-17-5'
},
{
  id: 'task-17-5-5',
  title: 'Go-Live & Monitoring',
  progress: 0,
  startDate: '2027-02-21T09:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'task',
  predecessors: ['task-17-5-4'],
  parentId: 'task-17-5'
},
{
  id: 'milestone-17-final',
  title: 'AI Content Platform Live',
  progress: 0,
  startDate: '2027-02-28T17:00:00',
  endDate: '2027-02-28T17:00:00',
  type: 'milestone',
  predecessors: ['task-17-5'],
  parentId: 'proj-17'
},

// Project 18: Employee Wellness Platform
{
  id: 'proj-18',
  title: 'Employee Wellness Platform',
  progress: 0,
  startDate: '2026-09-01T09:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-18-1',
  title: 'Wellness Program Design',
  assignee: 'HR Team',
  progress: 0,
  startDate: '2026-09-01T09:00:00',
  endDate: '2026-09-25T17:00:00',
  type: 'task',
  parentId: 'proj-18'
},
{
  id: 'task-18-1-1',
  title: 'Employee Wellness Survey',
  progress: 0,
  startDate: '2026-09-01T09:00:00',
  endDate: '2026-09-08T17:00:00',
  type: 'task',
  parentId: 'task-18-1'
},
{
  id: 'task-18-1-2',
  title: 'Program Requirements',
  progress: 0,
  startDate: '2026-09-09T09:00:00',
  endDate: '2026-09-16T17:00:00',
  type: 'task',
  predecessors: ['task-18-1-1'],
  parentId: 'task-18-1'
},
{
  id: 'task-18-1-3',
  title: 'Wellness Activities Planning',
  progress: 0,
  startDate: '2026-09-17T09:00:00',
  endDate: '2026-09-22T17:00:00',
  type: 'task',
  predecessors: ['task-18-1-2'],
  parentId: 'task-18-1'
},
{
  id: 'task-18-1-4',
  title: 'Program Design Document',
  progress: 0,
  startDate: '2026-09-23T09:00:00',
  endDate: '2026-09-25T17:00:00',
  type: 'task',
  predecessors: ['task-18-1-3'],
  parentId: 'task-18-1'
},
{
  id: 'milestone-18-1',
  title: 'Program Design Complete',
  progress: 0,
  startDate: '2026-09-25T17:00:00',
  endDate: '2026-09-25T17:00:00',
  type: 'milestone',
  predecessors: ['task-18-1'],
  parentId: 'proj-18'
},
{
  id: 'task-18-2',
  title: 'Wellness App Development',
  assignee: 'Mobile Engineering',
  progress: 0,
  startDate: '2026-09-26T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['milestone-18-1'],
  parentId: 'proj-18'
},
{
  id: 'task-18-2-1',
  title: 'App UI/UX Design',
  progress: 0,
  startDate: '2026-09-26T09:00:00',
  endDate: '2026-10-07T17:00:00',
  type: 'task',
  parentId: 'task-18-2'
},
{
  id: 'task-18-2-2',
  title: 'iOS App Development',
  progress: 0,
  startDate: '2026-10-08T09:00:00',
  endDate: '2026-11-02T17:00:00',
  type: 'task',
  predecessors: ['task-18-2-1'],
  parentId: 'task-18-2'
},
{
  id: 'task-18-2-3',
  title: 'Android App Development',
  progress: 0,
  startDate: '2026-10-08T09:00:00',
  endDate: '2026-11-02T17:00:00',
  type: 'task',
  predecessors: ['task-18-2-1'],
  parentId: 'task-18-2'
},
{
  id: 'task-18-2-4',
  title: 'App Testing & Refinement',
  progress: 0,
  startDate: '2026-11-03T09:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'task',
  predecessors: ['task-18-2-2', 'task-18-2-3'],
  parentId: 'task-18-2'
},
{
  id: 'milestone-18-2',
  title: 'Wellness App Ready',
  progress: 0,
  startDate: '2026-11-30T17:00:00',
  endDate: '2026-11-30T17:00:00',
  type: 'milestone',
  predecessors: ['task-18-2'],
  parentId: 'proj-18'
},
{
  id: 'task-18-3',
  title: 'Wellness Activities & Content',
  assignee: 'Content Team',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-12-01T17:00:00',
  type: 'task',
  predecessors: ['milestone-18-1'],
  parentId: 'proj-18'
},
{
  id: 'task-18-3-1',
  title: 'Wellness Content Creation',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-15T17:00:00',
  type: 'task',
  parentId: 'task-18-3'
},
{
  id: 'task-18-3-2',
  title: 'Meditation & Yoga Content',
  progress: 0,
  startDate: '2026-10-16T09:00:00',
  endDate: '2026-10-30T17:00:00',
  type: 'task',
  predecessors: ['task-18-3-1'],
  parentId: 'task-18-3'
},
{
  id: 'task-18-3-3',
  title: 'Nutrition & Diet Plans',
  progress: 0,
  startDate: '2026-10-31T09:00:00',
  endDate: '2026-11-12T17:00:00',
  type: 'task',
  predecessors: ['task-18-3-2'],
  parentId: 'task-18-3'
},
{
  id: 'task-18-3-4',
  title: 'Mental Health Resources',
  progress: 0,
  startDate: '2026-11-13T09:00:00',
  endDate: '2026-11-25T17:00:00',
  type: 'task',
  predecessors: ['task-18-3-3'],
  parentId: 'task-18-3'
},
{
  id: 'task-18-3-5',
  title: 'Content Review & Approval',
  progress: 0,
  startDate: '2026-11-26T09:00:00',
  endDate: '2026-12-01T17:00:00',
  type: 'task',
  predecessors: ['task-18-3-4'],
  parentId: 'task-18-3'
},
{
  id: 'milestone-18-3',
  title: 'Content Complete',
  progress: 0,
  startDate: '2026-12-01T17:00:00',
  endDate: '2026-12-01T17:00:00',
  type: 'milestone',
  predecessors: ['task-18-3'],
  parentId: 'proj-18'
},
{
  id: 'task-18-4',
  title: 'Wellness Challenges & Gamification',
  assignee: 'Engineering Team',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-18-2', 'milestone-18-3'],
  parentId: 'proj-18'
},
{
  id: 'task-18-4-1',
  title: 'Challenge Engine',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2026-12-12T17:00:00',
  type: 'task',
  parentId: 'task-18-4'
},
{
  id: 'task-18-4-2',
  title: 'Points & Rewards System',
  progress: 0,
  startDate: '2026-12-13T09:00:00',
  endDate: '2026-12-22T17:00:00',
  type: 'task',
  predecessors: ['task-18-4-1'],
  parentId: 'task-18-4'
},
{
  id: 'task-18-4-3',
  title: 'Team Competitions',
  progress: 0,
  startDate: '2026-12-23T09:00:00',
  endDate: '2027-01-05T17:00:00',
  type: 'task',
  predecessors: ['task-18-4-2'],
  parentId: 'task-18-4'
},
{
  id: 'task-18-4-4',
  title: 'Leaderboard & Social Features',
  progress: 0,
  startDate: '2027-01-06T09:00:00',
  endDate: '2027-01-12T17:00:00',
  type: 'task',
  predecessors: ['task-18-4-3'],
  parentId: 'task-18-4'
},
{
  id: 'task-18-4-5',
  title: 'Testing & Refinement',
  progress: 0,
  startDate: '2027-01-13T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['task-18-4-4'],
  parentId: 'task-18-4'
},
{
  id: 'milestone-18-4',
  title: 'Gamification Complete',
  progress: 0,
  startDate: '2027-01-15T17:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-18-4'],
  parentId: 'proj-18'
},
{
  id: 'task-18-5',
  title: 'Admin Dashboard & Analytics',
  assignee: 'Data Science',
  progress: 0,
  startDate: '2027-01-16T09:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-18-4'],
  parentId: 'proj-18'
},
{
  id: 'task-18-5-1',
  title: 'Admin Portal Design',
  progress: 0,
  startDate: '2027-01-16T09:00:00',
  endDate: '2027-01-23T17:00:00',
  type: 'task',
  parentId: 'task-18-5'
},
{
  id: 'task-18-5-2',
  title: 'Employee Engagement Metrics',
  progress: 0,
  startDate: '2027-01-24T09:00:00',
  endDate: '2027-02-01T17:00:00',
  type: 'task',
  predecessors: ['task-18-5-1'],
  parentId: 'task-18-5'
},
{
  id: 'task-18-5-3',
  title: 'Wellness Program Analytics',
  progress: 0,
  startDate: '2027-02-02T09:00:00',
  endDate: '2027-02-09T17:00:00',
  type: 'task',
  predecessors: ['task-18-5-2'],
  parentId: 'task-18-5'
},
{
  id: 'task-18-5-4',
  title: 'Reporting & Export',
  progress: 0,
  startDate: '2027-02-10T09:00:00',
  endDate: '2027-02-13T17:00:00',
  type: 'task',
  predecessors: ['task-18-5-3'],
  parentId: 'task-18-5'
},
{
  id: 'task-18-5-5',
  title: 'Dashboard Testing',
  progress: 0,
  startDate: '2027-02-14T09:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'task',
  predecessors: ['task-18-5-4'],
  parentId: 'task-18-5'
},
{
  id: 'milestone-18-final',
  title: 'Wellness Platform Complete',
  progress: 0,
  startDate: '2027-02-15T17:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-18-5'],
  parentId: 'proj-18'
},

// Project 19: Smart Inventory Management
{
  id: 'proj-19',
  title: 'Smart Inventory Management System',
  progress: 0,
  startDate: '2026-09-03T09:00:00',
  endDate: '2027-03-20T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-19-1',
  title: 'Inventory System Analysis',
  assignee: 'Operations Team',
  progress: 0,
  startDate: '2026-09-03T09:00:00',
  endDate: '2026-09-28T17:00:00',
  type: 'task',
  parentId: 'proj-19'
},
{
  id: 'task-19-1-1',
  title: 'Current Inventory Audit',
  progress: 0,
  startDate: '2026-09-03T09:00:00',
  endDate: '2026-09-11T17:00:00',
  type: 'task',
  parentId: 'task-19-1'
},
{
  id: 'task-19-1-2',
  title: 'Process Optimization Areas',
  progress: 0,
  startDate: '2026-09-12T09:00:00',
  endDate: '2026-09-19T17:00:00',
  type: 'task',
  predecessors: ['task-19-1-1'],
  parentId: 'task-19-1'
},
{
  id: 'task-19-1-3',
  title: 'Technology Requirements',
  progress: 0,
  startDate: '2026-09-20T09:00:00',
  endDate: '2026-09-25T17:00:00',
  type: 'task',
  predecessors: ['task-19-1-2'],
  parentId: 'task-19-1'
},
{
  id: 'task-19-1-4',
  title: 'System Requirements Document',
  progress: 0,
  startDate: '2026-09-26T09:00:00',
  endDate: '2026-09-28T17:00:00',
  type: 'task',
  predecessors: ['task-19-1-3'],
  parentId: 'task-19-1'
},
{
  id: 'milestone-19-1',
  title: 'Requirements Complete',
  progress: 0,
  startDate: '2026-09-28T17:00:00',
  endDate: '2026-09-28T17:00:00',
  type: 'milestone',
  predecessors: ['task-19-1'],
  parentId: 'proj-19'
},
{
  id: 'task-19-2',
  title: 'IoT Inventory Tracking',
  assignee: 'IoT Engineering',
  progress: 0,
  startDate: '2026-09-29T09:00:00',
  endDate: '2026-11-20T17:00:00',
  type: 'task',
  predecessors: ['milestone-19-1'],
  parentId: 'proj-19'
},
{
  id: 'task-19-2-1',
  title: 'RFID System Design',
  progress: 0,
  startDate: '2026-09-29T09:00:00',
  endDate: '2026-10-08T17:00:00',
  type: 'task',
  parentId: 'task-19-2'
},
{
  id: 'task-19-2-2',
  title: 'Sensor Deployment',
  progress: 0,
  startDate: '2026-10-09T09:00:00',
  endDate: '2026-10-20T17:00:00',
  type: 'task',
  predecessors: ['task-19-2-1'],
  parentId: 'task-19-2'
},
{
  id: 'task-19-2-3',
  title: 'Real-Time Tracking System',
  progress: 0,
  startDate: '2026-10-21T09:00:00',
  endDate: '2026-11-05T17:00:00',
  type: 'task',
  predecessors: ['task-19-2-2'],
  parentId: 'task-19-2'
},
{
  id: 'task-19-2-4',
  title: 'Data Integration',
  progress: 0,
  startDate: '2026-11-06T09:00:00',
  endDate: '2026-11-15T17:00:00',
  type: 'task',
  predecessors: ['task-19-2-3'],
  parentId: 'task-19-2'
},
{
  id: 'task-19-2-5',
  title: 'System Testing',
  progress: 0,
  startDate: '2026-11-16T09:00:00',
  endDate: '2026-11-20T17:00:00',
  type: 'task',
  predecessors: ['task-19-2-4'],
  parentId: 'task-19-2'
},
{
  id: 'milestone-19-2',
  title: 'IoT Tracking Ready',
  progress: 0,
  startDate: '2026-11-20T17:00:00',
  endDate: '2026-11-20T17:00:00',
  type: 'milestone',
  predecessors: ['task-19-2'],
  parentId: 'proj-19'
},
{
  id: 'task-19-3',
  title: 'Inventory Management Software',
  assignee: 'Backend Engineering',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-19-1'],
  parentId: 'proj-19'
},
{
  id: 'task-19-3-1',
  title: 'Stock Management Module',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-14T17:00:00',
  type: 'task',
  parentId: 'task-19-3'
},
{
  id: 'task-19-3-2',
  title: 'Order Management',
  progress: 0,
  startDate: '2026-10-15T09:00:00',
  endDate: '2026-10-28T17:00:00',
  type: 'task',
  predecessors: ['task-19-3-1'],
  parentId: 'task-19-3'
},
{
  id: 'task-19-3-3',
  title: 'Inventory Forecasting',
  progress: 0,
  startDate: '2026-10-29T09:00:00',
  endDate: '2026-11-12T17:00:00',
  type: 'task',
  predecessors: ['task-19-3-2'],
  parentId: 'task-19-3'
},
{
  id: 'task-19-3-4',
  title: 'Supplier Management',
  progress: 0,
  startDate: '2026-11-13T09:00:00',
  endDate: '2026-11-25T17:00:00',
  type: 'task',
  predecessors: ['task-19-3-3'],
  parentId: 'task-19-3'
},
{
  id: 'task-19-3-5',
  title: 'Inventory Analytics',
  progress: 0,
  startDate: '2026-11-26T09:00:00',
  endDate: '2026-12-08T17:00:00',
  type: 'task',
  predecessors: ['task-19-3-4'],
  parentId: 'task-19-3'
},
{
  id: 'task-19-3-6',
  title: 'System Testing & Optimization',
  progress: 0,
  startDate: '2026-12-09T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'task',
  predecessors: ['task-19-3-5'],
  parentId: 'task-19-3'
},
{
  id: 'milestone-19-3',
  title: 'Software Complete',
  progress: 0,
  startDate: '2026-12-15T17:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-19-3'],
  parentId: 'proj-19'
},
{
  id: 'task-19-4',
  title: 'AI-Powered Inventory Optimization',
  assignee: 'AI/ML Team',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2027-02-01T17:00:00',
  type: 'task',
  predecessors: ['milestone-19-2', 'milestone-19-3'],
  parentId: 'proj-19'
},
{
  id: 'task-19-4-1',
  title: 'Demand Prediction Model',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2026-12-15T17:00:00',
  type: 'task',
  parentId: 'task-19-4'
},
{
  id: 'task-19-4-2',
  title: 'Stock Replenishment Algorithm',
  progress: 0,
  startDate: '2026-12-16T09:00:00',
  endDate: '2026-12-30T17:00:00',
  type: 'task',
  predecessors: ['task-19-4-1'],
  parentId: 'task-19-4'
},
{
  id: 'task-19-4-3',
  title: 'Optimization Engine',
  progress: 0,
  startDate: '2026-12-31T09:00:00',
  endDate: '2027-01-12T17:00:00',
  type: 'task',
  predecessors: ['task-19-4-2'],
  parentId: 'task-19-4'
},
{
  id: 'task-19-4-4',
  title: 'Model Integration',
  progress: 0,
  startDate: '2027-01-13T09:00:00',
  endDate: '2027-01-22T17:00:00',
  type: 'task',
  predecessors: ['task-19-4-3'],
  parentId: 'task-19-4'
},
{
  id: 'task-19-4-5',
  title: 'Testing & Validation',
  progress: 0,
  startDate: '2027-01-23T09:00:00',
  endDate: '2027-02-01T17:00:00',
  type: 'task',
  predecessors: ['task-19-4-4'],
  parentId: 'task-19-4'
},
{
  id: 'milestone-19-4',
  title: 'AI Optimization Ready',
  progress: 0,
  startDate: '2027-02-01T17:00:00',
  endDate: '2027-02-01T17:00:00',
  type: 'milestone',
  predecessors: ['task-19-4'],
  parentId: 'proj-19'
},
{
  id: 'task-19-5',
  title: 'Deployment & Integration',
  assignee: 'DevOps Team',
  progress: 0,
  startDate: '2027-02-02T09:00:00',
  endDate: '2027-03-20T17:00:00',
  type: 'task',
  predecessors: ['milestone-19-4'],
  parentId: 'proj-19'
},
{
  id: 'task-19-5-1',
  title: 'System Integration',
  progress: 0,
  startDate: '2027-02-02T09:00:00',
  endDate: '2027-02-15T17:00:00',
  type: 'task',
  parentId: 'task-19-5'
},
{
  id: 'task-19-5-2',
  title: 'User Training',
  progress: 0,
  startDate: '2027-02-16T09:00:00',
  endDate: '2027-02-22T17:00:00',
  type: 'task',
  predecessors: ['task-19-5-1'],
  parentId: 'task-19-5'
},
{
  id: 'task-19-5-3',
  title: 'Data Migration',
  progress: 0,
  startDate: '2027-02-23T09:00:00',
  endDate: '2027-03-03T17:00:00',
  type: 'task',
  predecessors: ['task-19-5-2'],
  parentId: 'task-19-5'
},
{
  id: 'task-19-5-4',
  title: 'Go-Live Preparation',
  progress: 0,
  startDate: '2027-03-04T09:00:00',
  endDate: '2027-03-10T17:00:00',
  type: 'task',
  predecessors: ['task-19-5-3'],
  parentId: 'task-19-5'
},
{
  id: 'task-19-5-5',
  title: 'Production Deployment',
  progress: 0,
  startDate: '2027-03-11T09:00:00',
  endDate: '2027-03-15T17:00:00',
  type: 'task',
  predecessors: ['task-19-5-4'],
  parentId: 'task-19-5'
},
{
  id: 'task-19-5-6',
  title: 'Post-Launch Support',
  progress: 0,
  startDate: '2027-03-16T09:00:00',
  endDate: '2027-03-20T17:00:00',
  type: 'task',
  predecessors: ['task-19-5-5'],
  parentId: 'task-19-5'
},
{
  id: 'milestone-19-final',
  title: 'Inventory System Complete',
  progress: 0,
  startDate: '2027-03-20T17:00:00',
  endDate: '2027-03-20T17:00:00',
  type: 'milestone',
  predecessors: ['task-19-5'],
  parentId: 'proj-19'
},

// Project 20: Sustainable Energy Management
{
  id: 'proj-20',
  title: 'Sustainable Energy Management Platform',
  progress: 0,
  startDate: '2026-09-05T09:00:00',
  endDate: '2027-03-25T17:00:00',
  type: 'project',
  parentId: null
},
{
  id: 'task-20-1',
  title: 'Energy Assessment & Planning',
  assignee: 'Energy Team',
  progress: 0,
  startDate: '2026-09-05T09:00:00',
  endDate: '2026-09-30T17:00:00',
  type: 'task',
  parentId: 'proj-20'
},
{
  id: 'task-20-1-1',
  title: 'Energy Consumption Audit',
  progress: 0,
  startDate: '2026-09-05T09:00:00',
  endDate: '2026-09-14T17:00:00',
  type: 'task',
  parentId: 'task-20-1'
},
{
  id: 'task-20-1-2',
  title: 'Sustainability Goals Definition',
  progress: 0,
  startDate: '2026-09-15T09:00:00',
  endDate: '2026-09-22T17:00:00',
  type: 'task',
  predecessors: ['task-20-1-1'],
  parentId: 'task-20-1'
},
{
  id: 'task-20-1-3',
  title: 'Renewable Energy Options',
  progress: 0,
  startDate: '2026-09-23T09:00:00',
  endDate: '2026-09-28T17:00:00',
  type: 'task',
  predecessors: ['task-20-1-2'],
  parentId: 'task-20-1'
},
{
  id: 'task-20-1-4',
  title: 'Implementation Strategy',
  progress: 0,
  startDate: '2026-09-29T09:00:00',
  endDate: '2026-09-30T17:00:00',
  type: 'task',
  predecessors: ['task-20-1-3'],
  parentId: 'task-20-1'
},
{
  id: 'milestone-20-1',
  title: 'Energy Plan Complete',
  progress: 0,
  startDate: '2026-09-30T17:00:00',
  endDate: '2026-09-30T17:00:00',
  type: 'milestone',
  predecessors: ['task-20-1'],
  parentId: 'proj-20'
},
{
  id: 'task-20-2',
  title: 'Energy Monitoring System',
  assignee: 'IoT Engineering',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-11-25T17:00:00',
  type: 'task',
  predecessors: ['milestone-20-1'],
  parentId: 'proj-20'
},
{
  id: 'task-20-2-1',
  title: 'Smart Meter Installation',
  progress: 0,
  startDate: '2026-10-01T09:00:00',
  endDate: '2026-10-12T17:00:00',
  type: 'task',
  parentId: 'task-20-2'
},
{
  id: 'task-20-2-2',
  title: 'Data Collection System',
  progress: 0,
  startDate: '2026-10-13T09:00:00',
  endDate: '2026-10-25T17:00:00',
  type: 'task',
  predecessors: ['task-20-2-1'],
  parentId: 'task-20-2'
},
{
  id: 'task-20-2-3',
  title: 'Real-Time Monitoring Dashboard',
  progress: 0,
  startDate: '2026-10-26T09:00:00',
  endDate: '2026-11-08T17:00:00',
  type: 'task',
  predecessors: ['task-20-2-2'],
  parentId: 'task-20-2'
},
{
  id: 'task-20-2-4',
  title: 'Alert & Notification System',
  progress: 0,
  startDate: '2026-11-09T09:00:00',
  endDate: '2026-11-18T17:00:00',
  type: 'task',
  predecessors: ['task-20-2-3'],
  parentId: 'task-20-2'
},
{
  id: 'task-20-2-5',
  title: 'System Testing & Calibration',
  progress: 0,
  startDate: '2026-11-19T09:00:00',
  endDate: '2026-11-25T17:00:00',
  type: 'task',
  predecessors: ['task-20-2-4'],
  parentId: 'task-20-2'
},
{
  id: 'milestone-20-2',
  title: 'Monitoring System Ready',
  progress: 0,
  startDate: '2026-11-25T17:00:00',
  endDate: '2026-11-25T17:00:00',
  type: 'milestone',
  predecessors: ['task-20-2'],
  parentId: 'proj-20'
},
{
  id: 'task-20-3',
  title: 'Energy Optimization Platform',
  assignee: 'Engineering Team',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['milestone-20-1'],
  parentId: 'proj-20'
},
{
  id: 'task-20-3-1',
  title: 'Optimization Algorithms',
  progress: 0,
  startDate: '2026-11-01T09:00:00',
  endDate: '2026-11-14T17:00:00',
  type: 'task',
  parentId: 'task-20-3'
},
{
  id: 'task-20-3-2',
  title: 'Energy Efficiency Recommendations',
  progress: 0,
  startDate: '2026-11-15T09:00:00',
  endDate: '2026-11-28T17:00:00',
  type: 'task',
  predecessors: ['task-20-3-1'],
  parentId: 'task-20-3'
},
{
  id: 'task-20-3-3',
  title: 'Carbon Footprint Tracking',
  progress: 0,
  startDate: '2026-11-29T09:00:00',
  endDate: '2026-12-12T17:00:00',
  type: 'task',
  predecessors: ['task-20-3-2'],
  parentId: 'task-20-3'
},
{
  id: 'task-20-3-4',
  title: 'Renewable Energy Integration',
  progress: 0,
  startDate: '2026-12-13T09:00:00',
  endDate: '2026-12-28T17:00:00',
  type: 'task',
  predecessors: ['task-20-3-3'],
  parentId: 'task-20-3'
},
{
  id: 'task-20-3-5',
  title: 'Energy Analytics Dashboard',
  progress: 0,
  startDate: '2026-12-29T09:00:00',
  endDate: '2027-01-08T17:00:00',
  type: 'task',
  predecessors: ['task-20-3-4'],
  parentId: 'task-20-3'
},
{
  id: 'task-20-3-6',
  title: 'Platform Testing & Refinement',
  progress: 0,
  startDate: '2027-01-09T09:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'task',
  predecessors: ['task-20-3-5'],
  parentId: 'task-20-3'
},
{
  id: 'milestone-20-3',
  title: 'Optimization Platform Complete',
  progress: 0,
  startDate: '2027-01-15T17:00:00',
  endDate: '2027-01-15T17:00:00',
  type: 'milestone',
  predecessors: ['task-20-3'],
  parentId: 'proj-20'
},
{
  id: 'task-20-4',
  title: 'AI Energy Forecasting',
  assignee: 'AI/ML Team',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['milestone-20-2'],
  parentId: 'proj-20'
},
{
  id: 'task-20-4-1',
  title: 'Historical Data Analysis',
  progress: 0,
  startDate: '2026-12-01T09:00:00',
  endDate: '2026-12-12T17:00:00',
  type: 'task',
  parentId: 'task-20-4'
},
{
  id: 'task-20-4-2',
  title: 'Forecasting Model Development',
  progress: 0,
  startDate: '2026-12-13T09:00:00',
  endDate: '2026-12-28T17:00:00',
  type: 'task',
  predecessors: ['task-20-4-1'],
  parentId: 'task-20-4'
},
{
  id: 'task-20-4-3',
  title: 'Model Training & Validation',
  progress: 0,
  startDate: '2026-12-29T09:00:00',
  endDate: '2027-01-12T17:00:00',
  type: 'task',
  predecessors: ['task-20-4-2'],
  parentId: 'task-20-4'
},
{
  id: 'task-20-4-4',
  title: 'Integration with Platform',
  progress: 0,
  startDate: '2027-01-13T09:00:00',
  endDate: '2027-01-25T17:00:00',
  type: 'task',
  predecessors: ['task-20-4-3'],
  parentId: 'task-20-4'
},
{
  id: 'task-20-4-5',
  title: 'Model Optimization',
  progress: 0,
  startDate: '2027-01-26T09:00:00',
  endDate: '2027-02-04T17:00:00',
  type: 'task',
  predecessors: ['task-20-4-4'],
  parentId: 'task-20-4'
},
{
  id: 'task-20-4-6',
  title: 'Testing & Deployment',
  progress: 0,
  startDate: '2027-02-05T09:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'task',
  predecessors: ['task-20-4-5'],
  parentId: 'task-20-4'
},
{
  id: 'milestone-20-4',
  title: 'AI Forecasting Ready',
  progress: 0,
  startDate: '2027-02-10T17:00:00',
  endDate: '2027-02-10T17:00:00',
  type: 'milestone',
  predecessors: ['task-20-4'],
  parentId: 'proj-20'
},
{
  id: 'task-20-5',
  title: 'Deployment & Training',
  assignee: 'DevOps Team',
  progress: 0,
  startDate: '2027-02-11T09:00:00',
  endDate: '2027-03-25T17:00:00',
  type: 'task',
  predecessors: ['milestone-20-3', 'milestone-20-4'],
  parentId: 'proj-20'
},
{
  id: 'task-20-5-1',
  title: 'System Integration',
  progress: 0,
  startDate: '2027-02-11T09:00:00',
  endDate: '2027-02-22T17:00:00',
  type: 'task',
  parentId: 'task-20-5'
},
{
  id: 'task-20-5-2',
  title: 'User Training Program',
  progress: 0,
  startDate: '2027-02-23T09:00:00',
  endDate: '2027-03-01T17:00:00',
  type: 'task',
  predecessors: ['task-20-5-1'],
  parentId: 'task-20-5'
},
{
  id: 'task-20-5-3',
  title: 'Data Migration',
  progress: 0,
  startDate: '2027-03-02T09:00:00',
  endDate: '2027-03-08T17:00:00',
  type: 'task',
  predecessors: ['task-20-5-2'],
  parentId: 'task-20-5'
},
{
  id: 'task-20-5-4',
  title: 'Production Deployment',
  progress: 0,
  startDate: '2027-03-09T09:00:00',
  endDate: '2027-03-14T17:00:00',
  type: 'task',
  predecessors: ['task-20-5-3'],
  parentId: 'task-20-5'
},
{
  id: 'task-20-5-5',
  title: 'Sustainability Reporting',
  progress: 0,
  startDate: '2027-03-15T09:00:00',
  endDate: '2027-03-20T17:00:00',
  type: 'task',
  predecessors: ['task-20-5-4'],
  parentId: 'task-20-5'
},
{
  id: 'task-20-5-6',
  title: 'Go-Live & Monitoring',
  progress: 0,
  startDate: '2027-03-21T09:00:00',
  endDate: '2027-03-25T17:00:00',
  type: 'task',
  predecessors: ['task-20-5-5'],
  parentId: 'task-20-5'
},
{
  id: 'milestone-20-final',
  title: 'Sustainable Energy Platform Live',
  progress: 0,
  startDate: '2027-03-25T17:00:00',
  endDate: '2027-03-25T17:00:00',
  type: 'milestone',
  predecessors: ['task-20-5'],
  parentId: 'proj-20'
}
];
