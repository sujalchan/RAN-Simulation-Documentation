// Presents source examples with a caption and language label while preserving whitespace.
export function CodeBlock({ code, caption = 'Code example', language = 'Luau' }: { code: string; caption?: string; language?: string }) {
  return <div className="code-block"><div className="code-caption"><span>{caption}</span><span className="language">{language}</span></div><pre><code>{code}</code></pre></div>;
}
