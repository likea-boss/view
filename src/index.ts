import { VirtualDom } from "./virtualDom/VirtualDom";
import { Context } from "./virtualDom/Context";
import { Component, Renderable, RenderFn, IAttributes, ComponentFactory } from "./virtualDom/Component";

import { Renderer } from "./rendrer/Renderer";

let vd: VirtualDom;
let renderer: Renderer;

export function el(tag: string, attributes: IAttributes = {}, children: Renderable | Renderable[] = []): Component {
  return Component.createElement(tag, attributes, children);
}

export function cmp(name: string, renderFunction: RenderFn): ComponentFactory {
  return Component.createComponent(name, new Context(), renderFunction);
}

export function run(root: HTMLElement, component: Component) { // TODO magic happens here
  vd = new VirtualDom(component);
  renderer = new Renderer(root);
  renderer.render(vd);
}
