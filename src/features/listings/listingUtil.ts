import { RentingPeriod } from './listingtypes';

export const getPeriodDisplayName = (
  period: RentingPeriod | undefined
): string => {
  switch (period) {
    case RentingPeriod.DAY:
      return 'day';
    case RentingPeriod.WEEK:
      return 'week';
    case RentingPeriod.MONTH:
    default:
      return 'month';
  }
};
