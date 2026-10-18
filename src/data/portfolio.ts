// ============================================================
// EDIT THIS FILE to update the whole website.
// ============================================================

export type Status = 'completed' | 'in-progress' | 'planned';

export interface Project {
  title: string;
  status: Status;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  pipeline: string[];
  /** Real, measured results only. Keep null until you have them. */
  outcome: string | null;
  /** Screenshot path, e.g. "assets/project1.png" (file goes in public/assets). */
  image?: string;
  github?: string;
  demo?: string;
}

export interface Certificate {
  name: string;
  issuer?: string;
  year?: string;
  tags?: string[];
  /** Certificate image, e.g. "assets/cert-java.png" (file goes in public/assets). */
  image?: string;
  link?: string;
}
export interface Achievement { title: string; detail: string }

/** Empty values hide the related link or disable the related feature. */
const DEFAULT_CONFIG = {
  email: 'mynamekrishna.19.com@gmail.com',
  phone: '+91 8439691221',
  github: 'https://github.com/krishna-rawat14',
  linkedin: 'https://www.linkedin.com/in/krishna-rawat-95205a3a9',
  /** e.g. "assets/resume.pdf" (file goes in public/assets) */
  resume: 'assets/Krishna_Rawat_Resume.pdf',
  /** e.g. a Formspree URL. Leave empty to use the visitor's email app instead. */
  formEndpoint: '',
  /** e.g. "assets/photo.jpg" */
  photo: 'assets/photo.jpg',
};

const DEFAULT_LOCATION = 'Rishikesh, Dehradun, Uttarakhand, India';
const DEFAULT_STATUS_LABEL: Record<Status, string>  = { completed: 'Completed', 'in-progress': 'In progress', planned: 'Planned' };

const DEFAULT_ROLES = ['web products people use', 'practical AI-powered solutions', 'machine-learning models', 'intelligent automation'];
const DEFAULT_MARQUEE = ['PYTHON', 'JAVA', 'REACT', 'NODE.JS', 'ROBOTICS', 'AI/ML'];
const DEFAULT_TARGET_ROLES = ['Software Development Intern', 'AI/ML Intern', 'Full-Stack Web Development Intern', 'AI Engineer Intern'];

const DEFAULT_EDUCATION = {
  school: 'DIT University, Dehradun',
  degree: 'B.Tech, Computer Science and Engineering',
  specialization: 'Specialization: Artificial Intelligence, Machine Learning and Robotics',
  period: 'Second year | Expected graduation 2029',
};

const DEFAULT_SCHOOLS = [
  { name: 'SBM Public School', level: 'Class 12', year: '2025' },
  { name: 'H.H.M School', level: 'Class 10', year: '2023' },
];

const DEFAULT_ABOUT = [
  'I am a second-year B.Tech CSE student specializing in Artificial Intelligence, Machine Learning, and Robotics at DIT University, Dehradun. I enjoy developing websites, exploring AI-powered applications, and finding practical ways to use technology to solve real-world problems.',
  'My goal is to strengthen my engineering skills, build impactful projects, and grow into a software developer and AI/ML engineer.',
];

const DEFAULT_SUMMARY =
  'Second-year B.Tech CSE student specializing in Artificial Intelligence, Machine Learning and Robotics at DIT University, with hands-on web development experience at Indian Drug Distributors. Seeking software development, AI/ML and full-stack web development internships.';

const DEFAULT_EXPERIENCE = [
  {
    role: 'Web Developer and Software Tech Manager',
    org: 'Indian Drug Distributors | IT and Online Operations',
    period: '10 Aug 2026 – Present',
    points: [
      'Developing and improving the company’s website and online presence.',
      'Working on web development using modern web technologies, including TypeScript and Node.js.',
      'Exploring software solutions to improve pharmaceutical distribution workflows.',
      'Researching ERP integration possibilities with AI automations.',
      'Exploring business automation features such as AI-powered calling, voice-based ordering and automated payment reminders.',
    ],
  },
  {
    role: 'IT and Finance Intern',
    org: 'Amirav Pharma Pvt. Ltd.',
    period: '05 May 2026 – 01 Sep 2026',
    points: [
      'Assisted with financial record-keeping, invoice processing and transaction documentation.',
      'Supported billing operations and maintained accurate financial and business records.',
      'Worked with business software and digital tools to support day-to-day IT and finance operations.',
      'Assisted in organizing financial data and verifying transaction details.',
      'Supported administrative workflows and helped maintain efficient coordination between IT and finance activities.',
    ],
  },
  {
     role: 'Technology Job Simulation',
    org: 'Deloitte Australia',
    period: '18 oct 2026',
    points: [
      ' Completed a job simulation involving development and codinng.',
      'Wrote a proposal for creating a dashboard. ',
      
    ],




  }
];

