import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for source configuration and data locations.
export default function Page() {
  const page = pageById.get('configuration')!;
  return <DocPage page={page} />;
}
