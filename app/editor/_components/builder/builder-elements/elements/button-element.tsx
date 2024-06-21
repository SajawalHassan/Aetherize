import { EditorElement, editorActions } from "@/slices/editor-slice";
import { ElementLayout } from "./element-layout";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import clsx from "clsx";
import React from "react";

type Props = {
  currentElement: EditorElement;
};

export const ButtonElement = (props: Props) => {
  const { currentElement } = props;

  const { elements, viewingMode, variables } = useAppSelector(
    (state) => state.editor,
  );
  const dispatch = useAppDispatch();

  const handleOnBlur = (e: React.FocusEvent) => {
    const spanTag = e.currentTarget as HTMLSpanElement;

    dispatch(
      editorActions.updateElement({
        elementId: currentElement.id,
        elementsArray: elements,
        elementData: {
          ...currentElement,
          content: {
            text: spanTag.innerText,
          },
        },
      }),
    );
  };

  const handleOnClick = (e: React.MouseEvent) => {
    if (Array.isArray(currentElement.content)) return;

    if (currentElement.content.onClick?.methodName === "changeVar") {
      const variable = variables.filter(
        (variable) =>
          variable.id === (currentElement.content as any).onClick.methodValue,
      )[0];
      if (!variable) return console.error("No variable found");

      dispatch(
        editorActions.changeVariablesList({
          ...variable,
          variableValue: !variable.variableValue,
        }),
      );
    }
  };

  return (
    <ElementLayout currentElement={currentElement}>
      {!Array.isArray(currentElement.content) && (
        <button
          onClick={handleOnClick}
          className={clsx("bg-blue-500 p-2", {
            "cursor-default": viewingMode === "development",
          })}
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={handleOnBlur}
            className="cursor-text"
          >
            {currentElement.content.text}
          </p>
        </button>
      )}
    </ElementLayout>
  );
};
