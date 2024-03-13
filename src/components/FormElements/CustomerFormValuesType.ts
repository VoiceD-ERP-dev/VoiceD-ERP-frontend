// CustomerFormValuesType.ts

export type CustomerFormValuesType = {
    [x: string]: any;
    firstName: string;
    lastName: string;
    nicNo: string;
    brid: string;
    email: string;
    otp: string;
    address: string;
    contact: string;
    package: string;
    payment: string;
    nicDoc: File | null;
    brDoc: File | null;
  };
  