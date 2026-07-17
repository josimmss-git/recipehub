"use client";

import { Button } from "@heroui/react";
import React from "react";

const UpgradePremiumButton = ({ updateTopremium, isLoading = false }) => {
  return (
    <Button
      onClick={updateTopremium}
      isDisabled={isLoading}
      isLoading={isLoading}
      className="bg-yellow-500 text-slate-950 font-bold"
      radius="lg"
    >
      {isLoading ? "Redirecting..." : "Upgrade Now"}
    </Button>
  );
};

export default UpgradePremiumButton;