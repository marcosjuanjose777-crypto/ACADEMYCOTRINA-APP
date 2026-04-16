
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  type: 'multiple-choice' | 'true-false';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  icon: string;
  color: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: number;
  completed: boolean;
  type: 'stars' | 'lessons' | 'trophies' | 'streak';
}

export interface UserStats {
  name: string;
  avatar: string;
  stars: number;
  trophies: number;
  streak: number;
  completedLessons: string[];
  lastActive: string;
  dailyChallengeCompletedAt?: string;
  goals: Goal[];
}
