"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `Welcome to Norsk Fotballdraktmuseum`;

export default function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
