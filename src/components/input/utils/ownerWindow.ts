export function ownerDocument(
  node: HTMLTextAreaElement | null | undefined,
): Document {
  return (node && node.ownerDocument) || document;
}

export function ownerWindow(
  node: HTMLTextAreaElement | undefined | null,
): Window {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
