"use client";

import React from "react";
import { ToastProvider } from "@/app/_context/ToastContext";

const ClientToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default ClientToastProvider;
