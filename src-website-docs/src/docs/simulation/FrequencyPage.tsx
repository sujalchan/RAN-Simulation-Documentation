import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

export default function Page() {
  const page = pageById.get('simulation/frequency')!;
  return <DocPage page={page} />;
}
