export const INITIAL_BOOKS = [
  {
    id: 'BK-1001',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    isbn: '978-1449373320',
    category: 'Computer Science',
    shelfLocation: 'CS-A4-02',
    deweyCode: '005.74',
    totalCopies: 8,
    availableCopies: 3,
    publisher: "O'Reilly Media",
    publishYear: 2017,
    rating: 4.9,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    description: 'The definitive guide to the architecture of data systems, covering distributed storage, consistency models, batch/stream processing, and fault tolerance.',
    tags: ['Distributed Systems', 'Databases', 'Big Data', 'Architecture']
  },
  {
    id: 'BK-1002',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    category: 'Computer Science',
    shelfLocation: 'CS-B1-05',
    deweyCode: '005.1',
    totalCopies: 10,
    availableCopies: 6,
    publisher: 'Prentice Hall',
    publishYear: 2008,
    rating: 4.8,
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e37262?auto=format&fit=crop&q=80&w=400',
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Master clean syntax, refactoring, and craftsmanship.',
    tags: ['Software Engineering', 'Best Practices', 'Refactoring']
  },
  {
    id: 'BK-1003',
    title: 'Artificial Intelligence: A Modern Approach (4th Ed)',
    author: 'Stuart Russell & Peter Norvig',
    isbn: '978-0134610993',
    category: 'Artificial Intelligence',
    shelfLocation: 'AI-C2-01',
    deweyCode: '006.3',
    totalCopies: 6,
    availableCopies: 1,
    publisher: 'Pearson',
    publishYear: 2020,
    rating: 4.9,
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    description: 'The standard textbook in artificial intelligence, covering probabilistic reasoning, deep learning, NLP, multi-agent systems, and ethical AI safety.',
    tags: ['AI', 'Machine Learning', 'Search Algorithms', 'Robotics']
  },
  {
    id: 'BK-1004',
    title: 'Introduction to Algorithms (CLRS 4th Ed)',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    isbn: '978-0262046305',
    category: 'Computer Science',
    shelfLocation: 'CS-A1-08',
    deweyCode: '005.13',
    totalCopies: 12,
    availableCopies: 0,
    publisher: 'MIT Press',
    publishYear: 2022,
    rating: 4.9,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    description: 'Comprehensive, rigorous guide to algorithm design, dynamic programming, graph theory, NP-completeness, and randomized algorithms.',
    tags: ['Algorithms', 'Data Structures', 'MIT', 'Graph Theory']
  },
  {
    id: 'BK-1005',
    title: 'Zero to One: Notes on Startups, or How to Build the Future',
    author: 'Peter Thiel & Blake Masters',
    isbn: '978-0804139298',
    category: 'Business & Innovation',
    shelfLocation: 'BI-D3-11',
    deweyCode: '658.11',
    totalCopies: 5,
    availableCopies: 4,
    publisher: 'Crown Business',
    publishYear: 2014,
    rating: 4.7,
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    description: 'The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. Learn monopoly thinking and venture creation.',
    tags: ['Startups', 'Entrepreneurship', 'Venture Capital', 'Economics']
  },
  {
    id: 'BK-1006',
    title: 'Deep Learning with Python (2nd Ed)',
    author: 'François Chollet',
    isbn: '978-1617296864',
    category: 'Artificial Intelligence',
    shelfLocation: 'AI-B3-04',
    deweyCode: '006.31',
    totalCopies: 7,
    availableCopies: 3,
    publisher: 'Manning Publications',
    publishYear: 2021,
    rating: 4.8,
    coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400',
    description: 'Written by the creator of Keras, this book introduces deep learning using Python, covering CNNs, Transformers, Generative AI, and computer vision.',
    tags: ['Deep Learning', 'PyTorch', 'Keras', 'Neural Networks']
  },
  {
    id: 'BK-1007',
    title: 'Principles of Neural Science (6th Ed)',
    author: 'Eric R. Kandel, John D. Koester',
    isbn: '978-1259642234',
    category: 'Medical & Neuroscience',
    shelfLocation: 'MED-N1-03',
    deweyCode: '612.8',
    totalCopies: 4,
    availableCopies: 2,
    publisher: 'McGraw Hill',
    publishYear: 2021,
    rating: 4.9,
    coverUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400',
    description: 'The definitive textbook exploring cellular and molecular biology of neural development, synaptic transmission, sensory processing, and cognition.',
    tags: ['Neuroscience', 'Biology', 'Cognitive Science']
  },
  {
    id: 'BK-1008',
    title: 'Quantum Computation and Quantum Information',
    author: 'Michael A. Nielsen & Isaac L. Chuang',
    isbn: '978-1107002173',
    category: 'Physics & Computing',
    shelfLocation: 'PHY-Q4-07',
    deweyCode: '530.12',
    totalCopies: 5,
    availableCopies: 3,
    publisher: 'Cambridge University Press',
    publishYear: 2010,
    rating: 4.8,
    coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
    description: 'Essential reference for qubits, quantum circuits, Shor’s algorithm, Grover search, quantum error-correction, and quantum cryptography.',
    tags: ['Quantum Computing', 'Physics', 'Cryptography']
  }
];

