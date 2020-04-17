import { Context } from "./Context";
import { wrapArray } from "../utils/wrapArray";

export interface IAttributes {
  [ key: string ]: string; // TODO allow functions
}

export type RenderFn = (ctx: Context, state: object, props: object) => Renderable | Renderable[];
export type Renderable = (Component | string);
export type ComponentFactory = (attributes?: IAttributes) => Component;

export class Component { // TODO add state
  private _name: string;
  private _attributes: IAttributes;
  private _isComponent: boolean;
  private _children: Renderable[];
  private _context: Context; // TODO this should come from Renderer
  private _renderFunction: RenderFn;

  static createComponent(name: string, context: Context, renderFunction: RenderFn): ComponentFactory {
    return function (attributes: IAttributes = {}) {
      return new Component(name, attributes, true, [], context, renderFunction);
    }
  }

  static createElement(name: string, attributes: IAttributes, children: Renderable | Renderable[]): Component {
    return new Component(name, attributes, false, wrapArray(children), new Context(), () => []);
  }

  constructor(
    name: string,
    attributes: IAttributes,
    isComponent: boolean,
    children: Renderable[],
    context: Context,
    renderFunction: RenderFn
  ) {
    this._name = name;
    this._attributes = attributes;
    this._isComponent = isComponent;
    this._children = children;
    this._context = context;
    this._renderFunction = renderFunction;
  }

  set children(children: Renderable[]) {
    this._children = children;
  }

  get children(): Renderable[] {
    return this._children;
  }

  get name(): string {
    return this._name;
  }

  get attributes(): IAttributes {
    return this._attributes;
  }

  get isComponent(): boolean {
    return this._isComponent;
  }

  render(): Renderable[] {
    return wrapArray(this._renderFunction(this._context, {}, {}));
  }
}
