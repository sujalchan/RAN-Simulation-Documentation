import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for signal metric formulas and their documented limits.
export default function Page() {
  const page = pageById.get('simulation/signal')!;
  return <DocPage page={page} />;
}
