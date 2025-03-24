import { FC } from "react";
import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const component = useRef(null)

  useEffect(()=>{
    let ctx = gsap.context(()=>{

    }, component)
    return () => ctx.revert(); // animation cleanup  
    }, []) // empty means it only runs once


  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter,index) => (
      <span 
      key={index} 
      className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    ));
  }



  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center" >
        <div className="col-start-1 md:row-start-1">
          <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter" 
          aria-label={
            slice.primary.name + " " + slice.primary.second_name
            }>

           <span className="block text-slate-300">
            {renderLetters(slice.primary.name, "first")}</span>

           <span className="-mt-[.2em] block text-slate-500">
            {renderLetters(slice.primary.second_name, "last")}</span>

           <span className="block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text 
           text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-100 
           md:text-4xl">
            {slice.primary.tagline}</span>

          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
