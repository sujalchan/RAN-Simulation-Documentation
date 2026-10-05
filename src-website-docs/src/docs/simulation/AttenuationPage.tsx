import { DocPage } from '../../components/docs/DocPage';
import { pageById } from '../../config/docsConfig';

// Route adapter for material attenuation behavior.
export default function Page() {
  const page = pageById.get('simulation/materials')!;
  return <DocPage page={page} />;
}
