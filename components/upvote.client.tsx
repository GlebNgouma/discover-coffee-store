"use client";

import { Button, Spinner } from "@radix-ui/themes";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import React from "react";
import { upvoteAction } from "@/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="bg-purple-950"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? <Spinner className="m-auto" /> : "Voter pour !"}
    </Button>
  );
};

export default function Upvote({ voting, id }: { voting: number; id: string }) {
  const initialState = {
    id,
    voting,
  };

  const [state, dispatch] = React.useActionState(upvoteAction, initialState);

  return (
    <form action={dispatch}>
      {/* Le champ caché qui envoie l'ID */}
      <input type="hidden" name="id" value={id} />

      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{state?.voting ?? voting}</p>
      </div>
      <SubmitButton />
    </form>
  );
}
