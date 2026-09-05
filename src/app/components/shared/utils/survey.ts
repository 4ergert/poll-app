import { Survey } from '../interfaces/survey';

export function getEndingSoonSurveys(surveys: Survey[], limit = 3): Survey[] {
  return [...surveys]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}
