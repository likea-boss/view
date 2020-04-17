import { Component } from "./Component";

function renderRecursive(node: Component) { // TODO make class member
  if (node.isComponent) {
    node.children = (node as Component).render();
  }

  node.children.forEach((node) => {
    if (node instanceof Component) {
      renderRecursive(node);
    }
  });
}

function transformInDepth<T>(node: Component, // TODO make class member
                      processChild: (node: Component) => T,
                      addChildrenToParent: (parent: T, children: (T | string)[]) => void
): T {
  const processedNode: T = processChild(node);

  if (node instanceof Component) {
    const children: (T | string)[] = node.children.map(node => {
      if (node instanceof Component) {
        return transformInDepth(node, processChild, addChildrenToParent)
      }

      return node;
    });
    addChildrenToParent(processedNode, children);
  }

  return processedNode;
}

export class VirtualDom {
  private _root: Component;

  constructor(root: Component) {
    this._root = root;
  }

  renderAllComponents() { // TODO figure out of recursion
    renderRecursive(this._root);
  }

  to<T>(
    processChild: (node: Component) => T,
    addChildrenToParent: (parent: T, children: (T |  string)[]) => void
  ): T { // TODO figure out of recursion
    return transformInDepth(this._root, processChild, addChildrenToParent);
  }
}
