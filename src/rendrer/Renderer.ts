import { VirtualDom } from "../virtualDom/VirtualDom";
import { Component } from "../virtualDom/Component";

export class Renderer {
  private _root: HTMLElement;

  constructor(root: HTMLElement) {
    this._root = root;
  }

  render(vDom: VirtualDom) {
    vDom.renderAllComponents();

    const renderedVDom: HTMLElement = vDom.to<HTMLElement>(this.createElement, this.addChildren);
    window.vDom = vDom;
    window.renderedVDom = renderedVDom;
    this._root.appendChild(renderedVDom);
  }

  private createElement(node: Component): HTMLElement {
    if (!node.isComponent) {
      const el: HTMLElement = document.createElement(node.name);
      for (let attrName in node.attributes) {
        if (attrName === "class") {
          el.className = String(node.attributes[attrName]);
        } else if (attrName === "style") {
          el.style.cssText = String(node.attributes[attrName]);
        } else {
          el.setAttribute(attrName, String(node.attributes[attrName]));
        }
      }

      return el;
    } else {
      return document.createElement("div");
    }
  }

  private addChildren(parent: HTMLElement, children: (HTMLElement | string)[]) {
    for (let child of children) {
      if (typeof child === "string") {
        parent.appendChild(document.createTextNode(child));
      } else {
        parent.appendChild(child);
      }
    }
  }
}