export const INITIAL_MEMBERS = [
  {
    id: 'MEM-8001',
    name: 'Maya Lin',
    email: 'maya.lin@university.edu',
    role: 'Student',
    department: 'Computer Science',
    studentId: 'CS-2024-089',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    tier: 'Gold Patron',
    maxLoans: 6,
    activeLoansCount: 2,
    finesBalance: 0,
    joinDate: '2023-09-10',
    rfidTag: 'RFID-9844-012'
  },
  {
    id: 'MEM-8002',
    name: 'Dr. Alan Vance',
    email: 'alan.vance@university.edu',
    role: 'Faculty',
    department: 'AI & Data Intelligence',
    studentId: 'FAC-7721',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    tier: 'Faculty Fellow',
    maxLoans: 15,
    activeLoansCount: 3,
    finesBalance: 0,
    joinDate: '2021-01-15',
    rfidTag: 'RFID-9844-089'
  },
  {
    id: 'MEM-8003',
    name: 'Devon Patel',
    email: 'devon.patel@university.edu',
    role: 'Student',
    department: 'Electrical Engineering',
    studentId: 'EE-2023-412',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    tier: 'Silver Patron',
    maxLoans: 4,
    activeLoansCount: 2,
    finesBalance: 4.50,
    joinDate: '2023-08-20',
    rfidTag: 'RFID-9844-331'
  },
  {
    id: 'MEM-8004',
    name: 'Sophia Chen',
    email: 'sophia.chen@university.edu',
    role: 'Researcher',
    department: 'Biotechnology & Medicine',
    studentId: 'RES-4091',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    tier: 'Platinum Scholar',
    maxLoans: 10,
    activeLoansCount: 1,
    finesBalance: 0,
    joinDate: '2022-03-12',
    rfidTag: 'RFID-9844-554'
  },
  {
    id: 'MEM-8005',
    name: 'Lucas Thorne',
    email: 'lucas.t@university.edu',
    role: 'Student',
    department: 'Business & Finance',
    studentId: 'BUS-2025-102',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    tier: 'Standard',
    maxLoans: 3,
    activeLoansCount: 1,
    finesBalance: 8.00,
    joinDate: '2024-01-08',
    rfidTag: 'RFID-9844-771'
  }
];

export const INITIAL_LOANS = [
  {
    id: 'LN-501',
    bookId: 'BK-1004',
    bookTitle: 'Introduction to Algorithms (CLRS 4th Ed)',
    bookCover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    patronId: 'MEM-8003',
    patronName: 'Devon Patel',
    patronEmail: 'devon.patel@university.edu',
    issueDate: '2026-08-01',
    dueDate: '2026-08-15',
    returnDate: null,
    status: 'overdue', // overdue
    fineAmount: 4.50,
    renewCount: 0
  },
  {
    id: 'LN-502',
    bookId: 'BK-1001',
    bookTitle: 'Designing Data-Intensive Applications',
    bookCover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    patronId: 'MEM-8001',
    patronName: 'Maya Lin',
    patronEmail: 'maya.lin@university.edu',
    issueDate: '2026-08-12',
    dueDate: '2026-08-26',
    returnDate: null,
    status: 'active',
    fineAmount: 0,
    renewCount: 1
  },
  {
    id: 'LN-503',
    bookId: 'BK-1003',
    bookTitle: 'Artificial Intelligence: A Modern Approach',
    bookCover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    patronId: 'MEM-8002',
    patronName: 'Dr. Alan Vance',
    patronEmail: 'alan.vance@university.edu',
    issueDate: '2026-08-10',
    dueDate: '2026-08-24',
    returnDate: null,
    status: 'due_soon',
    fineAmount: 0,
    renewCount: 0
  },
  {
    id: 'LN-504',
    bookId: 'BK-1005',
    bookTitle: 'Zero to One: Notes on Startups',
    bookCover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    patronId: 'MEM-8005',
    patronName: 'Lucas Thorne',
    patronEmail: 'lucas.t@university.edu',
    issueDate: '2026-07-28',
    dueDate: '2026-08-11',
    returnDate: null,
    status: 'overdue',
    fineAmount: 8.00,
    renewCount: 0
  },
  {
    id: 'LN-505',
    bookId: 'BK-1002',
    bookTitle: 'Clean Code: Agile Software Craftsmanship',
    bookCover: 'https://images.unsplash.com/photo-1532012164546-f432f2e37262?auto=format&fit=crop&q=80&w=400',
    patronId: 'MEM-8001',
    patronName: 'Maya Lin',
    patronEmail: 'maya.lin@university.edu',
    issueDate: '2026-08-05',
    dueDate: '2026-08-19',
    returnDate: '2026-08-18',
    status: 'returned',
    fineAmount: 0,
    renewCount: 0
  }
];

