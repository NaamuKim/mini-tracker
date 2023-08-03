export interface PageTransition {
  user_event_id: number;
  current_page: string | null;
  previous_page: string | null;
  scrollY: number;
  scrollX: number;
  event_timestamp: string;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

interface SankeyNode {
  name: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export function formatDataForSankeyChart(data: PageTransition[]): SankeyData {
  const nodes: SankeyNode[] = [];
  const nodeMap: Map<string, number> = new Map();
  const links: SankeyLink[] = [];
  const linkMap: Map<string, number> = new Map();
  let circularDetected = false;

  data.forEach((event) => {
    if (event.current_page && event.previous_page) {
      let sourceIndex = nodeMap.get(event.previous_page);
      let targetIndex = nodeMap.get(event.current_page);
      const key = `${sourceIndex}-${targetIndex}`;

      if (linkMap.has(key) && !circularDetected) {
        circularDetected = true;
      } else {
        circularDetected = false;

        if (!sourceIndex) {
          nodes.push({ name: event.previous_page });
          sourceIndex = nodes.length - 1;
          nodeMap.set(event.previous_page, sourceIndex);
        }

        if (!targetIndex) {
          nodes.push({ name: event.current_page });
          targetIndex = nodes.length - 1;
          nodeMap.set(event.current_page, targetIndex);
        }

        if (!circularDetected) {
          if (linkMap.has(key)) {
            links[linkMap.get(key)!].value += 1;
          } else {
            links.push({ source: sourceIndex, target: targetIndex, value: 1 });
            linkMap.set(key, links.length - 1);
          }
        }
      }
    }
  });

  return { nodes, links };
}
