import { Question, Survey } from '../interfaces/survey';

export class SurveyModel implements Survey {
  id?: number;
  name: string;
  date: Date;
  category: string;
  describing: string;
  questions: Question[];


  constructor(data: Partial<Survey> = {}) {
    this.id = data.id ?? undefined;
    this.name = data.name ?? '';
    this.date = data.date ?? new Date();
    this.category = data.category ?? '';
    this.describing = data.describing ?? '';
    this.questions = data.questions ?? [];
  }
}
