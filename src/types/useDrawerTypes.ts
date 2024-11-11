import type { MouseEvent, KeyboardEvent } from "react";

type DrawerDisplay = "favoriteCities";

export type DrawerState = {
  [key in DrawerDisplay]: boolean;
};

export type ToggleDrawerEvent = MouseEvent | KeyboardEvent;

export type ToggleFavsEvent =
  | MouseEvent<HTMLDivElement>
  | KeyboardEvent<Element>
  | PointerEvent;

export type ToggleDrawer = (
  anchor: DrawerDisplay,
  open: boolean,
) => (event: ToggleDrawerEvent) => void;
