import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for heatmap generation and update behavior.
export default function Page() {
  const page = pageById.get('simulation/heatmap')!;
  return <DocPage page={page} />;
}
