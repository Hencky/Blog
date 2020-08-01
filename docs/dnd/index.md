---
group:
  title: DND
  group: DND
  path: /react-dnd
---

### 拖拽测试

<code src="./index.tsx" />

### DragSourceMonitor

| dragSourceMonitor                      | 说明                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| **`canDrag()`**                        | 返回`drag source`是否可以被拖拽                                                 |
| **`isDragging()`**                     | 返回`drag source`是否在拖拽中                                                   |
| **`getItemType()`**                    | 返回`item.type`                                                                 |
| **`getItem()`**                        | 返回`item`对象                                                                  |
| **`getDropResult()`**                  | 返回代表最后拖拽的`drop result`对象，在`end`中调用。                            |
| **`didDrop()`**                        | 在`end`中调用，`drop`事件 ok，返回`true`                                        |
| **`getInitialClientOffset()`**         | 返回拖动操作开始时 鼠标指针`{x, y}`位置,没有拖动返回`null`                      |
| **`getInitialSourceClientOffset()`**   | 返回拖动操作开始时,`drag source`DOM 节点`{x, y}`位置,没有拖动返回`null`         |
| **`getClientOffset()`**                | 返回拖动操作时最后记录的鼠标指针`{x, y}`位置,没有拖动返回`null`                 |
| **`getDifferenceFromInitialOffset()`** | 返回拖动后的鼠标指针位置与拖动开始时位置的`{x, y}`偏移量,没有拖动返回`null`     |
| **`getSourceClientOffset()`**          | 返回拖动后与拖动开始时,`drag source`DOM 节点的`{x, y}`偏移量,没有拖动返回`null` |

### DropTargetMonitor

| dragSourceMonitor                      | 说明                                                                                                                                      |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`canDrop()`**                        | 返回`drop target`是否可以`drop`                                                                                                           |
| **`isOver(options)`**                  | 若果进行拖拽操作,并且指针悬停在`drop target`上,返回`true`,参数可设置`{ shallow: true }`,拖动中 鼠标指针与`drop target`刚接触时返回`false` |
| **`getItemType()`**                    | 返回`item.type`                                                                                                                           |
| **`getItem()`**                        | 返回`item`对象                                                                                                                            |
| **`getDropResult()`**                  | 返回代表最后拖拽的`drop result`对象，在`end`中调用。                                                                                      |
| **`didDrop()`**                        | 在`end`中调用，`drop`事件 ok，返回`true`                                                                                                  |
| **`getInitialClientOffset()`**         | 返回拖动操作开始时 鼠标指针`{x, y}`位置,没有拖动返回`null`                                                                                |
| **`getInitialSourceClientOffset()`**   | 返回拖动操作开始时,`drag source`DOM 节点`{x, y}`位置,没有拖动返回`null`                                                                   |
| **`getClientOffset()`**                | 返回拖动操作时最后记录的鼠标指针`{x, y}`位置,没有拖动返回`null`                                                                           |
| **`getDifferenceFromInitialOffset()`** | 返回拖动后的鼠标指针位置与拖动开始时位置的`{x, y}`偏移量,没有拖动返回`null`                                                               |
| **`getSourceClientOffset()`**          | 返回拖动后与拖动开始时,`drag source`DOM 节点的`{x, y}`偏移量,没有拖动返回`null`                                                           |
