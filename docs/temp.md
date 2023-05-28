# 临时记录

FiberRoot: tag = 1

RootFiber: tag = 3 mode = 3

## createRoot 一系列流程

```ts
function createRoot () {
  createRootImpl()
}

function createRootImpl () {
  // FiberRoot
  const root = createContainer()

  markContainerAsRoot(root.current, container);

  const rootContainerElement: Document | Element | DocumentFragment =
    container.nodeType === COMMENT_NODE
      ? (container.parentNode: any)
      : container;
  listenToAllSupportedEvents(rootContainerElement);

  return new ReactDOMRoot(root);
}

function createContainer () {
  const hydrate = false;
  const initialChildren = null;
  return createFiberRoot();
}

function createFiberRoot () {
  const root: FiberRoot = new FiberRootNode()

  // RootFiber
  const uninitializedFiber = createHostRootFiber()

  // FiberRoot 和 RootFiber 的区别
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  initializeUpdateQueue(uninitializedFiber);

  return root
}

function initializeUpdateQueue<State>(fiber: Fiber): void {
  const queue: UpdateQueue<State> = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      lanes: NoLanes,
      hiddenCallbacks: null,
    },
    callbacks: null
  }

  fiber.updateQueue = queue
}
```
## ReactDOMRoot

``` ts
function ReactDOMRoot(internalRoot: FiberRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function (children: ReactNodeList): void {
  const root = this._internalRoot

  if (root === null) {
    throw new Error('Cannot update an unmounted root.')
  }
  
  // render 时的 updateContainer
  updateContainer(children, root, null, null)
}

ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function () {
  const root = this._internalRoot;

  if (root !== null) {
    this._internalRoot = null;

    const container = root.containerInfo;
    
    flushSync(() => {
      // unmount 时的 updateContainer
      updateContainer(null, root, null, null);
    });
    
    unmarkContainerAsRoot(container);
  }
}
```

## markContainerAsRoot & unmarkContainerAsRoot

``` ts
function markContainerAsRoot(hostRoot: Fiber, node: Container): void {
  node[internalContainerInstanceKey] = hostRoot;
}

function unmarkContainerAsRoot(node: Container): void {
  node[internalContainerInstanceKey] = null;
}
```

## updateContainer

