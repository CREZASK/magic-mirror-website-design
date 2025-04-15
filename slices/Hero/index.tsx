"use client"; // This is a client component

import { useEffect, useRef } from "react";
import React from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap, { random } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): React.JSX.Element => {
  const component = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      t1.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.5,
          stagger: {
            // makes the letters come out at different times
            each: 0.1,
            from: "random",
          },
        }
      );

      t1.fromTo(
        ".job-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
          ease: "elastic.out(1,0.3)",
        }
      );
    }, component);
    return () => ctx.revert(); // animation cleanup
  }, []); // empty means it only runs once

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="relative h-screen w-full overflow-hidden">
        <Shapes />
        <div className="absolute z-10 flex flex-col items-center py-4 md:py-40 text-center w-full h-full">
          <h1 className="mb-8 text-[clamp(5rem,20vw,38rem)] font-extrabold leading-tight tracking-tighter break-words text-center">
            <span className="block text-slate-300">
              {renderLetters(slice.primary.name, "first")}
            </span>
          </h1>

          <span
            className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text 
            text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0
            md:text-4xl"
          >
            {slice.primary.tagline}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
