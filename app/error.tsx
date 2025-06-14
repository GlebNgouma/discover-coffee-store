"use client"; // Error boundaries must be Client Components

import { Button } from "@radix-ui/themes";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Oups! qQuelque chose s&apos;est mal passée.</h2>
      <p>Vous devez configurez les variables d&apos;environnement</p>
      <Button onClick={() => reset()}>Réessayer</Button>
    </div>
  );
}
