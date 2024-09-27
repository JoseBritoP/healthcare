import React from "react";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/types";
import Image from "next/image";

export default function SubmitButton({
  children,
  isLoading,
  className,
}: ButtonProps) {
  return (
    <Button
      className={className ?? "shad-primary-btn w-full"}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
