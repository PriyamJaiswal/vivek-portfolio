"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Film } from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <GlassmorphismCard className="max-w-md w-full p-8 sm:p-10 border-orange-500/20">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mx-auto flex items-center justify-center mb-6">
          <Film size={32} />
        </div>
        <span className="text-xs uppercase font-mono tracking-widest text-orange-400 font-semibold mb-2 block">
          404 Error
        </span>
        <h1 className="text-3xl font-black text-white mb-3 tracking-tight">
          Frame Not Found
        </h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          The cut or timeline you are searching for does not exist or has been relocated.
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full px-6 shadow-lg shadow-orange-950/40 cursor-pointer"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Link>
        </Button>
      </GlassmorphismCard>
    </main>
  );
}
