import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Fuse from "fuse.js";
import { Placeholder } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function search(objects: object[], keys: string[], pattern: string) {
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

export async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export function convertToBlade(htmlContent: string, placeholders: Placeholder[]): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  const elementsWithBlade = tempDiv.querySelectorAll('[data-blade]');

  elementsWithBlade.forEach(element => {
    const hrid = element.getAttribute('data-blade');

    if (hrid) {
      const placeholder = placeholders.find(p => p.hrid === hrid);
      if (placeholder) {
        const bladeSyntax = pathToPlaceholder(placeholder);

        const parent = element.parentNode;
        if (parent) {
          const textNode = document.createTextNode('');
          textNode.textContent = bladeSyntax;
          parent.replaceChild(textNode, element);
        }
      }
    }
  });

  const result = tempDiv.innerHTML;
  return result;
}
