import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
    h1: (props) => <h1 className="text-3xl md:text-4xl font-display mb-6 mt-8" {...props} />,
    h2: (props) => <h2 className="text-2xl md:text-3xl font-display mb-4 mt-8" {...props} />,
    h3: (props) => <h3 className="text-xl md:text-2xl font-display mb-3 mt-6" {...props} />,
    p: (props) => <p className="text-primary leading-relaxed mb-5" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 mb-5 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 mb-5 space-y-2" {...props} />,
    a: (props) => <a className="text-accent underline hover:opacity-80" {...props} />,
    code: (props) => <code className="bg-neutral-200 px-1.5 py-0.5 rounded" {...props} />,
    pre: (props) => <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-xl overflow-x-auto mb-6" {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-accent pl-4 italic my-6" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