const DEFAULT_SKILLS: Record<string, string[]>  = {
  Languages: ['C', 'C++', 'Java', 'JavaScript', 'Python'],
  Web: ['React', 'TypeScript', 'Node.js', 'HTML', 'CSS'],
  Tools: ['Visual Studio Code', 'Git', 'GitHub', 'ERPNext (research)'],
};

/** Shown separately and not counted in the stats. */
const DEFAULT_LEARNING = ['AI/ML fundamentals', 'NumPy', 'Pandas', 'scikit-learn', 'PyTorch'];

const DEFAULT_CERTIFICATES: Certificate[]  = [
  {
  name: 'Deloitte Technology Job Simulation',
  issuer: 'Deloitte via Forage',
  year: 'October 2026',
  tags: [
    'Deloitte',
    'Forage',
    'Technology Job Simulation',
    'Coding',
    'Development',
    'Problem Solving',
    'Professional Development'
  ],
  image: 'certificates/deloitte-certificate.png',
},
  { name: 'Introduction to Software Engineering Job Simulation', issuer: 'Commonwealth Bank / Forage', year: 'October 2026', tags: ['Software engineering', 'Job simulation'], 
    image: 'certificates/software-engineering-certificate.png',
  },
  { name: 'Java Bootcamp', issuer: 'LetsUpgrade', year: 'June 2026', tags: ['Java'],
    image: 'certificates/javabootcamp-certificate.jpg',
   },
  { name: 'C++ Bootcamp', issuer: 'LetsUpgrade', year: 'April 2026', tags: ['C++'],
    image: 'certificates/letsupgrade-certificate.jpg',
   },
  { name: 'SOAR – AI to be Aware', issuer: 'Microsoft', year: 'January 2026', tags: ['AI awareness'],
      image: 'certificates/microsoft-certificate.jpg',
   },
  { name: 'Basics of JavaScript Programming', issuer: 'OpenWeaver', year: 'July 2023', tags: ['JavaScript'],
      image: 'certificates/openweaver-certificate.jpg',
   },
];

const DEFAULT_ACHIEVEMENTS: Achievement[]  = [
  { title: '3rd Place, Techski’s Castle', detail: 'Youthopia 2025, DIT University. Participated as part of the Shadow Hunters team.' },
  { title: 'The Quiet Power Quiz', detail: 'Participation Certificate, Mahindra Group, February 2026.' },
];

const DEFAULT_PROJECTS: Project[]  = [
  {
    title: 'Indian Drug Distributors Website',
    status: 'in-progress',
    summary: 'A business website to establish an online presence for a pharmaceutical wholesale distributor serving the Dehradun and Rishikesh region.',
    problem: 'Helps the business establish a professional online presence and makes it easier for potential customers to discover its services.',
    approach: 'Website development, business information architecture, UI design and local SEO planning.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    pipeline: ['Requirements', 'UI design', 'Build', 'Local SEO'],
    outcome: null,
    image: 'projects/indiandrugdistributors-projects.png'
  },
  {
    title: 'Online Shopping System',
    status: 'completed',
    summary: 'A Java web application that provides an online shopping experience through a product browsing and shopping interface (university project).',
    problem: 'Demonstrates the core functionality of an e-commerce platform, letting users interact with products through a web-based system.',
    approach: 'Built with JSP for dynamic pages and Servlets for server-side request handling, and configured to run on Apache Tomcat.',
    stack: ['Java', 'JSP', 'Servlets', 'Apache Tomcat', 'HTML', 'CSS', 'JavaScript'],
    pipeline: ['Browse', 'Servlets', 'JSP pages', 'Tomcat'],
    outcome: 'Completed as a university project and run locally on Apache Tomcat.',
  },
  {
    title: 'Personal AI/ML Developer Portfolio',
    status: 'completed',
    summary: 'A responsive developer portfolio showcasing technical skills, projects, experience and career goals.',
    problem: 'Presents my work professionally to recruiters and demonstrates my development skills.',
    approach: 'Component-based frontend, responsive design, animated interactions and structured project case studies.',
    stack: ['React', 'TypeScript', 'Vite'],
    pipeline: ['Design', 'Build', 'Test', 'Publish'],
    outcome: null,

    image: 'projects/portfolio-projects.png',
  },
];


