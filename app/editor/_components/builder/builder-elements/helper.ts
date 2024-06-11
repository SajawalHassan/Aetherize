import { EditorElementTypes } from "@/lib/constants";
import { Editor, EditorElement, editorActions } from "@/slices/editor-slice";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export const dropElement = (
  e: React.DragEvent<HTMLDivElement>,
  currentElement: EditorElement,
  elements: EditorElement[],
  dispatch: ThunkDispatch<
    {
      editor: Editor;
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
) => {
  e.stopPropagation();

  const componentType = e.dataTransfer.getData(
    "componentType",
  ) as EditorElementTypes;
  if (!componentType) return console.error("No component type specified");

  switch (componentType) {
    case "container":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Container",
            styles: {},
            type: componentType,
            content: [],
          },
        }),
      );
      break;
    case "mCol":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Multiple columns",
            styles: {},
            type: componentType,
            content: [],
          },
        }),
      );
      break;
    case "text":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Text field",
            styles: {},
            type: componentType,
            content: { text: "Text field" },
          },
        }),
      );
      break;
    case "link":
      dispatch(
        editorActions.addElement({
          containerId: currentElement.id,
          elementsArray: elements,
          newElement: {
            id: v4(),
            name: "Link Field",
            styles: {
              color: "lightblue",
              textDecorationLine: "underline",
            },
            type: componentType,
            content: { href: "https://aetherize.vercel.app" },
          },
        }),
      );
      break;
  }
};
