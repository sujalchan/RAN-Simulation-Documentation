import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

export default function Page() {
  const page = pageById.get('experience/small-town')!;
  return <DocPage page={page} />;
}