// Browser-local editor overrides. For public changes, edit DEFAULT_* values and redeploy.
const CONTENT_STORAGE_KEY = 'krishna_portfolio_content_v1';
type EditableContent = {
  CONFIG: typeof DEFAULT_CONFIG; LOCATION: typeof DEFAULT_LOCATION;
  STATUS_LABEL: typeof DEFAULT_STATUS_LABEL; ROLES: typeof DEFAULT_ROLES;
  MARQUEE: typeof DEFAULT_MARQUEE; TARGET_ROLES: typeof DEFAULT_TARGET_ROLES;
  EDUCATION: typeof DEFAULT_EDUCATION; SCHOOLS: typeof DEFAULT_SCHOOLS;
  ABOUT: typeof DEFAULT_ABOUT; SUMMARY: typeof DEFAULT_SUMMARY;
  EXPERIENCE: typeof DEFAULT_EXPERIENCE; SKILLS: typeof DEFAULT_SKILLS;
  LEARNING: typeof DEFAULT_LEARNING; CERTIFICATES: typeof DEFAULT_CERTIFICATES;
  ACHIEVEMENTS: typeof DEFAULT_ACHIEVEMENTS; PROJECTS: typeof DEFAULT_PROJECTS;
};
function readOverrides(): Partial<EditableContent> {
  try {
    const raw = window.localStorage.getItem(CONTENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) as Partial<EditableContent> : {};
  } catch { return {}; }
}
const OVERRIDES: Partial<EditableContent> = typeof window === 'undefined' ? {} : readOverrides();
export function getEditableContent(): EditableContent {
  return { CONFIG, LOCATION, STATUS_LABEL, ROLES, MARQUEE, TARGET_ROLES, EDUCATION, SCHOOLS, ABOUT, SUMMARY, EXPERIENCE, SKILLS, LEARNING, CERTIFICATES, ACHIEVEMENTS, PROJECTS };
}
export function saveEditableContent(content: Partial<EditableContent>) {
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
}
export function resetEditableContent() { window.localStorage.removeItem(CONTENT_STORAGE_KEY); }
export const CONFIG = (OVERRIDES.CONFIG ?? DEFAULT_CONFIG) as typeof DEFAULT_CONFIG;
export const LOCATION = (OVERRIDES.LOCATION ?? DEFAULT_LOCATION) as typeof DEFAULT_LOCATION;
export const STATUS_LABEL = (OVERRIDES.STATUS_LABEL ?? DEFAULT_STATUS_LABEL) as typeof DEFAULT_STATUS_LABEL;
export const ROLES = (OVERRIDES.ROLES ?? DEFAULT_ROLES) as typeof DEFAULT_ROLES;
export const MARQUEE = (OVERRIDES.MARQUEE ?? DEFAULT_MARQUEE) as typeof DEFAULT_MARQUEE;
export const TARGET_ROLES = (OVERRIDES.TARGET_ROLES ?? DEFAULT_TARGET_ROLES) as typeof DEFAULT_TARGET_ROLES;
export const EDUCATION = (OVERRIDES.EDUCATION ?? DEFAULT_EDUCATION) as typeof DEFAULT_EDUCATION;
export const SCHOOLS = (OVERRIDES.SCHOOLS ?? DEFAULT_SCHOOLS) as typeof DEFAULT_SCHOOLS;
export const ABOUT = (OVERRIDES.ABOUT ?? DEFAULT_ABOUT) as typeof DEFAULT_ABOUT;
export const SUMMARY = (OVERRIDES.SUMMARY ?? DEFAULT_SUMMARY) as typeof DEFAULT_SUMMARY;
export const EXPERIENCE = (OVERRIDES.EXPERIENCE ?? DEFAULT_EXPERIENCE) as typeof DEFAULT_EXPERIENCE;
export const SKILLS = (OVERRIDES.SKILLS ?? DEFAULT_SKILLS) as typeof DEFAULT_SKILLS;
export const LEARNING = (OVERRIDES.LEARNING ?? DEFAULT_LEARNING) as typeof DEFAULT_LEARNING;
export const CERTIFICATES = (OVERRIDES.CERTIFICATES ?? DEFAULT_CERTIFICATES) as typeof DEFAULT_CERTIFICATES;
export const ACHIEVEMENTS = (OVERRIDES.ACHIEVEMENTS ?? DEFAULT_ACHIEVEMENTS) as typeof DEFAULT_ACHIEVEMENTS;
export const PROJECTS = (OVERRIDES.PROJECTS ?? DEFAULT_PROJECTS) as typeof DEFAULT_PROJECTS;
