import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export const languages = ['typescript'];

hljs.configure({
  languages,
});

export default function highlightCode(): void {
  const codeBlocks = document.querySelectorAll('pre > code');
  codeBlocks.forEach((codeBlock) => {
    if (typeof codeBlock === 'object') {
      hljs.highlightBlock(codeBlock as HTMLElement);
    }
  });
}
