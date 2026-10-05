import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for the searchable catalog of individual Luau scripts.
export default function Page() {
  const page = pageById.get('code-reference')!;
  return <DocPage page={page} />;
}
