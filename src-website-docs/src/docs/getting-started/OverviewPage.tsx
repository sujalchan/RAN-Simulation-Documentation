import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

export default function Page() {
  const page = pageById.get('overview')!;
  return <DocPage page={page} />;
}
