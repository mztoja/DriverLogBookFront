import { LogEditData } from '../log';

export interface TourEditData {
  id: number;
  tourNr: string;
  startData: LogEditData;
  stopData: LogEditData;
  distance: string;
  fuelStateBefore: string;
  fuelStateAfter: string;
  expectedSalary: string;
  currency: string;
}
