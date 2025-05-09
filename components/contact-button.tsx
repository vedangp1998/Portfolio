"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/contact-modal";

interface ContactButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function ContactButton({
  className,
  children,
  variant = "default",
  size = "default",
}: ContactButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsModalOpen(true)}
      >
        {children || "Let's Connect"}
      </Button>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
