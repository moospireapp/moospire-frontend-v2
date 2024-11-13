import React, { Suspense } from "react";
import { OAuthVerify } from "@/app/_components";

const OAuthVerifyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthVerify />
    </Suspense>
  );
};

export default OAuthVerifyPage;
