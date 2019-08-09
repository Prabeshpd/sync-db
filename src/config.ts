import * as path from 'path';
import * as yaml from 'yamljs';
import { mergeDeepRight } from 'ramda';

import { log } from './logger';
import * as fs from './util/fs';
import Connection from './domain/Connection';
import Configuration from './domain/Configuration';
import { DEFAULT_CONFIG, CONFIG_FILENAME, CONNECTIONS_FILENAME } from './constants';

/**
 * Load config yaml file.
 *
 * @returns {Promise<Configuration>}
 */
export async function loadConfig(): Promise<Configuration> {
  log('Resolving sync config file.');

  const filename = path.resolve(process.cwd(), CONFIG_FILENAME);
  const migrations = (await yaml.load(filename)) as Configuration;

  log('Resolved sync config file.');

  const loaded = mergeDeepRight(DEFAULT_CONFIG, migrations) as Configuration;

  // TODO: Validate the loaded config.

  return loaded;
}

/**
 * Resolve database connections.
 *
 * @returns {Promise<Connection[]>}
 */
export async function resolveConnections(): Promise<Connection[]> {
  log('Resolving database connections.');

  const filename = path.resolve(process.cwd(), CONNECTIONS_FILENAME);

  log('Resolving file: %s', filename);

  const loaded = await fs.read(filename);
  const { connections } = JSON.parse(loaded);

  // TODO: Validate the connections received from file.

  const result = connections.map((connection: Connection) => ({
    ...connection,
    id: connection.id || `${connection.host}/${connection.database}`
  }));

  log('Resolved connections: %O', connections.map((connection: Connection) => {
    return {
      id: connection.id,
      client: connection.client,
      host: connection.host,
      port: connection.port,
      user: connection.user,
      database: connection.database,
      requestTimeout: connection.requestTimeout,
      options: {
        encrypt: connection.options.encrypt
      }
    }
  }
  ));

  return result;
}
