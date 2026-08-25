"use client";

import { useState } from "react";

import Loading from "../components/00_LoadingPage/00_Loading";
import Intro from "../components/01_Intro";

export default function Page() {

  const [loadingComplete, setLoadingComplete] =
    useState(false);

  return (
    <main>

      {!loadingComplete && (
        <Loading
          onComplete={() => {
            setLoadingComplete(true);
          }}
        />
      )}

      {loadingComplete && (
        <Intro />
      )}

    </main>
  );
}