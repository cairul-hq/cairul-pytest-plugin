import { join } from 'node:path';
import { list, option, report, selectors, value } from '@cairul/pdk/runner';
import { junit } from '@cairul/pdk/reports';

export default {
  command: ['python3', '-m', 'pytest'],
  select: selectors({ paths: list, nodeIds: list, markers: value, keywords: value }),
  build({ paths, nodeIds, markers, keywords }, temp) {
    return {
      args: [
        '--junitxml',
        join(temp, 'result.xml'),
        ...option('-m', markers),
        ...option('-k', keywords),
        '--',
        ...(paths ?? []),
        ...(nodeIds ?? []),
      ],
      noMatches: [5],
      read: report('result.xml', junit),
    };
  },
};
