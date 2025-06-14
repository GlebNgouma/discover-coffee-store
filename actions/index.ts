"use server";

import { updateCoffeeStore } from "@/lib/airtable";

export type State = {
  id: string;
  voting: number;
};

export async function upvoteAction(
  prevState: State | undefined,
  formData: FormData
): Promise<State | undefined> {
  const id = formData.get("id")?.toString();

  if (!id) return prevState;

  const data = await updateCoffeeStore(id);

  const voting = data?.[0]?.voting ?? 0;

  return { id, voting };
}
