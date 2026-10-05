import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter: render the repository map from the shared page catalog.
export default function Page() {
  const page = pageById.get('repository')!;
  return <DocPage page={page} />;
}
