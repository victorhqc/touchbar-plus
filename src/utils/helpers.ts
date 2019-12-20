export function getMaybeNullValue<T>(value: T | null): T {
  if (!value) {
    throw new Error(`No ${value} found`);
  }

  return value;
}
