import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for terminology and simulation limitations.
export default function Page() {
  const page = pageById.get('terminology')!;
  return <DocPage page={page} />;
}
