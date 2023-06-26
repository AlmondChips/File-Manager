import { navigationOperations } from '../../handlers/navigation/navigation.js';
import { filesOperations } from '../../handlers/filesOperations/filesOperations.js';
import { operationSystemInfo } from '../../handlers/operationSystemInfo.js';
import { hashCalculator } from '../../handlers/hashCalculator.js';
import { compressOperations } from '../../handlers/compressOperations.js';

export const operations = [
  navigationOperations,
  filesOperations,
  operationSystemInfo,
  hashCalculator,
  compressOperations,
]