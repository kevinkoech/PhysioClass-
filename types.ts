
export enum Language {
  English = 'English',
  Spanish = 'Spanish',
  French = 'French',
  German = 'German',
  Japanese = 'Japanese',
  Mandarin = 'Mandarin',
  Italian = 'Italian',
  Portuguese = 'Portuguese'
}

export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface QuestionAnswer {
  question: string;
  answer: string;
  explanation: string;
}

export interface FaultEntry {
  fault: string;
  cause: string;
  remedy: string;
}

export interface StudyContent {
  overview: string;
  types: string[];
  blockDiagram: string;
  circuitDescription: string;
  workingPrinciple: string;
  partsAndFunctions: { part: string; function: string }[];
  maintenance: string[];
  faultDiagnosis: FaultEntry[];
  calibration: string;
  shortAnswer: QuestionAnswer[];
  longAnswer: QuestionAnswer[];
}

export interface SessionConfig {
  language: Language;
  difficulty: Difficulty;
  topic?: string;
}
