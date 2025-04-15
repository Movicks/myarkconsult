export type JobCategory = 'Leadership' | 'Consulting' | 'Customer Support' | 'Technology' | 'Sales & Marketing' | 'Administrative';

export const jobListings = [
  {
    id: '1',
    title: 'Senior CX Consultant',
    department: 'Consulting',
    location: 'New York, NY',
    type: 'Full-time' as const,
    category: 'Consulting' as JobCategory,
    description: 'Lead customer experience transformation projects for enterprise clients.',
    responsibilities: [
      'Develop comprehensive CX strategies for clients',
      'Lead assessments of contact center operations',
      'Identify opportunities for improvement in client BPO operations',
      'Present findings and recommendations to executive stakeholders'
    ],
    requirements: [
      'Bachelor\'s degree in Business, Economics or related field',
      '5+ years of experience in customer experience consulting',
      'Excellent communication and presentation skills',
      'Strong analytical and problem-solving abilities'
    ],
    postDate: '2025-03-01',
  },
  {
    id: '2',
    title: 'Contact Center Technology Specialist',
    department: 'Technology',
    location: 'Remote',
    type: 'Full-time' as const,
    category: 'Technology' as JobCategory,
    description: 'Configure and optimize contact center software solutions for clients.',
    responsibilities: [
      'Implement and configure contact center platforms',
      'Develop technical specifications based on client requirements',
      'Train client staff on new technologies',
      'Provide technical support for deployed solutions'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science, IT or related field',
      '3+ years of experience with contact center technologies',
      'Certification in major CCaaS platforms (e.g., Genesys, NICE, Five9)',
      'Strong technical troubleshooting skills'
    ],
    postDate: '2025-03-15',
  },
  {
    id: '3',
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'Chicago, IL',
    type: 'Full-time' as const,
    category: 'Sales & Marketing' as JobCategory,
    description: 'Drive new business growth through strategic prospecting and relationship building.',
    responsibilities: [
      'Identify and pursue new business opportunities',
      'Develop proposals and presentations for prospective clients',
      'Negotiate contracts and service agreements',
      'Maintain relationships with key accounts'
    ],
    requirements: [
      'Bachelor\'s degree in Business, Marketing or related field',
      '5+ years of B2B sales experience, preferably in consulting',
      'Strong network in the BPO or contact center industry',
      'Excellent negotiation and closing skills'
    ],
    postDate: '2025-02-15',
  },
  {
    id: '4',
    title: 'Customer Experience Analyst',
    department: 'Consulting',
    location: 'Remote',
    type: 'Contract' as const,
    category: 'Consulting' as JobCategory,
    description: 'Analyze customer data and provide insights to improve CX strategies.',
    responsibilities: [
      'Gather and analyze customer feedback data',
      'Identify patterns and trends in customer behavior',
      'Develop metrics and KPIs for measuring CX impact',
      'Create reports and presentations of findings'
    ],
    requirements: [
      'Bachelor\'s degree in Business Analytics, Statistics or related field',
      '2+ years of experience in data analysis',
      'Proficiency in data visualization tools',
      'Strong analytical thinking and problem-solving skills'
    ],
    postDate: '2025-04-01',
  },
  {
    id: '5',
    title: 'Operations Director',
    department: 'Operations',
    location: 'Dallas, TX',
    type: 'Full-time' as const,
    category: 'Leadership' as JobCategory,
    description: 'Lead the operational excellence of our consulting services.',
    responsibilities: [
      'Oversee the delivery of consulting services',
      'Manage project timelines and resource allocation',
      'Ensure quality standards are met for all deliverables',
      'Drive continuous improvement in service delivery processes'
    ],
    requirements: [
      'Bachelor\'s degree in Business, Operations Management or related field',
      '10+ years of experience in operations management',
      'Proven track record of leading successful service delivery teams',
      'Strong leadership and team management skills'
    ],
    postDate: '2025-03-10',
  },
  {
    id: '6',
    title: 'Executive Assistant',
    department: 'Administrative',
    location: 'New York, NY',
    type: 'Part-time' as const,
    category: 'Administrative' as JobCategory,
    description: 'Provide administrative support to the executive team.',
    responsibilities: [
      'Manage executives\' calendars and schedule meetings',
      'Organize travel arrangements and prepare expense reports',
      'Draft correspondence and presentations',
      'Coordinate internal and external events'
    ],
    requirements: [
      'Associate\'s degree or equivalent experience',
      '3+ years of experience as an executive assistant',
      'Excellent organizational and time management skills',
      'Proficiency in Microsoft Office and project management tools'
    ],
    postDate: '2025-04-05',
  },
];