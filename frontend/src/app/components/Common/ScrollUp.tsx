import { useEffect } from "react";

export default function ScrollUp(): null {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), []);
  return null;
}