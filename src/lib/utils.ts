import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import Fuse from "fuse.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function search(objects: object[], keys: string[], pattern ) {
  const fuseOptions = {
    distance: 50,
    ignoreLocation: true,
    includeMatches: true,
    threshold: 0.3,
    keys
  };
  const fuse = new Fuse(objects, fuseOptions);
  return fuse.search(pattern).map(item => item.item)
}
