import { Folder, FileCode2 } from 'lucide-react';

// Splits a source path into folder and file pieces for a readable breadcrumb-like display.
export function FileReference({ path }: { path: string }) {
  const parts = path.split('/');
  return <div className="file-reference" aria-label={`Source path ${path}`}><div className="file-reference-label"><FileCode2 size={15}/> Source file</div><ol>{parts.map((part, index) => <li key={`${part}-${index}`} className={index === parts.length - 1 ? 'file-leaf' : ''}>{index < parts.length - 1 && <Folder size={14}/>}<span>{part}</span></li>)}</ol></div>;
}
