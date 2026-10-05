import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for the Material Lab experience documentation.
export default function Page() {
  const page = pageById.get('experience/material-lab')!;
  return <DocPage page={page} />;
}
