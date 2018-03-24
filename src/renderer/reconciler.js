import Reconciler from "react-reconciler";
import emptyObject from "fbjs/lib/emptyObject";
import { createElement } from "./createElement";
import diffProperties from "../util/diffProperties";
import universes from "../util/stateManagement";
import "../util/updater";

var ReconcilerConfig = {
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    }
  },

  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    return diffProperties(type, oldProps, newProps);
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(wordElement) {
    // noop
  },

  getRootHostContext(rootInstance) {
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  now: () => Date.now(),

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
    },

    removeChild(parentInstance, child) {
      universes[child.root][child.props.channel] = 0;
      //dmx.update(child.root, { [child.props.channel]: 0 });
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      if (child.universe) {
        // Clear out all of the channels first.
        child.universe.updateAll(0);
        // Give it some time to write the 0s to the device
        setTimeout(() => {
          child.universe.close();
          child.universe = null;
          delete child.universe;
        }, 50);
      }
      parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      //Order doesn't matter. Just throw it in.
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      }
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      instance.props = newProps;
      universes[instance.root] = Object.assign(
        universes[instance.root],
        instance.render()
      );
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.children = newText;
    }
  }
};

const ReactDMX = Reconciler(ReconcilerConfig);

export default ReactDMX;
