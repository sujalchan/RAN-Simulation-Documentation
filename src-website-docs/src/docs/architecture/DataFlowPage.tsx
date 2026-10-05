import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for the RemoteEvent and attribute flow documentation.
export default function Page() {
  const page = pageById.get('data-flow')!;
  return <DocPage page={page} />;
}
