import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter: retrieve overview content by its stable documentation ID.
export default function Page() {
  const page = pageById.get('overview')!;
  return <DocPage page={page} />;
}
