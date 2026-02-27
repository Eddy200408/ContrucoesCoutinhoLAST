import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-default',
      incrementalCache: 'cloudflare-kv-incremental-cache',
    },
  },
  middleware: [],
};

export default config;
