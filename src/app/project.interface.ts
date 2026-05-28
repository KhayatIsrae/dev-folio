//interface structure dun projet
export interface Project {
    id: number;
    title: string;
    description: string;
    status: 'draft' | 'private' | 'public';
    technologies : string[];
    source: string | null;
}