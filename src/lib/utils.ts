import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import Fuse from "fuse.js";
import {Placeholder} from "@/api/placeholder-api.ts";

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

export const pathToPlaceholder = (placeholder: Placeholder) => {
  if (placeholder.formatMask) {
    return placeholder.formatMask
  }

  const paths = placeholder.path.split('.');

  const arrayPath = paths.slice(1).reduce((acc, path) => {
    acc += path === 'fields'
      ? "['fields'][0]"
      : `['${path}']`
    return acc
  }, '')

  return `{{$${paths[0]}${arrayPath}}}`;
}

export async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}
