import MainButton from "@/components/ui/MainButton";
import Image, { type ImageProps } from "next/image";
import { CirclePlay } from "lucide-react";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
