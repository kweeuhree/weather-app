type DrawerDisplay = 'favoriteCities';

export type DrawerState = {
    [key in DrawerDisplay]: boolean;
  };
  
export type ToggleDrawer = (
    anchor: DrawerDisplay,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;