import type { ReactNode } from 'react';

export function DataTable({ headings, rows }: { headings: string[]; rows: ReactNode[][] }) {
  return <div className={`data-table-wrap ${headings.length >= 4 ? 'is-wide' : headings.length === 3 ? 'is-medium' : ''}`}><table className="data-table"><thead><tr>{headings.map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
