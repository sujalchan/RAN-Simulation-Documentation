import { scripts, events, pageById, docPath } from '../../config/docsConfig';
import { Callout } from './Callout';
import { DataTable } from './DataTable';
import { DocSection } from './DocSection';
import { FileReference } from './FileReference';
import { Link } from './Link';

export function ScriptReferencePage({ id }: { id: string }) {
  const item = scripts.find((script) => script.id === id);
  if (!item) return <p>Script reference not found.</p>;
  const place = item.place === 'material-lab' ? 'Material lab' : 'Small town';
  const location = item.path.split('/').slice(3, -1).join('/') || 'Place root';
  const communication = item.events.map(([direction, name, description]) => {
    const event = events.find((entry) => entry.name === name && entry.place === place);
    return [direction, event ? <Link to={docPath('events', event.id)}><code>{name}</code></Link> : <code>{name}</code>, description];
  });
  const dependencies = [
    ['Roblox services / context', item.services.length ? item.services.join(', ') : 'No service calls in this file.'],
    ['Named objects or attributes', item.objects.length ? item.objects.join(', ') : 'No named external object dependency.'],
    ['Modules', item.modules.length ? item.modules.join(' ') : 'No ModuleScript is required by this file.'],
  ];
  const related = item.related.map((relatedId) => ({ id: relatedId, page: pageById.get(relatedId) })).filter(({ page }) => page);
  return <div className="page-enter script-reference">
    <p className="eyebrow">Code reference</p><h1>{item.name}</h1><p className="lede">{item.summary}</p><hr className="article-rule"/>
    <div className="meta-row"><span className="pill blue">{place}</span><span className="pill">{item.runtime}</span><span className="pill orange">{item.kind}</span></div>
    <FileReference path={item.path}/>
    <div className="script-details"><div className="script-detail"><b>Expected Roblox class</b><span>{item.kind} · {item.runtime.toLowerCase()}</span></div><div className="script-detail"><b>Location</b><span>{location}</span></div></div>
    <DocSection id="purpose" title="Purpose"><p>{item.summary}</p></DocSection>
    <DocSection id="functions" title="Main functions and behavior"><ul className="compact-list">{(item.functions.length ? item.functions : ['No named functions; its current behavior is contained directly in the script body.']).map((entry) => <li key={entry}>{entry}</li>)}</ul></DocSection>
    <DocSection id="state" title="State and configuration"><p>{item.state || 'No independent configuration is defined in this file.'}</p></DocSection>
    <DocSection id="communication" title="Events and shared values">{communication.length ? <DataTable headings={['Direction', 'Event or state', 'Role']} rows={communication}/> : <Callout title="No RemoteEvents" kind="info">This file does not fire or handle a RemoteEvent. Its role is local data or a simple standalone behavior.</Callout>}</DocSection>
    <DocSection id="dependencies" title="Dependencies"><DataTable headings={['Category', 'Used here']} rows={dependencies}/></DocSection>
    {!!related.length && <DocSection id="related" title="Related documentation"><ul>{related.map(({ id: relatedId, page }) => page && <li key={relatedId}><Link to={docPath(relatedId)}>{page.title}</Link></li>)}</ul></DocSection>}
  </div>;
}
