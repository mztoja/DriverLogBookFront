import { LogEditData } from '../log';

export interface LoadEditData {
  id: number;
  loadNr: string;
  loadingLogData: LogEditData;
  unloadingLogData: LogEditData;
  vehicle: string;
  senderId: string;
  receiverId: string;
  description: string;
  quantity: string;
  weight: string;
  reference: string;
  distance: string;
}