export const INITIAL_FINES = [
  {
    id: 'FN-901',
    loanId: 'LN-501',
    patronId: 'MEM-8003',
    patronName: 'Devon Patel',
    bookTitle: 'Introduction to Algorithms (CLRS 4th Ed)',
    amount: 4.50,
    reason: '6 Days Overdue ($0.75/day)',
    date: '2026-08-16',
    status: 'pending'
  },
  {
    id: 'FN-902',
    loanId: 'LN-504',
    patronId: 'MEM-8005',
    patronName: 'Lucas Thorne',
    bookTitle: 'Zero to One: Notes on Startups',
    amount: 8.00,
    reason: '10 Days Overdue ($0.80/day)',
    date: '2026-08-12',
    status: 'pending'
  },
  {
    id: 'FN-903',
    loanId: 'LN-489',
    patronId: 'MEM-8004',
    patronName: 'Sophia Chen',
    bookTitle: 'Principles of Neural Science',
    amount: 15.00,
    reason: 'Spine wear damage assessment',
    date: '2026-08-04',
    status: 'paid'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NT-1',
    title: 'High Demand Alert',
    message: 'Introduction to Algorithms has 0 copies available with 4 reservations in queue.',
    timestamp: '10 mins ago',
    type: 'warning',
    read: false
  },
  {
    id: 'NT-2',
    title: 'Overdue Notice Auto-Dispatched',
    message: 'Automated SMS & Email sent to Devon Patel for 6-day overdue textbook.',
    timestamp: '35 mins ago',
    type: 'info',
    read: false
  },
  {
    id: 'NT-3',
    title: 'RFID Batch Check-In Success',
    message: 'Book #BK-1002 checked in at South Terminal Gate 3 in 0.8s.',
    timestamp: '2 hours ago',
    type: 'success',
    read: true
  }
];

export const METRICS_DATA = {
  circulationTrends: [
    { day: 'Mon', loans: 42, returns: 38 },
    { day: 'Tue', loans: 55, returns: 49 },
    { day: 'Wed', loans: 68, returns: 62 },
    { day: 'Thu', loans: 81, returns: 74 },
    { day: 'Fri', loans: 95, returns: 88 },
    { day: 'Sat', loans: 34, returns: 41 },
    { day: 'Sun', loans: 28, returns: 22 }
  ],
  categoryBreakdown: [
    { name: 'Computer Science', count: 38, percentage: 35, color: '#4f46e5' },
    { name: 'AI & Data Science', count: 26, percentage: 24, color: '#06b6d4' },
    { name: 'Business & Econ', count: 18, percentage: 17, color: '#10b981' },
    { name: 'Medicine & Bio', count: 14, percentage: 13, color: '#f59e0b' },
    { name: 'Physics & Math', count: 12, percentage: 11, color: '#8b5cf6' }
  ],
  peakHours: [
    { time: '08:00', patrons: 18 },
    { time: '10:00', patrons: 64 },
    { time: '12:00', patrons: 120 },
    { time: '14:00', patrons: 145 },
    { time: '16:00', patrons: 180 },
    { time: '18:00', patrons: 95 },
    { time: '20:00', patrons: 48 }
  ]
};