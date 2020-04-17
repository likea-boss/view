// export interface IAttributes {
//   [ key: string ]: string | number; // TODO allow functions
// }
//
// type Renderable = (VirtualDomNode | string);
//
// export class VirtualDomNode {
//   protected _name: string;
//   protected _attributes: IAttributes;
//   protected _isComponent: boolean;
//   protected _children: Renderable[];
//
//   constructor(name: string, attributes: IAttributes, children: Renderable[], isComponent: boolean = false) {
//     this._name = name;
//     this._attributes = attributes;
//     this._children = children;
//     this._isComponent = isComponent;
//   }
//
//   set children(children: Renderable[]) {
//     this._children = children;
//   }
//
//   get children(): Renderable[] {
//     return this._children;
//   }
//
//   get name(): string {
//     return this._name;
//   }
//
//   get attributes(): IAttributes {
//     return this._attributes;
//   }
//
//   get isComponent(): boolean {
//     return this._isComponent;
//   }
//
//   copy(): VirtualDomNode {
//     return new VirtualDomNode(
//       this._name,
//       {...this._attributes},
//       this._children.map(node => {
//         if (node instanceof VirtualDomNode) {
//           return node.copy();
//         }
//
//         return node;
//       }), // TODO figure out of recursion
//       this._isComponent);
//   }
// }
