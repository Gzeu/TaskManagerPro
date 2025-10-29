import { RRule, Frequency } from 'rrule';
import { RecurrenceSettings, RecurrenceType } from '@types/index';

export const createRRule = (settings: RecurrenceSettings, startDate: Date): RRule => {
  const { type, interval, daysOfWeek, endDate } = settings;

  let freq: Frequency;
  switch (type) {
    case RecurrenceType.DAILY:
      freq = RRule.DAILY;
      break;
    case RecurrenceType.WEEKLY:
      freq = RRule.WEEKLY;
      break;
    case RecurrenceType.MONTHLY:
      freq = RRule.MONTHLY;
      break;
    case RecurrenceType.YEARLY:
      freq = RRule.YEARLY;
      break;
    default:
      throw new Error('Invalid recurrence type');
  }

  const ruleOptions: any = {
    freq,
    interval: interval || 1,
    dtstart: startDate,
  };

  if (endDate) {
    ruleOptions.until = endDate;
  }

  if (daysOfWeek && daysOfWeek.length > 0) {
    ruleOptions.byweekday = daysOfWeek;
  }

  return new RRule(ruleOptions);
};

export const getNextOccurrence = (rruleString: string, after?: Date): Date | null => {
  try {
    const rule = RRule.fromString(rruleString);
    const nextDate = rule.after(after || new Date(), true);
    return nextDate;
  } catch (error) {
    console.error('Error getting next occurrence:', error);
    return null;
  }
};

export const getOccurrencesBetween = (
  rruleString: string,
  start: Date,
  end: Date,
): Date[] => {
  try {
    const rule = RRule.fromString(rruleString);
    return rule.between(start, end, true);
  } catch (error) {
    console.error('Error getting occurrences:', error);
    return [];
  }
};

export const formatRecurrence = (settings: RecurrenceSettings): string => {
  const { type, interval } = settings;

  if (type === RecurrenceType.NONE) {
    return 'Does not repeat';
  }

  const intervalText = interval > 1 ? `Every ${interval} ` : 'Every ';

  switch (type) {
    case RecurrenceType.DAILY:
      return `${intervalText}day${interval > 1 ? 's' : ''}`;
    case RecurrenceType.WEEKLY:
      return `${intervalText}week${interval > 1 ? 's' : ''}`;
    case RecurrenceType.MONTHLY:
      return `${intervalText}month${interval > 1 ? 's' : ''}`;
    case RecurrenceType.YEARLY:
      return `${intervalText}year${interval > 1 ? 's' : ''}`;
    default:
      return 'Custom recurrence';
  }
};
