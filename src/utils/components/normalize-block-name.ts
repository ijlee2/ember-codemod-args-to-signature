export function normalizeBlockName(blockName: string | undefined): string {
  switch (blockName) {
    case undefined: {
      return 'default';
    }

    case 'else':
    case 'inverse': {
      return 'else';
    }

    default: {
      return blockName;
    }
  }
}
