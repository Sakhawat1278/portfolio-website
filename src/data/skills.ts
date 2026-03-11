export interface SkillGroup {
    category: string;
    skills: {
        name: string;
        level: number; // 0 to 100
        description: string;
        subSkills: string[];
    }[];
}

export const skillGroups: SkillGroup[] = [
    {
        category: 'Raw Code & Core Systems',
        skills: [
            {
                name: 'C / C++ / Python',
                level: 95,
                description: 'Foundational systems engineering as a Raw Code Website Developer. Deep understanding of memory architecture and algorithmic logic.',
                subSkills: ['Data Structures', 'Algorithms', 'Raw Code Dev', 'Pointers']
            },
            {
                name: 'Android App Developer',
                level: 92,
                description: 'Expert Android App Developer crafting scalable backend systems and high-fidelity native mobile architectures using Java and modern frameworks.',
                subSkills: ['Java', 'Multithreading', 'Kotlin', 'Jetpack Compose']
            },
            {
                name: 'Tech Explorer Foundation',
                level: 100,
                description: 'A Quick Learner and Tech Explorer with a solid BSc CSE foundation from Daffodil International University.',
                subSkills: ['Operating Systems', 'Compiler Design', 'DBMS', 'Automata']
            }
        ]
    },
    {
        category: 'Web & Plugin Engineering',
        skills: [
            {
                name: 'WordPress Expert Deeply',
                level: 96,
                description: 'True WordPress Expert and Plugin Developer architecting complex custom plugins and performance-driven, SEO-friendly WP engines.',
                subSkills: ['Plugin Developer', 'PHP 8.x', 'Action/Filter Hooks', 'WooCommerce']
            },
            {
                name: 'React Ecosystem',
                level: 98,
                description: 'Building immersive web platforms with high-concept motion logic.',
                subSkills: ['Next.js', 'Framer Motion', 'TypeScript', 'Redux/Toolkit']
            },
            {
                name: 'Industrial Fullstack',
                level: 90,
                description: 'Developing end-to-end applications with secure and scalable backends.',
                subSkills: ['Node.js', 'Supabase', 'PostgreSQL', 'Auth Architecture']
            }
        ]
    },
    {
        category: 'Cognitive & Creative Stack',
        skills: [
            {
                name: 'Creative Thinker',
                level: 94,
                description: 'A Creative Thinker orchestrating frontier AI models to push the boundaries of design, user experience, and interactive architecture.',
                subSkills: ['Claude 3.5 Sonnet', 'GPT-4o', 'Problem Solving', 'Innovation']
            },
            {
                name: 'Quick Learner Workflow',
                level: 92,
                description: 'As a passionate Tech Explorer, I rapidly adapt to new agentic frameworks and local LLM ecosystems.',
                subSkills: ['Continuous Learning', 'Ollama', 'Agentic Coding', 'Agile']
            },
            {
                name: 'Gamer & Strategist',
                level: 88,
                description: 'A Gamer at heart. Competitive gaming strategy fuels my logical blueprinting and high-performance digital product crafting.',
                subSkills: ['Strategic Planning', 'Game Logic', 'UI/UX Manifesto', 'Figma']
            }
        ]
    }
];
