import { Survey } from '../interfaces/survey';
import { isSurveyActive } from './date';

/** Returns up to `limit` active surveys ordered by their nearest end date. */
export function getEndingSoonSurveys(surveys: Survey[], limit = 3): Survey[] {
  return [...surveys]
    .filter((survey) => isSurveyActive(survey.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}
