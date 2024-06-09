"use client";

import { Button } from "@/components/ui/button";
import { DatabaseZap, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import { useGlobalContext } from "../context/globalContext";

function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();

  return (
    <div className="w-full py-4 flex flex-col items-center">
      <div className="left flex w-full items-center justify-between">
        <Button 
          className="flex items-center gap-2 font-medium"
          onClick={() => {
            router.push("/pages/dataset");
          }}
        >
          <DatabaseZap size={16} />
          All Data
        </Button>
        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
          <Button
            className="source-code flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com");
            }}
          >
            <Github size={15} />
            Source Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
