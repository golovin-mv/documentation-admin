import React, {HTMLAttributes} from "react";
import classNames from "classnames";

const Tag: React.FC<HTMLAttributes<HTMLDivElement>> =
  ({children, ...props}) =>
    <span {...props} className={classNames({
      "items-center mx-1 px-2 py-0.5 rounded-md text-xs": true,
      [props.className]: true
    })
    }>
      {children}
    </span>
export default Tag
