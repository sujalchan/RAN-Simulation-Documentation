import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for antenna patterns and coverage behavior.
export default function Page() {
  const page = pageById.get('simulation/antennas')!;
  return <DocPage page={page} />;
}
