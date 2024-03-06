import { useMDXComponent } from 'next-contentlayer/hooks';
import { FC } from 'react';
import { MDXComponents } from './mdx-components';

interface IProps {
    code: string
}

const MDXContent: FC<IProps> = ({ code }) => {
    const MDX = useMDXComponent(code);
    return <MDX components={MDXComponents} code={code} />;
};

export default MDXContent;

// "use client"; // This is required!

// import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

// type MdxContentProps = {
//   source: MDXRemoteSerializeResult;
// };

// /** Place your custom MDX components here */
// const MdxComponents = {
//   /** h1 colored in yellow */
//   h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
//     <h1 style={{ color: "#FFF676" }} {...props} />
//   ),
//   /** Card component */
//   Card: (props: React.HTMLProps<HTMLDivElement>) => (
//     <div
//       style={{
//         background: "#333",
//         borderRadius: "0.25rem",
//         padding: "0.5rem 1rem",
//       }}
//       {...props}
//     />
//   ),
// };

// export function MdxContent({ source }: MdxContentProps) {
//   return <MDXRemote {...source} components={MdxComponents} />;
// }