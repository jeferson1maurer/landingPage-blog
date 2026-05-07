"use client";
import { useEffect } from "react";

export function ErrorComponent() {
  useEffect(() => {
    throw new Error("Componente lançando um erro!");
  }, []);

  return <h2>ErrorComponent</h2>;
}
