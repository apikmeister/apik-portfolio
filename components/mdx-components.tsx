import Image from "next/image";

const img = ({ src, alt, title }: React.HTMLProps<HTMLImageElement>) => {
  return (
    <figure className="flex h-fit w-fit flex-col kg-card" aria-label={alt}>
      <Image src={src || ""} alt={alt!} />
      {title && <figcaption className="text-center">{title}</figcaption>}
    </figure>
  );
};

const p = (props: React.HTMLProps<HTMLParagraphElement>) => {
  return <div className="my-6" {...props} />;
};

export const MDXComponents = { img, p };
