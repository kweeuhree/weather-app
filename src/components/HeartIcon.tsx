import { useState } from "react";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import ListItemIcon from '@mui/material/ListItemIcon';


export const HeartIcon: React.FC = () => {
    const [hover, setHover] = useState<boolean>(false);
    
    return (
      <ListItemIcon 
        className="display-flex flex-center" 
        onMouseEnter={() => setHover(true)} 
        onMouseLeave={() => setHover(false)}
      >
        {
          hover 
          ? <IoHeartOutline className="red-heart" />
          : <IoHeartSharp className="red-heart"/>
        }
      </ListItemIcon>
    )
  }