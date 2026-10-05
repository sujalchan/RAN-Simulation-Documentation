import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for developer maintenance guidance.
export default function Page() {
  const page = pageById.get('developer-guide')!;
  return <DocPage page={page} />;
}
