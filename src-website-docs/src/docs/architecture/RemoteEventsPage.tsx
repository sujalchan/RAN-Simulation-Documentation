import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for the event and replicated attribute reference.
export default function Page() {
  const page = pageById.get('events')!;
  return <DocPage page={page} />;
}
