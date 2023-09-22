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