import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function getMDXFiles(dir: any) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: any) {
    let rawContent = fs.readFileSync(filePath, 'utf8');
    return matter(rawContent);
}

function getMDXData(dir: any) {
    let mdxFiles = getMDXFiles(dir);
    return mdxFiles.map((file) => {
        let { data, content } = readMDXFile(path.join(dir, file));
        let slug = path.basename(file, path.extname(file));
        return {
            metadata: {
                ...data,
            },
            slug,
            content,
        }
    })
}

export function getProjectPosts() {
    return getMDXData(path.join(process.cwd(), 'content/projects'));
}

export function getBlogPosts() {
    return getMDXData(path.join(process.cwd(), 'content/blogs'));
}