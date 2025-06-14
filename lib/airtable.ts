import { CoffeeStoreType } from "@/types";
import Airtable, { FieldSet, Record as AirtableRecord } from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  "appnu2pjDBj0wdw9F"
);

const table = base("coffee-stores");

const getMinifiedRecords = (records: AirtableRecord<FieldSet>[]) => {
  return records.map((record) => {
    return {
      recordId: record.id,
      ...(record.fields as CoffeeStoreType), // cast si nécessaire
    };
  });
};

//Find
const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords([...findRecords]);
};

export const createCoffeeStore = async (
  coffeeStore: CoffeeStoreType,
  id: string
) => {
  const { name, address, imgUrl, voting = 0 } = coffeeStore;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length === 0) {
        //create a new record
        const createdRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              imgUrl,
              voting,
            },
          },
        ]);
        if (createdRecords.length > 0) {
          console.log("Coffee store created successfully", id);
          return getMinifiedRecords([...createdRecords]);
        }
      } else {
        console.log("Coffee store already exists");
        return records;
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (error) {
    console.error("Error creating coffee store:", error);
  }
};

export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        const record = records[0];
        const updatedVoting = record.voting + 1;
        console.log("recordId:", record.recordId);

        //create a new record
        const updateRecords = await table.update([
          {
            id: record.recordId,
            fields: {
              voting: updatedVoting,
            },
          },
        ]);
        if (updateRecords.length > 0) {
          console.log("Coffee store created successfully", id);
          return getMinifiedRecords([...updateRecords]);
        }
      } else {
        console.log("Coffee store does not exists");
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (error) {
    console.error("Erreur de la mise à jour du café :", error);
  }
};
