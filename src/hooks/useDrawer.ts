import { useState } from "react";
import type { DrawerState, ToggleDrawer } from "../types";

export const useDrawer = () => {
    const [drawer, setDrawer] = useState<DrawerState>({
        favoriteCities: false,
      });
    
    const toggleDrawer: ToggleDrawer =
        (anchor, open) => 
        (event) => {
          if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
              (event as React.KeyboardEvent).key === 'Shift')
          ) {
            return;
          }
    
          setDrawer({ ...drawer, [anchor]: open });
        };
    
        return { drawer, toggleDrawer };
}