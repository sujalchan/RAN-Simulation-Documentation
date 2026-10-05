import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for the Small Town experience documentation.
export default function Page() {
  const page = pageById.get('experience/small-town')!;
  return <DocPage page={page} />;
}
