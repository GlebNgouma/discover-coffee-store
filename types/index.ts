export type CoffeeStoreType = {
  id: string;
  name: string;
  imgUrl: string;
  address: string;
  voting: number;
};

export type MapBoxType = {
  id: string;
  properties: {
    full_address: string;
    name: string;
  };
};

export type AirtableRecordType = {
  id: string;
  recordId: string;
  fields: CoffeeStoreType;
};

export type ServerParamsType = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
};
