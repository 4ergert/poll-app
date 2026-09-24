import { Question, Survey } from '../interfaces/survey';

/** Concrete survey model with defaults for omitted fields. */
export class SurveyModel implements Survey {
  id?: number;
  name: string;
  date: Date;
  category: string;
  describing: string;
  questions: Question[];


  /**
   * Creates a survey model from partial survey data.
   *
   * @param data - Survey values to apply over the model defaults.
   */
  constructor(data: Partial<Survey> = {}) {
    this.id = data.id ?? undefined;
    this.name = data.name ?? '';
    this.date = data.date ?? new Date();
    this.category = data.category ?? '';
    this.describing = data.describing ?? '';
    this.questions = data.questions ?? [];
  }
}
