const defaultTsType = 'unknown';

const mapping = new Map<string, string>([
  ['BooleanLiteral', 'boolean'],
  ['NullLiteral', 'null'],
  ['NumberLiteral', 'number'],
  ['PathExpression', 'unknown'],
  ['StringLiteral', 'string'],
  ['SubExpression', 'unknown'],
  ['UndefinedLiteral', 'undefined'],
]);

export function getBlockParameterType(recastType: string): string {
  const tsType = mapping.get(recastType);

  return tsType ?? defaultTsType;
}
