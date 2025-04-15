import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Editor`.
 */
export type EditorProps = SliceComponentProps<Content.EditorSlice>;

/**
 * Component for "Editor" Slices.
 */
const Editor: FC<EditorProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for editor (variation: {slice.variation}) Slices
    </section>
  );
};

export default Editor;
