import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for the runtime architecture documentation.
export default function Page() {
  const page = pageById.get('architecture')!;
  return <DocPage page={page} />;
}
