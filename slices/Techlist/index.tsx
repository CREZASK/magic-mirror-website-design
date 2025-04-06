"use client";

import { FC, useEffect, useRef } from "react";
import React from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { MdCircle } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Techlist`.
 */
export type TechlistProps = SliceComponentProps<Content.TechlistSlice>;

/**
 * Component for "Techlist" Slices.
 */
const Techlist: FC<TechlistProps> = ({ slice }) => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 3,
        },
      });

      t1.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        }
      );
    }, component);
    return () => ctx.revert(); // cleanup
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded>
        <Heading size="xl" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      {slice.primary.techs.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || undefined}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: index === 7 && tech_color ? tech_color : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Techlist;
