import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for the client interface documentation.
export default function Page() {
  const page = pageById.get('interface')!;
  return <DocPage page={page} />;
}
