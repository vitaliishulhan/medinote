export interface Medicine {
  id: string;
  name: string;
  activeFluid: string;
  dosage: string;
  note: string;
}

export type TErrors<I extends object> = Partial<Record<keyof I, string>>;